
// Function Calls
document.addEventListener("DOMContentLoaded", () => {
  locomotiveSmoothScroll(); 

  revealToSpan();
  valueSetters();

  if (document.querySelector("#section-1")) {
    loadingAnimation();
  }
  initExploreNav();
  genericRevealWordAnimation();
  countNumberPoints();
  section6Animation();
  section7Animation();
  initFooterAnimation();

  cardShow();
  guitarHorizontalStrings();
  guitarVerticalStrings();
  particleFloatingAnimation();
  particlesGlobeAnimation();
  swiperAnimationOnCards();

  marqueeAnimation(); 
});


// Locomotive Func 
function locomotiveSmoothScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const container = document.querySelector("[data-scroll-container]");
  
  if (!container) {
    console.error(" No data-scroll-container found");
    return;
  }
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    multiplier: 0.5,
  });
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("[data-scroll-container]").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();


  // Go to Footer page btn
  var scrollDownBtn= document.querySelector("#down-arrow-container i");
scrollDownBtn.addEventListener("click",()=>{

  locoScroll.scrollTo(".footer-final"); 
  
}) 

// Go to work page btn
  var workBtn= document.querySelector(".hero-cta");
workBtn.addEventListener("click",()=>{

  locoScroll.scrollTo("#section-3"); 
  
}) 
}



// Reveal To Span
function revealToSpan() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(elem => {
    if (elem.querySelector(".parent")) return;

    const parent = document.createElement("span");
    const child = document.createElement("span");

    parent.className = "parent";
    child.className = "child";

    while (elem.firstChild) {
      child.appendChild(elem.firstChild);
    }

    parent.appendChild(child);
    elem.appendChild(parent);
  });
}

// Value Setters
function valueSetters() {
  const heroChildren = document.querySelectorAll("#section-1 .child");
  const downArrow = document.querySelector("#down-arrow-container");

  if (heroChildren.length) {
    gsap.set(heroChildren, { y: "100%" });
  }

  if (downArrow) {
    gsap.set(downArrow, { y: "100%", opacity: 0 });
  }
}


// Loading Animation
function loadingAnimation() {
  const loader = document.querySelector("#loader");
  const loaderInner = document.querySelector("#loader-first");
  const section1 = document.querySelector("#section-1");

  if (!loader || !loaderInner || !section1) return;

  const fname = loaderInner.querySelector(".fname");
  const lname = loaderInner.querySelector(".lname");
  const revealChildren = loaderInner.querySelectorAll("h3 .child, h2 .child");
  const allChildren = loaderInner.querySelectorAll(".child");

  const tl = gsap.timeline({
    defaults: { ease: "expo.out" }
  });

  tl
    /* FIRST NAME */
    .from(fname, {
      x: "120%",
      opacity: 0,
      scale: 0.6,
      delay: 0.8,
      duration: 1
    })

    /* LAST NAME */
    .from(lname, {
      x: "120%",
      opacity: 0,
      scale: 0.6,
      duration: 1
    }, "-=0.6")

    /* OTHER TEXT */
    .from(revealChildren, {
      x: "120%",
      opacity: 0,
      stagger: 0.15,
      duration: 0.9
    }, "-=0.5")

    /* TEXT UP */
    .to(allChildren, {
      y: "-100%",
      duration: 0.7,
      ease: "expo.inOut"
    }, "+=0.1")

    /* COLLAPSE LOADER */
    .to(loaderInner, {
      height: 0,
      duration: 1.4,
      ease: "expo.inOut"
    }, "-=0.3")

    /* COLOR WIPES */
    .to("#overlay-1", {
      height: "100%",
      duration: 1.8,
      ease: "expo.inOut"
    }, "-=1.2")

    .to("#overlay-2", {
      height: "100%",
      duration: 1.8,
      ease: "expo.inOut"
    }, "-=1.5")

    /* REMOVE LOADER */
    .to(loader, {
      height: 0,
      opacity: 0,
      duration: 1
    }, "-=0.8")

    /* REVEAL HERO */
    .to(section1, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      onComplete: animateHomePage
    }, "-=0.9");
}


