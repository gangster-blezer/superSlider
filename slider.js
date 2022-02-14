var numprev;

function slideset(n,bt,trackclass,sliderclass) {

  var track = document.getElementsByClassName(trackclass)[0];

  if(numprev==undefined){
      numprev = 1;
    }

    //console.log(numprev);

  if(n==6){
    n = 1;
    console.log("есть");
  }

  if(n==0){
    n=5;
  }

  

  let startp = Date.now(); // запомнить время начала
    let time = 800;
    let slidewp = document.querySelector(sliderclass).offsetWidth;
    document.getElementById(numprev).classList.remove("active-sl-btn");
    if(bt==null){
      document.getElementById(n).classList.add("active-sl-btn");
    }else{
      bt.classList.add("active-sl-btn");
    }

    //let numprev = Math.abs(getTrX(document.querySelector('.poplular-slider-track'))/slidew)+1;

    function goslide(num){
      return slidewp*(num-1);
    }


  let timerp = setInterval(function() {
    // сколько времени прошло с начала анимации?
    let timePassed = Date.now() - startp;

    if (timePassed >= time) {
      //bt.disabled = true;
      numprev = Number(n);
      track.setAttribute("style", "transform: translateX("+ -((slidewp*(n-2)) + (slidewp))+"px);");
      clearInterval(timerp); // закончить анимацию через 2 секунды
      return;
    }

    if(n<numprev){
      tran = -(goslide(n+1)) + ((slidewp*timePassed)/time);
    }else{
      tran = -(goslide(n-1)) - ((slidewp*timePassed)/time);
    }
    
    
  track.setAttribute("style", "transform: translateX("+tran+"px);");
    

  }, 10);
}

//getTrX(document.querySelector('.poplular-slider-track'));

function getTrX(obj){
  let tr = window.getComputedStyle(obj).transform.split(",")[4];
    if(tr==undefined){
      return 0;
    }else {
      return tr;
    }
     
}


function tochslider(trackclass){
  console.log("a")
  track = document.getElementsByClassName(trackclass)[0];

  getEvent = function() {
  return event.type.search('touch') !== -1 ? event.touches[0] : event;
  // p.s. event - аргумент по умолчанию в функции
},
// или es6
getEvent = () => event.type.search('touch') !== -1 ? event.touches[0] : event,

swipeStartp = function() {
  let evt = getEvent();
  isSwipe = true;

  // берем начальную позицию курсора по оси Х
  posInit = posX1 = evt.clientX;
  posYInit = posY1 = evt.clientY;
  //console.log(posInit)
  track.addEventListener('mousemove', swipeActionp);
  track.addEventListener('mouseup', swipeEndp);


  track.addEventListener('pointermove', swipeActionp);
  track.addEventListener('pointercancel', swipeEndp);

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
      posX1 = evt.clientX;
      a = a + posX2;
      //document.getElementsByClassName('sliderview')[0].setAttribute("style", "transform: translateX("+(-a)+"px);");
  }

  
}

swipeEndp = function() {
    posFinal = posInit - posX1;
    posYFinal = Math.abs(posYInit - posY1);
    //console.log(posYFinal);
    isScroll = false;
    isSwipe = false;
    document.removeEventListener('mousemove', swipeActionp);
    document.removeEventListener('mouseup', swipeEndp);
    
    document.removeEventListener('pointermove', swipeActionp);
    document.removeEventListener('pointercancel', swipeEndp);

    if(numprev==undefined){
      numprev = 1;
    }
    
    if(posFinal>0 && posYFinal < 10){
      //console.log(document.getElementById( Number(numprev)+1 ));
      
      slideset(numprev+1,document.getElementById( Number(numprev)+1 ));
    }
    if(posFinal<0 && posYFinal < 10){
      slideset(numprev-1,document.getElementById( Number(numprev)-1 ));
    }
}

track.addEventListener('mousedown', swipeStartp);
track.addEventListener('mouseup', swipeEndp);

track.addEventListener('pointerdown', swipeStartp);
track.addEventListener('pointercancel', swipeEndp);
}