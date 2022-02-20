class SuperSlider{
  constructor(trackClass,slideClass,slidesCount,mrg){
    //this.track = document.getElementsByClassName(trackClass)[0];
    this.track = document.querySelector("."+trackClass);
    this.slideWidth = document.querySelector(slideClass).offsetWidth;
    this.slidesCount = slidesCount;
    this.slideMargin = 20;
    this.num_slide = 0;
    //(document.querySelector("."+trackClass).offsetWidth - this.slideWidth)/5;
    //console.log((document.querySelector("."+trackClass).offsetWidth - (5*this.slideWidth)))
  }

  getSlidePath(num){
    return num*(this.slideWidth + this.slideMargin);
  }

  getTrX(obj){
    let tr = window.getComputedStyle(obj).transform.split(",")[4];
    
    if(tr==undefined){
      return 0;
    }else {
      return tr;
    }
     
  }

  setSlide(n){
    //console.log(this.slideMargin);
        this.track.classList.add("trans");
       let tran = -this.getSlidePath(n);
       
       this.track.setAttribute("style", "transform: translateX("+tran+"px);");
       this.num_slide = n;


    //this.track.setAttribute("style", "transform: translateX("+ -(SuperSlider.getSlidePath(n))+"px);");
  }

  /*GetEvent(event){
    let getEvent = () => event.type.search('touch') !== -1 ? event.touches[0] : event;
    return getEvent();
  }*/
}

var popularSlider = new SuperSlider("poplular-slider-track",".popular",5,20);
console.log(popularSlider.getEvent);

var a;
var start_time;
var end_time;
a = 0;
track = document.getElementsByClassName("poplular-slider-track")[0];

  getEvent = function() {
  return event.type.search('touch') !== -1 ? event.touches[0] : event;
  // p.s. event - аргумент по умолчанию в функции
},
// или es6
getEvent = () => event.type.search('touch') !== -1 ? event.touches[0] : event,

swipeStartp = function() {
  start_time = Date.now();
  let evt = getEvent();
  isSwipe = true;
  popularSlider.track.classList.remove("trans");

  a = Math.abs(popularSlider.getTrX(track));
  console.log("tr "+a)

  // берем начальную позицию курсора по оси Х
  posInit = posX1 = evt.clientX;
  posYInit = posY1 = evt.clientY;
  //console.log(posInit)
  track.addEventListener('mousemove', swipeActionp);
  track.addEventListener('mouseup', swipeEndp);


  track.addEventListener('pointermove', swipeActionp);
  track.addEventListener('pointerup', swipeEndp);

},
swipeActionp = function() {
  let evt = getEvent();

  posY2 = posY1 - evt.clientY;
  posY1 = evt.clientY;

      let posY = Math.abs(posY2);
      //console.log(posY);
      if (posY > 111) {
        isSwipe = false;
      } else if (posY < 111) {
        isSwipe = true;
      }

  if(isSwipe){
      posX2 = posX1 - evt.clientX;
      //console.log(posX1)
      posX1 = evt.clientX;
      
      a = Number(a) + Number(posX2);
      //console.log("a "+a)
      //st = popularSlider.getTrX(document.getElementsByClassName("poplular-slider-track")[0]);
      //console.log(st);
      //console.log('getTr '+)
      document.getElementsByClassName("poplular-slider-track")[0].setAttribute("style", "transform: translateX("+(-a)+"px);");
      //a = a + posX2;
      //document.getElementsByClassName('sliderview')[0].setAttribute("style", "transform: translateX("+(-a)+"px);");
  }

  
}

swipeEndp = function() {
    end_time = Date.now();
    time = end_time - start_time;

    posFinal = posInit - posX1;
    posYFinal = Math.abs(posYInit - posY1);
    speed_x = posFinal/time;
    console.log("end")
    //console.log(popularSlider.getTrX(document.getElementsByClassName("poplular-slider-track")[0]));
    
    if((posFinal > (popularSlider.slideWidth+popularSlider.slideMargin)/2)||speed_x > 0.5){
      popularSlider.setSlide(popularSlider.num_slide+1);
    }else if((posFinal < -(popularSlider.slideWidth+popularSlider.slideMargin)/2)||speed_x < -0.5){
        popularSlider.setSlide(popularSlider.num_slide-1);
    }else{
      popularSlider.setSlide(popularSlider.num_slide);
    }

    //a = posYFinal;
    //console.log(posYFinal);
    isScroll = false;
    isSwipe = false;
    track.removeEventListener('mousemove', swipeActionp);
    track.removeEventListener('mouseup', swipeEndp);
    
    track.removeEventListener('pointermove', swipeActionp);
    track.removeEventListener('pointerup', swipeEndp);
}

track.addEventListener('mousedown', swipeStartp);
track.addEventListener('mouseup', swipeEndp);

track.addEventListener('pointerdown', swipeStartp);
track.addEventListener('pointerup', swipeEndp);