// Nav Animation 
function initExploreNav() {
  const btn = document.querySelector("#explore-trigger");
  const overlay = document.querySelector("#explore-overlay");
  const closeBtn = document.querySelector(".explore-close");
  const links = document.querySelectorAll(".explore-menu a");

  if (!btn || !overlay || !links.length) return;

  let isOpen = false;

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power3.out" }
  });

  tl.fromTo(
    links,
    { y: 32, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.6
    }
  );

  function openNav() {
    if (isOpen) return;

    overlay.classList.add("is-open");
    tl.restart(); // 🔥 THIS FIXES INVISIBLE LINKS

    btn.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");

    isOpen = true;
  }

  function closeNav() {
    if (!isOpen) return;

    overlay.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");

    isOpen = false;
  }

  btn.addEventListener("click", openNav);
  closeBtn?.addEventListener("click", closeNav);

  links.forEach(link => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && isOpen) closeNav();
  });
}


// Animate Home Page
function animateHomePage() {

  const heroText = document.querySelectorAll("#section-1 .child");
  const downArrow = document.querySelector("#down-arrow-container");

  if (!heroText.length) return;

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1
    }
  });
  tl.fromTo(
    heroText,
    {
      y: 80,
      opacity: 0,
      filter: "blur(8px)"
    },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.25,
      duration: 1.3
    },
  );

  if (typeof startSvgAnimation === "function") {
    tl.add(startSvgAnimation, "-=0.6");
  }

  if (downArrow) {
    tl.fromTo(
      downArrow,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out"
      },
      "-=0.4"
    );
  }
}


