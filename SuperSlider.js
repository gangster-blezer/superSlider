class SuperSlider{
  constructor(trackClass,slideClass,slidesCount,mrg,anim){
    //this.track = document.getElementsByClassName(trackClass)[0];
    this.track = document.querySelector("."+trackClass);
    this.slideWidth = document.querySelector(slideClass).offsetWidth;
    this.slidesCount = slidesCount;
    this.slideMargin = 20;
    this.num_slide = 0;
    this.anim = anim;
    this.track.addEventListener('mousedown', this.swipeStart);
    this.track.addEventListener('mouseup', this.swipeEnd);
    this.track.addEventListener('pointerdown', this.swipeStart);
    this.track.addEventListener('pointerup', this.swipeEnd);
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
      this.track.classList.add(this.anim);

      if(n=="next"){
        n = this.num_slide+1;
      }else if(n=="back"){
        n = this.num_slide-1;
      }

      if(n==-1){
        n=this.slidesCount-1;
      }

      if(n==this.slidesCount){
        n=0;
      }

      let tran = -this.getSlidePath(n);
      this.track.setAttribute("style", "transform: translateX("+tran+"px);");
      this.num_slide = n
      
  }

  swipeStart = () => {
    let evt = event.type.search('touch') !== -1 ? event.touches[0] : event;
    this.start_time = Date.now();
    this.track.classList.remove(this.anim);
    this.a = Math.abs(this.getTrX(this.track));
    this.posInit = this.posX1 = evt.clientX;
    this.posYInit = this.posY1 = evt.clientY;
    console.log(this.a)
    this.track.addEventListener('mousemove', this.swipeAction);
    this.track.addEventListener('mouseup', this.swipeEnd);


    this.track.addEventListener('pointermove', this.swipeAction);
    this.track.addEventListener('pointerup', this.swipeEnd);

  }


  swipeAction = () => {
    let evt = event.type.search('touch') !== -1 ? event.touches[0] : event;

    this.posY2 = this.posY1 - evt.clientY;
    this.posY1 = evt.clientY;
    this.posX2 = this.posX1 - evt.clientX;
    //console.log(posX1)
    this.posX1 = evt.clientX;
      
    this.a = Number(this.a) + Number(this.posX2);
    this.track.setAttribute("style", "transform: translateX("+(-this.a)+"px);");
  }

  swipeEnd = () => {
    this.end_time = Date.now();
    this.time = this.end_time - this.start_time;

    this.posFinal = this.posInit - this.posX1;
    this.posYFinal = Math.abs(this.posYInit - this.posY1);
    this.speed_x = this.posFinal/this.time;
    console.log("end")
    //console.log(popularSlider.getTrX(document.getElementsByClassName("poplular-slider-track")[0]));
    
    if((this.posFinal > (this.slideWidth+this.slideMargin)/2)||this.speed_x > 0.5){
      this.setSlide(this.num_slide+1);
    }else if((this.posFinal < -(this.slideWidth+this.slideMargin)/2)||this.speed_x < -0.5){
        this.setSlide(this.num_slide-1);
    }else{
      this.setSlide(this.num_slide);
    }

    this.track.removeEventListener('mousemove', this.swipeAction);
    this.track.removeEventListener('mouseup', this.swipeEnd);
    
    this.track.removeEventListener('pointermove', this.swipeAction);
    this.track.removeEventListener('pointerup', this.swipeEnd);
  }
}

var popularSlider = new SuperSlider("poplular-slider-track",".popular",5,20,"trans");
//console.log(popularSlider.GetEvent);

