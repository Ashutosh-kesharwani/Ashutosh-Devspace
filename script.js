locomotiveSmoothScroll();
revealToSpan();
valueSetters();
loadingAnimation();
cardShow();
window.addEventListener("load", () => {
  locoScroll.update();
});
imagesLoaded("main", () => {
  locoScroll.update();
});
window.addEventListener("resize", () => {
  locoScroll.update();
});

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




// function cardShow(){
//   let imagesArr= document.querySelectorAll('.projects');
//   // console.log(imagesArr);
//   imagesArr.forEach((elem)=>{
//     // create a flag var for remove image on mouseleave
//     let showingImage;
//     elem.addEventListener('mousemove',(dets)=>{
//         showingImage=dets.target;
//   //  console.log(showingImage);
   
//       cursor.style.opacity = 1;
//       // console.log(dets.x);
//       // console.log("Hhhh");

//       // console.log(dets.target.dataset.index); ye hame btayga k kis image pe move kar rahe hai project wali

//       // now to cursor wale me jo just andar div hai jiski opacity css me 0 kiye hai uss div pe move ke liye 
//     console.log(
//       document.querySelector("#cursor").children[dets.target.dataset.index]);
      
//    // to abb jis image pe mouse move tha uss image pe leave pe opacity 0 kardo cursor div ki 
    
//       document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity=1;
//       document.querySelector("#cursor").children[dets.target.dataset.index].style.transform=`translate(${dets.clientX}px,${dets.clientY}px)`;

//       showingImage.style.filter="grayscale(1)";
//       // console.log(document.querySelector("#section-3"));
      
//       document.querySelector("#section-3").style.backgroundColor=`#${dets.target.dataset.bgcolor}`;
      
//     })

//     elem.addEventListener('mouseleave',(dets)=>{


//       document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity=0;
//       showingImage.style.filter="grayscale(0)";
      
//       document.querySelector("#section-3").style.backgroundColor="#e8e8e8";
//      cursor.style.opacity = 0;
//     })
//   })
  
// }

// function cardShow() {
//   const projects = document.querySelectorAll(".projects");
//   const cursor = document.querySelector("#cursor");
//   const cursorItems = document.querySelectorAll(".projects-cursor");
//   const section = document.querySelector("#section-3");

//   projects.forEach(project => {

//     project.addEventListener("mousemove", (e) => {
//       const index = project.dataset.index;

//       cursor.style.opacity = 1;
//       cursor.style.left = e.clientX + "px";
//       cursor.style.top = e.clientY + "px";

//       cursorItems.forEach(item => item.style.opacity = 0);
//       cursorItems[index].style.opacity = 1;

//       const img = project.querySelector("img");
//       section.style.backgroundColor = `#${img.dataset.bgcolor}`;
//       img.style.filter = "grayscale(1)";
//     });

//     project.addEventListener("mouseleave", () => {
//       cursor.style.opacity = 0;
//       cursorItems.forEach(item => item.style.opacity = 0);

//       const img = project.querySelector("img");
//       img.style.filter = "grayscale(0)";
//       section.style.backgroundColor = "#e8e8e8";
//     });

//   });
// }

// cardShow();



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