// Start Svg Animation
function startSvgAnimation() {
  const svgTexts = document.querySelectorAll(".stack-heading text");
  if (!svgTexts.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  svgTexts.forEach(el => {
    if (el.dataset.played) return; // prevent re-trigger
    el.style.animationPlayState = "running";
    el.dataset.played = "true";
  });
}

// Guitar Horizontal Strings
function guitarHorizontalStrings() {
  const zones = document.querySelectorAll(".interactive-horizontal-string");
  if (!zones.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  zones.forEach(zone => {
    const svg = zone.querySelector("svg");
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const strings = svg.querySelectorAll(".h-string");

    strings.forEach(string => {
      const baseY = Number(string.dataset.base);
      const main = string.querySelector(".h-string-main");
      const glow = string.querySelector(".h-string-glow");

      if (!main || !glow) return;

      const physics = createStringPhysics({
        base: baseY,
        maxPull: 80,
        tension: 0.12,
        damping: 0.85,
        glow,
        updatePath: y => {
          const d = `M 0 ${baseY} Q 500 ${y} 1000 ${baseY}`;
          main.setAttribute("d", d);
          glow.setAttribute("d", d);
        }
      });

      // Start only when visible
      ScrollTrigger.create({
        trigger: zone,
        scroller: "[data-scroll-container]",
        onEnter: () => physics.start(),
        onLeave: () => physics.stop(),
        onEnterBack: () => physics.start(),
        onLeaveBack: () => physics.stop()
      });

      zone.addEventListener("mousemove", e => {
        physics.pull(e.clientY - rect.top - baseY);
      });

      zone.addEventListener("mouseleave", () => physics.pluck());
    });
  });
}

// Guitar Vertical Strings
function guitarVerticalStrings() {
  const zones = document.querySelectorAll(".interactive-vertical-string");
  if (!zones.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  zones.forEach(zone => {
    const svg = zone.querySelector("svg");
    const main = zone.querySelector(".v-string-main");
    const glow = zone.querySelector(".v-string-glow");

    if (!svg || !main || !glow) return;

    const rect = svg.getBoundingClientRect();
    const baseX = 100;
    const viewHeight = 1000;

    const physics = createStringPhysics({
      base: baseX,
      maxPull: 90,
      tension: 0.1,
      damping: 0.85,
      glow,
      updatePath: x => {
        const d = `M ${baseX} 0 Q ${x} ${viewHeight / 2} ${baseX} ${viewHeight}`;
        main.setAttribute("d", d);
        glow.setAttribute("d", d);
      }
    });

    ScrollTrigger.create({
      trigger: zone,
      scroller: "[data-scroll-container]",
      onEnter: () => physics.start(),
      onLeave: () => physics.stop(),
      onEnterBack: () => physics.start(),
      onLeaveBack: () => physics.stop()
    });

    zone.addEventListener("mousemove", e => {
      physics.pull(e.clientX - rect.left - baseX);
    });

    zone.addEventListener("mouseleave", () => physics.pluck(28));
  });
}


// Generic Reveal Word Animation
function genericRevealWordAnimation() {
  const words = gsap.utils.toArray(".generic.reveal");
  if (!words.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  words.forEach((word) => {
    if (prefersReducedMotion) {
      gsap.set(word, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.fromTo(
      word,
      { opacity: 0, y: 90, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: word,          
          start: "top 85%",
          scroller: "[data-scroll-container]",
          once: true,
          // markers: true
        }
      }
    );
  });

  // typing trigger (THIS PART WAS FINE)
  ScrollTrigger.create({
    trigger: "#section-3",
    scroller: "[data-scroll-container]",
    start: "top 75%",
    once: true,
    onEnter: () => {
      if (!document.body.dataset.typingPlayed) {
        document.body.dataset.typingPlayed = "true";
        wordTypingEffect();
      }
    }
  });
}




// Word Typing Effect
function wordTypingEffect() {
  const para = document.querySelector("#typing-para");
  if (!para || para.dataset.typed) return;

  para.dataset.typed = "true";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const text = `" Selected projects showcasing real-world problem solving,
      design thinking, and full-stack engineering. "`;

  // Reduced motion → instant text
  if (prefersReducedMotion) {
    para.textContent = text;
    return;
  }

  const words = text.split(" ");
  para.textContent = "";

  let wordIndex = 0;

  function typeWord() {
    if (wordIndex >= words.length) return;

    const wordSpan = document.createElement("span");
    wordSpan.style.whiteSpace = "nowrap";
    para.appendChild(wordSpan);

    const letters = words[wordIndex].split("");
    let letterIndex = 0;

    function typeLetter() {
      if (letterIndex >= letters.length) {
        para.appendChild(document.createTextNode(" "));
        wordIndex++;
        setTimeout(typeWord, 40);
        return;
      }

      const letterSpan = document.createElement("span");
      letterSpan.className = "typing-letter";
      letterSpan.textContent = letters[letterIndex];
      wordSpan.appendChild(letterSpan);

      gsap.fromTo(
        letterSpan,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }
      );

      letterIndex++;
      setTimeout(typeLetter, 45);
    }

    typeLetter();
  }

  typeWord();
}


// Card Show 
function cardShow() {
  const section = document.querySelector("#section-3");
  const projects = document.querySelectorAll(".projects");
  const cursor = document.querySelector("#cursor");
  const cursorItems = document.querySelectorAll(".projects-cursor");

  if (!section || !projects.length || !cursor || !cursorItems.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  const cursorController = createCursorFollower(section, cursor);

  projects.forEach(project => {
    const index = Number(project.dataset.index);
    if (!cursorItems[index]) return;

    project.addEventListener("mouseenter", () => {
      showCursorForProject({
        section,
        project,
        cursor,
        cursorItems,
        index,
        cursorController
      });
    });

    project.addEventListener("mouseleave", () => {
      hideCursor(section, cursor, cursorItems, cursorController);
    });
  });

  section.addEventListener("mouseleave", () => {
    hideCursor(section, cursor, cursorItems, cursorController);
  });
}

// Cursor Function
function createCursorFollower(section, cursor) {
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let active = false;
  let rafId = null;

  const setX = gsap.quickSetter(cursor, "x", "px");
  const setY = gsap.quickSetter(cursor, "y", "px");

  function loop() {
    if (!active) return;

    const ease = 0.12;
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    setX(currentX);
    setY(currentY);

    rafId = requestAnimationFrame(loop);
  }

  section.addEventListener("mousemove", e => {
    mouseX = e.clientX - cursor.offsetWidth / 2;
    mouseY = e.clientY - cursor.offsetHeight / 2;
  });

  return {
    start() {
      if (active) return;
      active = true;
      loop();
    },
    stop() {
      active = false;
      if (rafId) cancelAnimationFrame(rafId);
    }
  };
}
function showCursorForProject({
  section,
  project,
  cursor,
  cursorItems,
  index,
  cursorController
}) {
  cursorController.start();

  // reset cycling images
  cursorItems[index]
    .querySelectorAll("img")
    .forEach(img => (img.style.opacity = ""));

  gsap.to(cursor, {
    opacity: 1,
    scale: 1,
    duration: 0.25,
    ease: "power3.out"
  });

  cursorItems.forEach(item => (item.style.opacity = 0));
  cursorItems[index].style.opacity = 1;

  const hoverColor = getComputedStyle(project)
    .getPropertyValue("--project-hover-color")
    .trim();

  if (hoverColor) {
    section.style.background = `
      radial-gradient(
        circle at center,
        ${hoverColor},
        rgba(11,16,32,0.92) 72%
      )
    `;
  }
}
function hideCursor(section, cursor, cursorItems, cursorController) {
  cursorController.stop();

  gsap.to(cursor, {
    opacity: 0,
    scale: 0.85,
    duration: 0.25,
    ease: "power3.out"
  });

  cursorItems.forEach(item => (item.style.opacity = 0));
  section.style.background = "var(--bg-secondary)";
}





// Count Number Points 
function countNumberPoints() {
  const counts = document.querySelectorAll(".count");
  if (!counts.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  counts.forEach(el => {
    const target = Number(el.dataset.target);
    if (isNaN(target)) return;

    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }

    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: target,
        duration: 2,
        ease: "power1.out",
        roundProps: "innerText",
        scrollTrigger: {
          trigger: el,
          scroller: "[data-scroll-container]",
          start: "top 80%",
          once: true
        }
      }
    );
  });
}



function createStringPhysics({
  updatePath,
  base,
  maxPull,
  tension,
  damping,
  glow
}) {
  let current = base;
  let velocity = 0;
  let active = false;
  let rafId = null;

  function loop() {
    if (!active) return;

    velocity += (base - current) * tension;
    velocity *= damping;
    current += velocity;

    updatePath(current);
    glow.style.opacity = Math.min(1, Math.abs(velocity) / 12);

    rafId = requestAnimationFrame(loop);
  }

  return {
    start() {
      if (active) return;
      active = true;
      loop();
    },
    stop() {
      active = false;
      if (rafId) cancelAnimationFrame(rafId);
    },
    pull(value) {
      current = base + Math.max(-maxPull, Math.min(maxPull, value));
    },
    pluck(force = 26) {
      velocity += force;
    }
  };
}


// Section6 Animation
function section6Animation() {
  const section = document.querySelector("#section-6");
  if (!section) return;

  const items = gsap.utils
    .toArray(section.querySelectorAll(".reveal"))
    .filter(el => !el.closest("svg"));

  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    gsap.set(items, { opacity: 1, y: 0 });
    return;
  }

  gsap.set(items, { opacity: 0, y: 100 });

  gsap.to(items, {
    opacity: 1,
    y: 0,
    ease: "power3.out",
    stagger: 0.25,
    scrollTrigger: {
      trigger: section,
      scroller: "[data-scroll-container]",
      start: "top 40%",
      end: "top -50%",
      // scrub: 1,
      invalidateOnRefresh: true
    }
  });
}

// Globe Animation
function particlesGlobeAnimation() {
  const section = document.querySelector("#section-5");
  const globe = section?.querySelector(".cdss-globe");
  if (!section || !globe) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  gsap.set(globe, {
    transformOrigin: "50% 50%",
    transformBox: "fill-box"
  });

  gsap.to(globe, {
    rotate: 360,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      scroller: "[data-scroll-container]",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      invalidateOnRefresh: true
    }
  });
}




let caseSwiperInstance = null;
// SwiperCard Animation
function swiperAnimationOnCards() {
  const swiperEl = document.querySelector(".caseSwiper");
  if (!swiperEl) return;

  function setupSwiper() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      if (caseSwiperInstance) {
        caseSwiperInstance.destroy(true, true);
        caseSwiperInstance = null;
      }
      return;
    }
    if (!caseSwiperInstance) {
      caseSwiperInstance = new Swiper(swiperEl, {
        slidesPerView: "auto",
        spaceBetween: 40,
        freeMode: true,
        grabCursor: true,
        mousewheel: false,
        simulateTouch: true,
        touchStartPreventDefault: false
      });
    }
  }

  setupSwiper();
  window.addEventListener("resize", setupSwiper);
}

