"""
Put real client work onto a generated screen, tracked frame by frame.

    python3 scripts/composite-screen.py SHOT.mp4 INSERT.(mp4|png) OUT.mp4 [--roi x0,y0,x1,y1] [--glow 0.25]

The Grok shots are prompted with a blank, evenly bright screen (footage/PROMPTS.md). In each
frame this finds the largest bright four-sided shape inside the region of interest, smooths its
corners over time so it doesn't jitter, and warps the insert (a site recording or a logo) into it
with a perspective transform. A little of the original glow is screened back on top so the insert
picks up the scene's light, and the edge is feathered by a pixel. Frames where no screen is found
reuse the last good corners.

Check the result by eye: the detection is a helper, not a guarantee.
"""
import argparse
import sys

import cv2
import numpy as np


def order(pts):
    pts = pts.reshape(4, 2).astype(np.float32)
    s = pts.sum(1)
    d = np.diff(pts, axis=1).ravel()
    return np.array([pts[np.argmin(s)], pts[np.argmin(d)], pts[np.argmax(s)], pts[np.argmax(d)]], np.float32)


def find_screen(frame, roi, min_area):
    x0, y0, x1, y1 = roi
    crop = frame[y0:y1, x0:x1]
    hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
    v = hsv[:, :, 2]
    s = hsv[:, :, 1]
    # A blank glowing screen: very bright, low saturation.
    mask = ((v > 215) & (s < 70)).astype(np.uint8) * 255
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
    cnts, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    best, best_a = None, 0
    for c in cnts:
        a = cv2.contourArea(c)
        if a < min_area or a < best_a:
            continue
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.03 * peri, True)
        if len(approx) != 4:
            approx = cv2.boxPoints(cv2.minAreaRect(c)).reshape(4, 1, 2)
        best, best_a = approx, a
    if best is None:
        return None
    q = order(best)
    q[:, 0] += x0
    q[:, 1] += y0
    return q


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("shot")
    ap.add_argument("insert")
    ap.add_argument("out")
    ap.add_argument("--roi", default=None, help="x0,y0,x1,y1 in pixels; default the whole frame")
    ap.add_argument("--glow", type=float, default=0.22)
    ap.add_argument("--smooth", type=float, default=0.6, help="0–1, higher follows faster")
    ap.add_argument("--min-area", type=float, default=0.004, help="fraction of the frame")
    ap.add_argument("--expand", type=float, default=1.025, help="overscan around the screen's centre")
    a = ap.parse_args()

    cap = cv2.VideoCapture(a.shot)
    fps = cap.get(cv2.CAP_PROP_FPS) or 24
    W, H = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    roi = tuple(int(v) for v in a.roi.split(",")) if a.roi else (0, 0, W, H)
    still = a.insert.lower().endswith((".png", ".jpg", ".jpeg", ".webp"))
    ins_img = cv2.imread(a.insert, cv2.IMREAD_UNCHANGED) if still else None
    ins_cap = None if still else cv2.VideoCapture(a.insert)
    out = cv2.VideoWriter(a.out, cv2.VideoWriter_fourcc(*"mp4v"), fps, (W, H))

    q_s, found, n = None, 0, 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        n += 1
        q = find_screen(frame, roi, a.min_area * W * H)
        if q is not None:
            found += 1
            q_s = q if q_s is None else q_s + (q - q_s) * a.smooth
        if q_s is not None:
            if still:
                ins = ins_img
            else:
                ok2, ins = ins_cap.read()
                if not ok2:
                    ins_cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                    ok2, ins = ins_cap.read()
            h, w = ins.shape[:2]
            src = np.array([[0, 0], [w, 0], [w, h], [0, h]], np.float32)
            c = q_s.mean(0)
            dst = (c + (q_s - c) * a.expand).astype(np.float32)
            M = cv2.getPerspectiveTransform(src, dst)
            alpha_src = ins[:, :, 3] if ins.shape[2] == 4 else np.full((h, w), 255, np.uint8)
            warped = cv2.warpPerspective(ins[:, :, :3], M, (W, H), flags=cv2.INTER_LINEAR)
            alpha = cv2.warpPerspective(alpha_src, M, (W, H)).astype(np.float32) / 255.0
            alpha = cv2.GaussianBlur(alpha, (3, 3), 0)[..., None]
            comp = frame.astype(np.float32) * (1 - alpha) + warped.astype(np.float32) * alpha
            # Screen a little of the scene's own glow back over the insert.
            glow = frame.astype(np.float32) / 255.0
            comp = 255 - (255 - comp) * (1 - glow * a.glow * alpha)
            frame = np.clip(comp, 0, 255).astype(np.uint8)
        out.write(frame)
    out.release()
    print(f"{a.out}: screen found in {found}/{n} frames", file=sys.stderr)


if __name__ == "__main__":
    main()
