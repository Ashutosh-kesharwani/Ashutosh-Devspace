



revealToSpan();
valueSetters();
loadingAnimation();
locomotiveSmoothScroll();
navScrollAnimation();
cardShow();
countNumberPoints();
section7Animation();
marqueeAnimation();
particleFloatingAnimation();
particlesGlobeAnimation();
section6Animation();
guitarHorizontalStrings()
guitarVerticalStrings();
swiperAnimationOnCards();
initFooterAnimation();




genericRevealWordAnimation();


function locomotiveSmoothScroll() {
  // gsap.registerPlugin(ScrollTrigger);
  window.loco = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    multiplier: 0.5,
  });
  loco.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length
        ? loco.scrollTo(value, 0, 0)
        : loco.scroll.instance.scroll.y;
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
  ScrollTrigger.addEventListener("refresh", () => loco.update());
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
  // gsap.set(".values-wrapper #header .reveal", { y: 0 });
  
}

function loadingAnimation() {
  const tl = gsap.timeline({
    defaults: { ease: "expo.out" }
  });


  tl.from("#loader-first .child span", {
  x: "120%",
  opacity: 0,
  scale:0.1,
  filter: "blur(10px)",   // 👈 YAHAN ADD KARO
  delay: 0.8,
  stagger: {
    each: 0.18,
    ease: "power2.out"
  },
  duration: 1.2,
  ease: "expo.out",
  onComplete: () => {
    gsap.set("#loader-first .child span", { filter: "blur(0px)" });
  }
})



  .to("#loader-first .parent .child", {
    y: "-100%",
    duration: 0.7,
    ease: "expo.inOut"
  }, "+=0.1")


  .to("#loader-first", {
    height: 0,
    duration: 1.4,
    ease: "expo.inOut"
  }, "-=0.3")


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


  .to("#loader", {
    height: 0,
    opacity: 0,
    duration: 1,
    ease: "expo.inOut"
  }, "-=0.8")


  .to("#section-1", {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: 1.2,
    ease: "expo.out",
    onComplete: () => {
  animateHomePage();

}

  }, "-=0.9");
}


function animateHomePage() {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1
    }
  });

  // NAV – subtle reveal
  tl.fromTo("nav h4",
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.8
    }
  )

  // HERO TEXT – luxury float
  .fromTo("#section-1 .parent .child",
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
    "-=0.3" // overlap with nav
  )

  // SVG underline + stack text (sync)
  .add(() => {
    startSvgAnimation();
  }, "-=0.6")

  // DOWN ARROW – gentle call to action
  .fromTo(".down-arrow",
    {
      y: 40,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "expo.out"
    },
    "-=0.4"
  );
}


function startSvgAnimation() {
  let svgText = document.querySelectorAll(".stack-heading text");
  // console.log(svgText);
  svgText.forEach((elem) => {
    elem.style.animationPlayState = "running";
  });
}


function navScrollAnimation(){
  gsap.to("nav", {
  height: "12vh",
  backgroundColor: "rgba(20, 20, 20, 0.55)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
  ease: "power3.out",
  scrollTrigger: {
    trigger: "body",
    scroller: "[data-scroll-container]",
    start: "top top",
    end: "top+=120",
    scrub: 0.6,
  }
});

}





function genericRevealWordAnimation(){



 gsap.utils.toArray(".generic.reveal").forEach((el, i) => {
    gsap.from(el, {
      y: 90,
      opacity: 0,
      scale:0.9,
      duration: 0.8,
      ease: "power3.out",
      delay: i * 0.05,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        scroller: "[data-scroll-container]"
      }
    });
  });


  ScrollTrigger.create({
  trigger: "#section-3",
  scroller: "[data-scroll-container]", // locomotive support
  start: "top 75%",
  once: true,               // 🔥 only once
  onEnter: wordTypingEffect // 🔥 start typing here
});
}


function wordTypingEffect() {
  const para = document.querySelector("#typing-para");
  if (!para) return;

  const text = ' " Crafting Seamless Interfaces From Concept To Code. "';
  const words = text.split(" ");

  para.innerHTML = "";

  let wordIndex = 0;

  function typeWord() {
    if (wordIndex >= words.length) return;

    const word = words[wordIndex];
    const wordSpan = document.createElement("span");
    para.appendChild(wordSpan);

    let letterIndex = 0;

    function typeLetter() {
      if (letterIndex >= word.length) {
        para.innerHTML += " ";
        wordIndex++;
        setTimeout(typeWord, 10);
        return;
      }

      const letterSpan = document.createElement("span");
      letterSpan.classList.add("typing-letter");
      letterSpan.textContent = word[letterIndex];
      wordSpan.appendChild(letterSpan);

      gsap.to(letterSpan, {
        opacity: 1,
        duration: 0.12,
        ease: "power1.out"
      });

      letterIndex++;
      setTimeout(typeLetter, 40);
    }

    typeLetter();
  }

  typeWord();

  
}