// Particle Float Animation
function particleFloatingAnimation() {
  const section = document.querySelector("#section-5");
  const container = section?.querySelector(".particles-container");
  if (!section || !container || container.dataset.init) return;

  container.dataset.init = "true";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  const bounds = {
    width: section.offsetWidth,
    height: section.offsetHeight
  };

  const particleCount = 220;
  const particles = [];

  // CREATE PARTICLES ONCE
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const r = Math.random();
    p.classList.add(
      r < 0.33 ? "small" : r < 0.66 ? "medium" : "large"
    );

    container.appendChild(p);
    particles.push(p);

    gsap.set(p, {
      x: gsap.utils.random(0, bounds.width),
      y: gsap.utils.random(0, bounds.height)
    });

    // FLOAT
    gsap.to(p, {
      x: "+=" + gsap.utils.random(-120, 120),
      y: "-=" + gsap.utils.random(150, 350),
      duration: gsap.utils.random(8, 14),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: gsap.utils.random(0, 4),
      paused: true
    });

    // ROTATION
    gsap.to(p, {
      rotation: gsap.utils.random(-180, 180),
      duration: gsap.utils.random(12, 20),
      repeat: -1,
      ease: "none",
      paused: true
    });
  }

  // PARALLAX (SCOPED)
  gsap.to(particles, {
    yPercent: -25,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      scroller: "[data-scroll-container]",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });

  // collect particle tweens
