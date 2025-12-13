revealToSpan();
loadingAnimation();



/*
we are creating this type of structure to every reveal class element:

<h3 class="reveal">
    <span class="parent">
        <span class="child">
        DESIGN PORTFOLIO
        </span>
    </span>
</h3>
*/

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
    console.log(elem);
    
})
 

}

function loadingAnimation(){
   var tl= gsap.timeline();
   tl
   .from('.reveal .parent .child span',{
    x:"100%",
    delay:1,
    stagger:0.3,
    ease:Power3.linear,
    opacity:0,
   })
   .to('.reveal .parent .child',{
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
   .to('#white',{
    height:"100%",
    duration:2,
    delay:-1.7,
    ease:Expo.easeInOut,
   })
}