function cardShow() {
  const projects = document.querySelectorAll(".projects");
  const cursor = document.querySelector("#cursor");
  const cursorItems = document.querySelectorAll(".projects-cursor");
  const section = document.querySelector("#section-3");

  if (!projects.length || !cursor || !section) return;

  // =========================
  // CURSOR SMOOTH FOLLOW (RAF)
  // =========================
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let rafId = null;

  function followCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    rafId = requestAnimationFrame(followCursor);
  }

  section.addEventListener("mouseenter", () => {
    if (!rafId) followCursor();
  });

  section.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  section.addEventListener("mouseleave", () => {
    cancelAnimationFrame(rafId);
    rafId = null;

    gsap.to(cursor, {
      opacity: 0,
      scale: 0.85,
      duration: 0.25,
      ease: "power3.out"
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
      cursorItems.forEach(item => (item.style.opacity = 0));

      if (img) img.style.filter = "grayscale(0)";
      section.style.backgroundColor = "#e8e8e8";
    });
  });
}







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




function particlesGlobeAnimation(){
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




function swiperAnimationOnCards() {
  const caseSwiper = new Swiper(".caseSwiper", {
    slidesPerView: "auto",
    spaceBetween: 40,
    freeMode: true,
    grabCursor: true,
    mousewheel: {
      forceToAxis: true,
    }
  });
}










function particleFloatingAnimation(){
  
const section = document.querySelector("#section-5");
const container = section.querySelector(".particles-container");

const bounds = section.getBoundingClientRect();
const particleCount = 400;

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



function section7Animation() {
  const section = document.querySelector("#section-7");
  if (!section) return;
  

  const titleSpans = section.querySelectorAll(".decisions-title span");
  const items = section.querySelectorAll(".decision-item");

  // Initial state
  gsap.set(titleSpans, { opacity: 0, y: 80 });
  gsap.set(items, { opacity: 0, y: 60 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      scroller: "[data-scroll-container]",
      start: "top 70%",
      end: "top 0%",        // 🔥 scroll distance
      scrub: 1.2,            // 🔥 THIS IS THE FEEL
      // markers: true
    }
  });

  // PHASE 1 — HEADING
  tl.to(titleSpans, {
    opacity: 1,
    y: 0,
    duration:0.12,
    ease: "power3.out",
    duration: 1
  });

  // PHASE 2 — ITEMS (AFTER HEADING)
  tl.to(items, {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    ease: "power3.out",
    duration: 0.9
  }, "+=0.3"); // gap after heading
  // console.log(section);
  
}






function marqueeAnimation() {
  let currentTween;

  window.addEventListener("wheel", function (dets) {
    // kill previous animation (smoothness ka main reason)
    if (currentTween) currentTween.kill();

    if (dets.deltaY > 0) {
      currentTween = gsap.to(".decisions-marquee", {
        x: "-200%",
        repeat: -1,
        duration: 3,        // 🔥 faster than before
        ease: "linear"
      });

      gsap.to(".decisions-marquee img", {
        rotate: 180,
        duration: 0.4,
        ease: "power3.out"
      });
    } else {
      currentTween = gsap.to(".decisions-marquee", {
        x: "0%",
        repeat: -1,
        duration: 3,
        ease: "linear"
      });

      gsap.to(".decisions-marquee img", {
        rotate: 0,
        duration: 0.4,
        ease: "power3.out"
      });
    }
  });
}



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


function initFooterAnimation() {
  const footer = document.querySelector("#final-footer");
  const footerBg = document.querySelector(".footer-bg");
  console.log(footer);
  console.log(footerBg);
  

  if (!footer || !footerBg) return;

  // GSAP reveal
  const footerTL = gsap.timeline({
  scrollTrigger: {
  trigger: "#final-footer",
  scroller: "[data-scroll-container]",
  start: "top 30%",
  // markers: true,
  once: true
}

});

footerTL
  .from("#final-footer .parent .child", {
    y: 100,
    opacity: 0,
    stagger: 0.12,
    duration: 1.2,
    ease: "power3.out"
  })
  .to(".intent-line", {
    width: "48%",
    duration: 0.9,
    ease: "power2.out"
  }, "-=0.6")
  .from(".footer-identity", {
    y: 40,
    opacity: 0,
    duration: 0.8
  }, "-=0.4")
  .from(".footer-actions-list li", {
    y: 30,
    opacity: 0,
    stagger: 0.12,
    duration: 0.6
  }, "-=0.3")
  .from(".footer-closure-text", {
    y: 20,
    opacity: 0,
    duration: 0.5
  }, "-=0.2");


  // Background interaction
  let gx = 50, gy = 50;
  let tgx = 50, tgy = 50;
  let glow = 0.9, targetGlow = 0.9;
  let lastScrollY = 0;

  footer.addEventListener("mousemove", e=>{
    const r = footer.getBoundingClientRect();
    tgx = 50 + ((e.clientX - r.left) / r.width - .5) * 10;
    tgy = 50 + ((e.clientY - r.top) / r.height - .5) * 10;
  });

  footer.addEventListener("mouseleave", ()=>{
    tgx = 50; tgy = 50;
  });

  if (window.loco) {
    loco.on("scroll", args=>{
      const v = Math.abs(args.scroll.y - lastScrollY);
      targetGlow = Math.min(1.05, 0.9 + v * 0.0008);
      lastScrollY = args.scroll.y;
    });
  }

  function animateFooterGlow(){
    gx += (tgx - gx) * 0.04;
    gy += (tgy - gy) * 0.04;
    glow += (targetGlow - glow) * 0.04;

    footerBg.style.setProperty("--gx", `${gx}%`);
    footerBg.style.setProperty("--gy", `${gy}%`);
    footerBg.style.setProperty("--glow", glow.toFixed(2));

    requestAnimationFrame(animateFooterGlow);
  }

  animateFooterGlow();
}