const particleTweens = gsap.getTweensOf(particles, true);

ScrollTrigger.create({
  trigger: section,
  scroller: "[data-scroll-container]",
  onEnter: () => particleTweens.forEach(t => t.play()),
  onLeave: () => particleTweens.forEach(t => t.pause()),
  onEnterBack: () => particleTweens.forEach(t => t.play()),
  onLeaveBack: () => particleTweens.forEach(t => t.pause())
});

}


// Section7 Animation
function section7Animation() {
  const section = document.querySelector("#section-7");
  if (!section) return;

  const titleSpans = section.querySelectorAll(".decisions-title span");
  const items = section.querySelectorAll(".decision-item");
  if (!titleSpans.length || !items.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    gsap.set([...titleSpans, ...items], { opacity: 1, y: 0 });
    return;
  }

  gsap.set(titleSpans, { opacity: 0, y: 80 });
  gsap.set(items, { opacity: 0, y: 60 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      scroller: "[data-scroll-container]",
      start: "top 55%",
      // markers:true,
      once: true 
    }
  });

  // PHASE 1 — HEADING
  tl.to(titleSpans, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
  })

  // PHASE 2 — ITEMS
  .to(items, {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.9,
    ease: "power3.out"
  }, "+=0.3");
}


// Marquee Animation
function marqueeAnimation() {
  let currentTween;

  window.addEventListener("wheel", function (dets) {

    // kill previous tween
    if (currentTween) currentTween.kill();

    if (dets.deltaY > 0) {
      //  LEFT MOVE
      currentTween = gsap.to(".decisions-marquee", {
        x: "-200%",
        duration: 3,
        ease: "linear",
        repeat: -1
      });

      gsap.to(".decisions-marquee svg", {
        rotate: 180,
        duration: 0.4,
        ease: "power3.out"
      });

    } else {
      //  RIGHT MOVE
      currentTween = gsap.to(".decisions-marquee", {
        x: "0%",
        duration: 3,
        ease: "linear",
        repeat: -1
      });

      gsap.to(".decisions-marquee svg", {
        rotate: 0,
        duration: 0.4,
        ease: "power3.out"
      });
    }
  });
}

// Footer Animation
function initFooterAnimation() {
  const footer = document.querySelector("#final-footer");
  if (!footer) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const reveals = footer.querySelectorAll(".reveal");
  const identity = footer.querySelector(".footer-identity");
  const intentLine = footer.querySelector(".intent-line");
  const actions = footer.querySelectorAll(".footer-actions-list li");

  if (prefersReducedMotion) {
    gsap.set([reveals, identity, actions], { opacity: 1, y: 0 });
    if (intentLine) gsap.set(intentLine, { width: "48%" });
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      scroller: "[data-scroll-container]",
      start: "top 40%",
      once: true
    }
  });

  if (reveals.length) {
    tl.from(reveals, {
      y: 80,
      opacity: 0,
      stagger: 0.18,
      duration: 1.1,
      ease: "power3.out"
    });
  }

  if (intentLine) {
    tl.to(intentLine, {
      width: "48%",
      duration: 0.9,
      ease: "power2.out"
    }, "-=0.5");
  }

  if (identity) {
    tl.from(identity, {
      y: 40,
      opacity: 0,
      duration: 0.8
    }, "-=0.4");
  }

  if (actions.length) {
    tl.from(actions, {
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.3");
  }
}



