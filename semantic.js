document.addEventListener("DOMContentLoaded", () => {
  locomotiveSmoothScroll(); // FIRST & ONLY

  revealToSpan();
  valueSetters();

  if (document.querySelector("#section-1")) {
    loadingAnimation();
  }

  navScrollAnimation();
  genericRevealWordAnimation();
  section6Animation();
  section7Animation();
  initFooterAnimation();

  // heavy stuff later
  cardShow();
  guitarHorizontalStrings();
  guitarVerticalStrings();
  particleFloatingAnimation();
  particlesGlobeAnimation();
  swiperAnimationOnCards();

  marqueeAnimation(); 
});



function locomotiveSmoothScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const container = document.querySelector("[data-scroll-container]");
  // console.log(container);
  
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
}


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
function valueSetters() {
  const navItems = document.querySelectorAll(".main-nav ul li");
  const heroChildren = document.querySelectorAll("#section-1 .child");
  const downArrow = document.querySelector("#down-arrow-container");

  if (navItems.length) {
    gsap.set(navItems, { y: "-100%", opacity: 0 });
  }

  if (heroChildren.length) {
    gsap.set(heroChildren, { y: "100%" });
  }

  if (downArrow) {
    gsap.set(downArrow, { y: "100%", opacity: 0 });
  }
}

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
    .to("#green", {
      height: "100%",
      duration: 1.8,
      ease: "expo.inOut"
    }, "-=1.2")

    .to("#gray", {
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

function animateHomePage() {
  const navItems = document.querySelectorAll(".main-nav ul li");
  const heroText = document.querySelectorAll("#section-1 .child");
  const downArrow = document.querySelector("#down-arrow-container");

  if (!heroText.length) return;

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1
    }
  });

  /* NAV */
  if (navItems.length) {
    tl.fromTo(
      navItems,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8
      }
    );
  }

  /* HERO TEXT */
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
    navItems.length ? "-=0.3" : 0
  );

  /* SVG */
  tl.add(startSvgAnimation, "-=0.6");

  /* DOWN ARROW */
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



function startSvgAnimation() {
  const svgTexts = document.querySelectorAll(".stack-heading text");
  if (!svgTexts.length) return;

  // Accessibility: respect reduced motion
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


function navScrollAnimation() {
  const nav = document.querySelector(".main-nav");
  const triggerSection = document.querySelector("#section-1");
  if (!nav || !triggerSection) return;

  gsap.to(nav, {
    height: "12vh", // keep for now (visual unchanged)
    backgroundColor: "rgba(20, 20, 20, 0.55)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
    ease: "power3.out",

    scrollTrigger: {
      trigger: triggerSection,
      scroller: "[data-scroll-container]",
      start: "bottom top",
      end: "bottom top+=120",
      scrub: 0.6,
      invalidateOnRefresh: true
    }
  });
}


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
function genericRevealWordAnimation() {
  const words = gsap.utils.toArray(".generic.reveal");
  if (!words.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    gsap.set(words, { opacity: 1, y: 0, scale: 1 });
    return;
  }

  gsap.set(words, { opacity: 0, y: 90, scale: 0.9 });

  gsap.to(words, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.08,
    scrollTrigger: {
      trigger: words[0],
      start: "top 85%",
      scroller: "[data-scroll-container]",
      once: true
    }
  });

  // typing trigger (run once safely)
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
function wordTypingEffect() {
  const para = document.querySelector("#typing-para");
  if (!para || para.dataset.typed) return;

  para.dataset.typed = "true";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const text = `" Crafting Seamless Interfaces From Concept To Code. "`;

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
countNumberPoints();
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
      scrub: 1,
      invalidateOnRefresh: true
    }
  });
}
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


function swiperAnimationOnCards() {
  const swiperEl = document.querySelector(".caseSwiper");
  if (!swiperEl || swiperEl.dataset.init) return;

  swiperEl.dataset.init = "true";

  requestAnimationFrame(() => {
    new Swiper(swiperEl, {
      slidesPerView: "auto",
      spaceBetween: 40,
      freeMode: true,
      grabCursor: true,

      // Locomotive-safe
      mousewheel: false,
      simulateTouch: true,
      touchStartPreventDefault: false
    });

    ScrollTrigger.refresh();
  });
}



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
      start: "top 40%",
      once: true // 🔥 IMPORTANT
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



function marqueeAnimation() {
  let currentTween;

  window.addEventListener("wheel", function (dets) {

    // kill previous tween
    if (currentTween) currentTween.kill();

    if (dets.deltaY > 0) {
      // 👉 LEFT MOVE
      currentTween = gsap.to(".decisions-marquee", {
        x: "-200%",
        duration: 3,
        ease: "linear",
        repeat: -1
      });

      // 🔥 FIXED selector (NEW HTML)
      gsap.to(".decisions-marquee svg", {
        rotate: 180,
        duration: 0.4,
        ease: "power3.out"
      });

    } else {
      // 👉 RIGHT MOVE
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
