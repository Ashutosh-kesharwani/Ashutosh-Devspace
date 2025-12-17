locomotiveSmoothScroll();
revealToSpan();
valueSetters();
loadingAnimation();
cardShow();
particleAnimation();
countNumberPoints();
swiperAnimationOnCards();
section6Animation();
// guitarHorizontalString();

// window.addEventListener("load", () => {
//   locoScroll.update();
// });
// imagesLoaded("main", () => {
//   locoScroll.update();
// });
// window.addEventListener("resize", () => {
//   locoScroll.update();
// });

function locomotiveSmoothScroll() {
  gsap.registerPlugin(ScrollTrigger);
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
  let revealElems = document.querySelectorAll(".reveal");
  //  console.log(revealElems);
  revealElems.forEach((elem) => {
    let parentVar = document.createElement("span");
    let childVar = document.createElement("span");
    parentVar.classList.add("parent");
    childVar.classList.add("child");

    childVar.innerHTML = elem.innerHTML;
    // console.log(childVar);

    parentVar.appendChild(childVar);
    // console.log(parentVar);

    elem.innerHTML = "";
    elem.appendChild(parentVar);
    // console.log(elem);
  });
}
function valueSetters() {
  gsap.set("nav h4", { y: "-100%", opacity: 0 });
  gsap.set("#section-1 .parent .child", { y: "100%" });
  gsap.set(".down-arrow", { y: "100%", opacity: 0 });
}

function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from("#loader-first .child span", {
    x: "100%",
    delay: 1,
    stagger: 0.3,
    ease: Power3.linear,
    opacity: 0,
  })
    .to("#loader-first .parent .child", {
      y: "-100%",
      duration: 0.5,
      ease: Expo.easeInOut,
    })
    .to("#loader-first", {
      height: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    })
    .to("#green", {
      height: "100%",
      duration: 2,
      delay: -2,
      ease: Expo.easeInOut,
    })
    .to("#gray", {
      height: "100%",
      duration: 2,
      delay: -1.7,
      ease: Expo.easeInOut,
    })
    .to("#loader", {
      height: 0,
      opacity: 0,
      duration: 1,
      ease: Expo.easeInOut,
    })
    tl.to("#section-1", {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.5,
      ease: "expo.out",
      onComplete: function () {
        animateHomePage();
      },
    });
}

function animateHomePage() {
  var tl = gsap.timeline();
  tl.to("nav h4", {
    y: 0,
    opacity: 1,
    stagger: 0.3,
    ease: Expo.easeInOut,
  });
  tl.to("#section-1 .parent .child", {
    y: 0,
    opacity: 1,
    stagger: 0.5,
    ease: Expo.easeInOut,
    onComplete: function () {
      startSvgAnimation();
      startUnderlineAnimation();
    },
  });
  tl.to(".down-arrow", {
    y: 0,
    opacity: 1,
    stagger: 0.5,
    ease: Expo.easeInOut,
    onComplete: function () {
      startSvgAnimation();
      startUnderlineAnimation();
    },
  });
}

function startSvgAnimation() {
  let svgText = document.querySelectorAll(".stack-heading text");
  // console.log(svgText);
  svgText.forEach((elem) => {
    elem.style.animationPlayState = "running";
  });
}

function startUnderlineAnimation() {
  let svgUnderline = document.querySelectorAll(".underline path");
  // console.log(svgUnderline);
  svgUnderline.forEach((elem) => {
    elem.style.animationPlayState = "running";
  });
}





function cardShow() {
  const projects = document.querySelectorAll(".projects");
  const cursor = document.querySelector("#cursor");
  const cursorItems = document.querySelectorAll(".projects-cursor");
  const section = document.querySelector("#section-3");

  if (!projects.length || !cursor) return;

  // =========================
  // CURSOR SMOOTH FOLLOW
  // =========================
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  gsap.ticker.add(() => {
    cursorX += (mouseX - cursorX) * 0.18; // smoothness
    cursorY += (mouseY - cursorY) * 0.18;

    gsap.set(cursor, {
      x: cursorX,
      y: cursorY
    });
  });

  // =========================
  // PROJECT HOVER LOGIC
  // =========================
  projects.forEach(project => {
    const index = Number(project.dataset.index);
    const img = project.querySelector("img");

    project.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power3.out"
      });

      cursorItems.forEach(item => (item.style.opacity = 0));
      if (cursorItems[index]) cursorItems[index].style.opacity = 1;

      if (img) {
        img.style.filter = "grayscale(1)";
        section.style.backgroundColor = `#${img.dataset.bgcolor}`;
      }
    });

    project.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.85,
        duration: 0.25,
        ease: "power3.out"
      });

      cursorItems.forEach(item => (item.style.opacity = 0));

      if (img) img.style.filter = "grayscale(0)";
      section.style.backgroundColor = "#e8e8e8";
    });
  });
}



/* ===== SECTION 4 JS ===== */
/* =========================
   GSAP + SWIPER HORIZONTAL SCROLL
   abhi banana hai section 5 wla swiper yha pe bhi daal do
========================= */



/* ===== SECTION 5 Achievement ===== */
/* =========================
  
========================= */


