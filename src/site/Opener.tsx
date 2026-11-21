import "./opener.css";
import { EIGHT, GAP } from "@/brand/mark";

/**
 * First-visit opening: three eights drawn on paper in one stroke each, the last in the accent,
 * then the paper lifts to the page. About 1.5 s and CSS only, so it finishes even if JavaScript
 * never arrives. The script runs before first paint and skips it on repeat visits in a session
 * and under reduced motion.
 */
const SKIP = `(function(){var d=document.documentElement;try{if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("opener-seen")){d.classList.add("opener-off")}else{sessionStorage.setItem("opener-seen","1")}}catch(e){d.classList.add("opener-off")}})();`;


export default function Opener() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SKIP }} />
      <div className="opener" aria-hidden="true">
        <svg className="opener-eights" viewBox={`0 0 ${2 * GAP + 100} 196`} fill="none">
          <path className="opener-eight" pathLength={1} d={EIGHT} />
          <path className="opener-eight opener-eight-2" pathLength={1} d={EIGHT} transform={`translate(${GAP})`} />
          <path className="opener-eight opener-eight-3" pathLength={1} d={EIGHT} transform={`translate(${2 * GAP})`} />
        </svg>
        <span className="opener-name">Marketing</span>
      </div>
    </>
  );
}
