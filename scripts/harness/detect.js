(() => {
  const w = window;
  const scripts = [...document.scripts].map(s => s.src).filter(Boolean);
  const res = performance.getEntriesByType('resource').map(r => r.name);
  const ext = (re) => res.filter(u => re.test(u));
  const canv = [...document.querySelectorAll('canvas')].map(c => {
    let ctx = 'unknown';
    try { if (c.getContext('webgl2')) ctx = 'webgl2'; else if (c.getContext('webgl')) ctx = 'webgl'; } catch (e) {}
    const r = c.getBoundingClientRect();
    return { w: c.width, h: c.height, rect: [r.x, r.y, r.width, r.height].map(Math.round), ctx, pos: getComputedStyle(c).position, z: getComputedStyle(c).zIndex };
  });
  const fonts = [...new Set([...document.querySelectorAll('h1,h2,h3,p,a,span,button,li')].slice(0, 400).map(e => getComputedStyle(e).fontFamily))];
  const html = document.documentElement;
  return {
    title: document.title,
    framework: {
      next: !!w.__NEXT_DATA__ || !!document.querySelector('script[src*="/_next/"]'),
      nuxt: !!w.__NUXT__ || !!w.$nuxt || !!document.querySelector('#__nuxt'),
      vue: !!document.querySelector('[data-v-app]') || !!w.__VUE__,
      react: !!document.querySelector('[data-reactroot]') || !!w.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.size,
      svelte: !!document.querySelector('[class*="svelte-"]'),
      astro: !!document.querySelector('astro-island'),
      webflow: !!html.dataset.wfPage,
      framer: !!document.querySelector('[data-framer-name]'),
      gatsby: !!document.querySelector('#___gatsby'),
    },
    libs: {
      THREE: !!w.THREE || !!w.__THREE__, threeRev: w.__THREE__ || null,
      gsap: !!w.gsap, gsapVer: w.gsap?.version || null, ScrollTrigger: !!w.ScrollTrigger,
      lenis: !!w.lenis || html.classList.contains('lenis') || !!document.querySelector('.lenis'),
      locomotive: html.classList.contains('has-scroll-smooth'),
      barba: !!w.barba, swiper: !!document.querySelector('.swiper'), pixi: !!w.PIXI,
      spline: !!document.querySelector('spline-viewer') || res.some(u => /spline/.test(u)),
      lottie: !!w.lottie || !!document.querySelector('lottie-player,dotlottie-player'),
    },
    htmlClass: html.className, bodyClass: document.body.className,
    canvases: canv,
    reducedMotionMediaRules: [...document.styleSheets].flatMap(s => { try { return [...s.cssRules].filter(r => r.media && /reduced-motion/.test(r.media.mediaText)).map(r => r.media.mediaText); } catch (e) { return []; } }).length,
    fonts,
    scripts,
    models: ext(/\.(glb|gltf|fbx|obj|usdz|drc|ktx2|basis|hdr|exr)(\?|$)/i),
    shaders: ext(/\.(glsl|frag|vert|wgsl)(\?|$)/i),
    videos: [...document.querySelectorAll('video')].map(v => v.currentSrc || v.src || v.querySelector('source')?.src),
    images: ext(/\.(png|jpe?g|webp|avif|svg|gif)(\?|$)/i).slice(0, 60),
    fontFiles: ext(/\.(woff2?|ttf|otf)(\?|$)/i),
    docHeight: document.documentElement.scrollHeight,
  };
})()