function particlesAnimation(){
  gsap.registerPlugin(ScrollTrigger);



gsap.to(".cdss-globe", {
  rotate: 360,
  ease:"power1.out" ,
  scrollTrigger:{
    trigger: "#section-5",
    scroller: "[data-scroll-container]",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});
}



function swiperAnimationOnCards(){
  const caseSwiper = new Swiper(".caseSwiper", {
  slidesPerView: "auto",
  spaceBetween: 40,
  freeMode: true,
  grabCursor: true,
  mousewheel: {
    forceToAxis: true,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});
}


// Count-up numbers

function countNumberPoints(){
  const counts = document.querySelectorAll(".count");

  counts.forEach(el => {
    const target = +el.dataset.target;

    gsap.fromTo(el,
      { innerText: 0 },
      {
        innerText: target,
        duration: 2,
        ease: "power1.out",
        roundProps: "innerText",
        scrollTrigger: {
          trigger: el,
          scroller: "[data-scroll-container]", // 🔥 THIS WAS MISSING
          start: "top 80%",
          once: true
        }
      }
    );
  });
}




// Floating particles
function particleAnimation(){
  
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector("#section-5");
const container = section.querySelector(".particles-container");

const bounds = section.getBoundingClientRect();
const particleCount = 500;

for(let i = 0; i < particleCount; i++){
  const p = document.createElement("div");
  p.classList.add("particle");

  // depth
  const r = Math.random();
  if(r < 0.33) p.classList.add("small");
  else if(r < 0.66) p.classList.add("medium");
  else p.classList.add("large");

  container.appendChild(p);

  // section-based positioning
  gsap.set(p,{
    x: gsap.utils.random(0, bounds.width),
    y: gsap.utils.random(0, bounds.height),
  });

  // floating motion
  gsap.to(p,{
    x: "+=" + gsap.utils.random(-120,120),
    y: "-=" + gsap.utils.random(150,350),
    duration: gsap.utils.random(8,14),
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: gsap.utils.random(0,4)
  });

  // subtle rotation
  gsap.to(p,{
    rotation: gsap.utils.random(-180,180),
    duration: gsap.utils.random(12,20),
    repeat: -1,
    ease: "none"
  });
}

/* 🔥 Scroll-based parallax */
gsap.to(".particle",{
  yPercent: -25,
  ease: "none",
  scrollTrigger:{
    trigger: "#section-5",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});


}





/* ========================= */
/* SECTION 6 — GSAP REVEALS */
/* ========================= */

function section6Animation() {
  gsap.utils.toArray("#section-6 .reveal").forEach((el, i) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
      delay: i * 0.08,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        scroller: "[data-scroll-container]", // IMPORTANT for Locomotive
      }
    });
  });
}






/* ============================= */
/* GUITAR STRING – REAL PHYSICS */
/* ============================= */

function guitarHorizontalStrings() {
  const zones = document.querySelectorAll(".interactive-horizontal-string");

  zones.forEach(zone => {
    const strings = zone.querySelectorAll(".h-string");

    strings.forEach(string => {
      const baseY = Number(string.dataset.base);
      const main = string.querySelector(".h-string-main");
      const glow = string.querySelector(".h-string-glow");

      let currentY = baseY;
      let velocity = 0;

      const tension = 0.12;
      const damping = 0.85;
      const maxPull = 80;

      function animate() {
        velocity += (baseY - currentY) * tension;
        velocity *= damping;
        currentY += velocity;

        const d = `M 0 ${baseY} Q 500 ${currentY} 1000 ${baseY}`;
        main.setAttribute("d", d);
        glow.setAttribute("d", d);

        glow.style.opacity = Math.min(1, Math.abs(velocity) / 12);

        requestAnimationFrame(animate);
      }

      animate();

      zone.addEventListener("mousemove", e => {
        const rect = zone.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const pull = Math.max(-maxPull, Math.min(maxPull, y - baseY));
        currentY = baseY + pull;
      });

      zone.addEventListener("mouseleave", () => {
        velocity += 26;
      });
    });
  });
}

guitarHorizontalStrings();







function guitarVerticalStrings() {
  const stringZones = document.querySelectorAll(".interactive-vertical-string");

  stringZones.forEach(zone => {
    const index = zone.dataset.stringIndex;
    const mainString = zone.querySelector(".v-string-main");
    const glowString = zone.querySelector(".v-string-glow");

    if (!mainString || !glowString) return;

    let baseX = 100;
    let currentX = 100;
    let velocity = 0;

    const tension = 0.1;
    const damping = 0.85;
    const maxPull = 90;

    function animateString() {
      velocity += (baseX - currentX) * tension;
      velocity *= damping;
      currentX += velocity;

      const d = `M 100 0 Q ${currentX} 500 100 1000`;
      mainString.setAttribute("d", d);
      glowString.setAttribute("d", d);

      glowString.style.opacity = Math.min(1, Math.abs(velocity) / 10);

      requestAnimationFrame(animateString);
    }

    animateString();

    zone.addEventListener("mousemove", (e) => {
      const rect = zone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pull = Math.max(-maxPull, Math.min(maxPull, x - baseX));
      currentX = baseX + pull;
    });

    zone.addEventListener("mouseleave", () => {
      velocity += 28; // vibration kick
    });
  });
}

guitarVerticalStrings();
