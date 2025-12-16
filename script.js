locomotiveSmoothScroll();
revealToSpan();
valueSetters();
loadingAnimation();
cardShow();

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




function cardShow(){
  let imagesArr= document.querySelectorAll('.projects');
  // console.log(imagesArr);
  imagesArr.forEach((elem)=>{
    // create a flag var for remove image on mouseleave
    let showingImage;
    elem.addEventListener('mousemove',(dets)=>{

      cursor.style.opacity = 1;
      // console.log(dets.x);
      // console.log("Hhhh");

      // console.log(dets.target.dataset.index); ye hame btayga k kis image pe move kar rahe hai project wali

      // now to cursor wale me jo just andar div hai jiski opacity css me 0 kiye hai uss div pe move ke liye 
    /*console.log(
      document.querySelector("#cursor").children[dets.target.dataset.index]);*/
      
   // to abb jis image pe mouse move tha uss image pe leave pe opacity 0 kardo cursor div ki 
      showingImage=dets.target;
      document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity=1;
      document.querySelector("#cursor").children[dets.target.dataset.index].style.transform=`translate(${dets.clientX}px,${dets.clientY}px)`;

      showingImage.style.filter="grayscale(1)";
      // console.log(document.querySelector("#section-3"));
      
      document.querySelector("#section-3").style.backgroundColor=`#${dets.target.dataset.bgcolor}`;
      
    })

    elem.addEventListener('mouseleave',(dets)=>{


      document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity=0;
      showingImage.style.filter="grayscale(0)";
      
      document.querySelector("#section-3").style.backgroundColor="#e8e8e8";
     cursor.style.opacity = 0;
    })
  })
  
}