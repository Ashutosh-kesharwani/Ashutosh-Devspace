
revealToSpan();
valueSetters();
loadingAnimation();





function revealToSpan(){
 let revealElems=document.querySelectorAll('.reveal');
//  console.log(revealElems);
revealElems.forEach((elem)=>{

    let parentVar= document.createElement('span');
    let childVar= document.createElement('span');
    parentVar.classList.add('parent');
    childVar.classList.add('child');

    
    childVar.innerHTML=elem.innerHTML;
    // console.log(childVar);
    
    parentVar.appendChild(childVar);
    // console.log(parentVar);

    elem.innerHTML="";
    elem.appendChild(parentVar);
    // console.log(elem);
    
})
 

}
function valueSetters(){
 gsap.set("nav h4",{ y:"-100%", opacity:0})
 gsap.set("#section-1 .parent .child",{y:"100%"})
 gsap.set(".down-arrow",{y:"100%", opacity:0})
    
}


function loadingAnimation(){
   var tl= gsap.timeline();
   tl
   .from('#loader-first .child span',{
    x:"100%",
    delay:1,
    stagger:0.3,
    ease:Power3.linear,
    opacity:0,
   })
   .to('#loader-first .parent .child',{
    y:"-100%",
    duration:0.5,
    ease:Expo.easeInOut,
   })
   .to('#loader-first',{
    height:0,
    duration:1.5,
    ease:Expo.easeInOut,
   })
   .to('#green',{
    height:"100%",
    duration:2,
    delay:-2,
    ease:Expo.easeInOut,
   })
   .to('#gray',{
    height:"100%",
    duration:2,
    delay:-1.7,
    ease:Expo.easeInOut,
   })
   .to("#loader",{
    height:0,
    opacity:0,
    duration:1,
    ease:Expo.easeInOut,
   })
   .from("#section-1",{
  height:0,
 duration: 1.8,
  ease: "power4.out",
  delay:-1.3,
  onComplete: function(){
   animateHomePage(); 
  }
})


}


function animateHomePage(){
   
     var tl = gsap.timeline();
    tl.to("nav h4",{
        y:0,
        opacity:1,
        stagger:.3,
        ease:Expo.easeInOut,
    })
    tl.to("#section-1 .parent .child",{
        y:0,
        opacity:1,
        stagger:.5,
        ease:Expo.easeInOut,
        onComplete:function(){
             startSvgAnimation();  
             startUnderlineAnimation();
        }
    })
    tl.to(".down-arrow",{
        y:0,
        opacity:1,
        stagger:.5,
        ease:Expo.easeInOut,
        onComplete:function(){
             startSvgAnimation();  
             startUnderlineAnimation();
        }
    })
    
}

function startSvgAnimation(){
    let svgText= document.querySelectorAll('.stack-heading text');
    // console.log(svgText);
    svgText.forEach((elem)=>{
        elem.style.animationPlayState = "running";
    })
}

function startUnderlineAnimation(){
    let svgUnderline=document.querySelectorAll('.underline path');
    console.log(svgUnderline);
    svgUnderline.forEach((elem)=>{
        elem.style.animationPlayState = "running";
    })
    
}









