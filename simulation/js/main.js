 // * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


                
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }    
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
}

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
}

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn(){
  let nextBtn = document.querySelector(".btn-next")
  nextBtn.classList.toggle("btn-deactive")
}

const cancelSpeech = ()=>{
  window.speechSynthesis.cancel()
  ccQueue = []
}

const setIsProcessRunning = (value) => {
  // calling toggle the next
  if(value != isRunning){
    toggleNextBtn()
  }

  isRunning = value;
  if(value){
    Dom.useTogglePointerEventsHere(false)
    cancelSpeech()
    Dom.hideAll()
  }
};

// global for document object
const get = (query) => {
  return document.querySelector(query);
};

const getAll = (query) => {
  return document.querySelectorAll(query);
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const textToSpeach = (text,speak=true) => {
  // for filter <sub></sub>
  text = text.replaceAll("<sub>"," ").replaceAll("</sub>"," ")
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  if(isMute || !speak){
    utterance.volume = 0
    utterance.rate = 10
  }
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = 25, speak = true) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: speed,
    onStringTyped(){
      ccQueue.shift()
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())`
      // }
    }
  });
  let utterance = textToSpeach(text,speak)
  return utterance
}

class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else if (selector instanceof HTMLElement) {
      this.item = selector;
    } else {
      this.item = src.get(selector);
    }
    this.selector = selector;
    // push
  }
  getValue() {
    return this.item.attributes["value"].value;
  }
  setValue(val) {
    this.item.attributes["value"].value = val;
  }
  hidden() {
    return this.item.style.display == "none";
  }
  setContent(text) {
    this.item.innerHTML = text;
    return this;
  }
  zIndex(idx) {
    this.item.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.item.style.opacity = val;
    return this;
  }
  rotate(deg) {
    this.item.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  addClass(className) {
    this.item.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.item.classList.remove(className);
    return this;
  }
  borderRadius(amount) {
    amount += "px";
    this.styles({
      borderRadius: amount,
    });
  }
  scale(val = 1) {
    this.item.style.scale = val;
    return this;
  }
  get() {
    return this.item;
  }
  left(leftPixel) {
    this.item.left = leftPixel + "px";
    return this;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null,
    disp = "block"
  ) {
    // coordinates
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.height = height;
    this.width = width;
    this.item.style.opacity = 1;
    this.item.style.transform = "translateX(0) translateY(0)";

    if (this.left !== null) this.item.style.left = String(this.left) + "px";
    if (this.top !== null) this.item.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.item.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.item.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.item.style.height = String(this.height) + "px";
    if (this.width !== null) this.item.style.width = String(this.width) + "px";
    this.show(disp);
    return this;
  }
  show(disp = "block") {
    //! push for every element
    this.push();

    this.item.style.display = disp;
    // this.opacity();
    return this;
  }
  hide() {
    this.item.style.display = "none";
    return this;
  }
  play(speed = 1) {
    this.item.play();
    this.item.playbackRate = speed;
    return this;
  }
  // for setting styles
  styles(props) {
    for (let property in props) {
      this.item.style[property] = props[property];
    }
    return this;
  }
  pointerEvents(eventName){
    this.item.style.pointerEvents = eventName
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj) {
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems() {
    Dom.arrayOfAnimes = [];
  }
  static hideAll() {
    //to empty the setCC
    setCC("");
    // to delete all content of content adder menu
    Scenes.items.contentAdderBox.setContent("");
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
    }
    // * reset animes
    for (let i of Dom.arrayOfAnimes) {
      // to reset each anime after back btn pressed
      i.reset();
    }
    Dom.resetItems();
  }
  static resetItems() {
    Dom.arrayOfItems = [];
  }
  static useTogglePointerEvents = false
  static useTogglePointerEventsHere(use = true){
    if(use){
      this.useTogglePointerEvents = true
      this.togglePointerEvents()
    }
    else{
      let animeWindow = new Dom(".main-window")
      let animeHeader = new Dom(".anime-header")
      let animeFooter = new Dom(".anime-footer")
      let cd = getAll(".concept_development")
      let graph_boxes = getAll(".graph_box")
      cd.forEach(c=>{
        let cdd = new Dom(c)
        cdd.pointerEvents("all")
      })
      graph_boxes.forEach(gb=>{
        let g = new Dom(gb)
        g.pointerEvents("all")
      })
      this.isArrowBlinking = false
      animeHeader.pointerEvents("all")
      animeFooter.pointerEvents("all")
      animeWindow.pointerEvents("all")
      this.useTogglePointerEvents = false
    }
  }
  static isArrowBlinking = false
  static togglePointerEvents(){
    if(!this.useTogglePointerEvents){
      return
    }
    let animeWindow = new Dom(".main-window")
    let animeHeader = new Dom(".anime-header")
    let animeFooter = new Dom(".anime-footer")
    
    animeHeader.pointerEvents("all")
    animeFooter.pointerEvents("all")

    if(this.isArrowBlinking){
      animeWindow.pointerEvents("all")
    }
    else{
      animeWindow.pointerEvents("none")
    }
  }
  fadeHide(duration = 700, onCompleteCallback = null){
    anime({
      targets: this.item,
      opacity: 0,
      duration: duration,
      easing: "easeInOutQuad",
      complete: ()=>{
        this.hide()
        if(onCompleteCallback!=null){
          onCompleteCallback()
        }
      }
    });
    return this;
  }
  fadeShow(duration = 700, onCompleteCallback = null){
    this.show().opacity(0)
    anime({
      targets: this.item,
      opacity: 1,
      duration: duration,
      easing: "easeInOutQuad",
      complete: onCompleteCallback
    });
    return this;
  }
  onClick(callback=null){
    if(callback==null){
      this.item.onclick = ()=>{}
    }else{
      this.item.onclick = callback
    }
    return this
  }
  static maskClick(
    mask,
    onClick,
    leftAndDevMode = false,
    top = 0,
    height = 100,
    width = 100,
    rotate = 0
  ) {
    let maskImg = mask;
    // default px
    let leftPx = typeof leftAndDevMode === "boolean" ? 0 : leftAndDevMode;
    maskImg.set(leftPx, top, height, width).rotate(rotate).zIndex(1000);
    maskImg.styles({ cursor: "pointer" }).onClick(() => {
      maskImg.styles({ cursor: "unset" });
      maskImg.zIndex(0);
      Dom.setBlinkArrowRed(-1)
      maskImg.onClick(); // it will null
      if (onClick) {
        onClick();
      }
    });

    if (leftAndDevMode === true) {
      maskImg.styles({background: "red"})
    }
    return maskImg;
  }
  static setBlinkArrowOnElement(
    connectingElement,
    direction,
    arrowLeft = null,
    arrowTop = null
  ) {
    let blinkArrow = new Dom(".blinkArrowRed");
    let arrowHeight = 30;
    let arrowWidth = 38.25;
    let arrowRotate = 0;
    let gap = 6

    // get left top height and width of the connectingElement
    const connectingElementProps = {
      left: connectingElement.item.offsetLeft,
      top: connectingElement.item.offsetTop,
      right: Number(
        connectingElement.item.offsetLeft + connectingElement.item.offsetWidth
      ),
      bottom: Number(
        connectingElement.item.offsetTop + connectingElement.item.offsetHeight
      ),
      centerX: Number(
        connectingElement.item.offsetLeft +
          connectingElement.item.offsetWidth / 2
      ).toFixed(2),
      centerY: Number(
        connectingElement.item.offsetTop +
          connectingElement.item.offsetHeight / 2
      ).toFixed(2),
    };

    // for(let key in  connectingElementProps) {
    //   console.log(connectingElement.item)
    //   console.log(`${key}: ${connectingElementProps[key]}`)
    // }

    switch (direction) {
      case "left":
        arrowRotate = 90;
        arrowLeft = connectingElementProps.left -  arrowWidth - gap;
        arrowTop = connectingElementProps.centerY - arrowHeight / 2;
        break;

      case "right":
        arrowRotate = -90;
        arrowLeft = connectingElementProps.right + gap;
        arrowTop = connectingElementProps.centerY - arrowHeight / 2;
        break;

      case "top":
        arrowRotate = -180;
        arrowLeft = connectingElementProps.centerX - arrowWidth / 2;
        arrowTop = connectingElementProps.top - arrowHeight - gap
        break;

      case "bottom":
        arrowRotate = 0;
        arrowLeft = connectingElementProps.centerX - arrowWidth / 2;
        arrowTop = connectingElementProps.bottom + gap;
        break;
    }

    blinkArrow.set(arrowLeft, arrowTop, arrowHeight, arrowWidth).rotate(arrowRotate + 90).zIndex(10000);
    let y = 20;

    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });
    return {
      reset() {
        blinkArrow.hide();
        blink.reset();
      },
      play() {
        blink.play();
      },
    };
  }
  static setBlinkArrowRed(
    isX = true,
    left = null,
    top = null,
    height = 30,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom(".blinkArrowRed")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000)
    if (isX === -1) {
      this.isArrowBlinking = false
      this.togglePointerEvents()
      blinkArrow.hide();
      return;
    }
    if (isX === -2) {
      blinkArrow.show();
      return;
    }
    this.isArrowBlinking = true
    this.togglePointerEvents()
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = 60,
    rotate = 0
  ) {
    // because we added the blinkArrow image out of the anime-main
    top += 130;
    let blinkArrow = new Dom(".blinkArrow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  push() {
    if (this.selector != ".anime-header") Dom.arrayOfItems.push(this);
    return this;
  }
  forMathematicalExpressionBtn = 0;
}



// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  // ! To Plot graph
  plotGraph(
    ctx,
    graphIdx,
    startEmpty = false,
    xLabel = "",
    yLabel = "",
    data = [],
    dataLabel = "",
    beginAtZero = true,
  ) {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel
    Scenes.items.chart.label[graphIdx].x = xLabel
    // for label
    Scenes.items.yLabel.set(520, 213).setContent("india india").styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      width: "213px",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(694, 366).setContent("india india").styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
    });
    

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset 
    let datasets = [
      {
        label: dataLabel,
        fill: false,
        borderColor: "red",
        backgroundColor: "red",
        data: data,
        display: false,
      },
    ]

    if(startEmpty){
      datasets=[]
    }

    graphRef = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: yLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: xLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
        },
      },
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef
  },

  // for adding new datasets to graph
  graphFeatures: {
    addDataset(chart, label, bgColor, data) {
      chart.data.datasets.push({
        label: label,
        fill: false,
        borderColor: bgColor,
        backgroundColor: bgColor,
        data: data,
      });
      chart.update();
    },
    addData(chart, index, data) {
      console.log(data);
      if (data.length > 0) {
        chart.data.datasets[index].data = data;
      } else {
        chart.data.datasets[index].data.push(data);
      }
      chart.update();
    },
    getSizeOfDatasets(chart){
      return chart.data.datasets.length
    }
  },
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    tempTitle22: new Dom(".temp-title22"),
    tempTitle23: new Dom(".temp-title23"),
    tempTitle24: new Dom(".temp-title24"),
    tempTitle25: new Dom(".temp-title25"),
    tempTitle26: new Dom(".temp-title26"),
    tempTitle27: new Dom(".temp-title27"),
    tempTitle28: new Dom(".temp-title28"),
    tempTitle29: new Dom(".temp-title29"),
    tempTitle30: new Dom(".temp-title30"),
    tempTitle31: new Dom(".temp-title31"),
    tempTitle32: new Dom(".temp-title32"),
    tempTitle33: new Dom(".temp-title33"),
    tempTitle34: new Dom(".temp-title34"),
    tempTitle35: new Dom(".temp-title35"),
    tempTitle36: new Dom(".temp-title36"),
    tempTitle37: new Dom(".temp-title37"),
    tempTitle38: new Dom(".temp-title38"),
    tempTitle39: new Dom(".temp-title39"),
    tempTitle40: new Dom(".temp-title40"),
    tempTitle41: new Dom(".temp-title41"),
    tempTitle42: new Dom(".temp-title42"),
    tempTitle43: new Dom(".temp-title43"),
    tempTitle44: new Dom(".temp-title44"),
    tempTitle45: new Dom(".temp-title45"),
    tempTitle46: new Dom(".temp-title46"),
    tempTitle47: new Dom(".temp-title47"),
    tempTitle48: new Dom(".temp-title48"),
    tempTitle49: new Dom(".temp-title49"),
    tempTitle50: new Dom(".temp-title50"),
    tempTitle51: new Dom(".temp-title51"),
    tempTitle52: new Dom(".temp-title52"),
    tempTitle53: new Dom(".temp-title53"),
    tempTitle54: new Dom(".temp-title54"),
    tempTitle55: new Dom(".temp-title55"),
    tempTitle56: new Dom(".temp-title56"),
    tempTitle57: new Dom(".temp-title57"),
    tempTitle58: new Dom(".temp-title58"),
    tempTitle59: new Dom(".temp-title59"),
    tempTitle60: new Dom(".temp-title60"),

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),

//!images of previous experiment
    

part3_table_one : new Dom(".part3_table_one"),
part3_table_two : new Dom(".part3_table_two"),
part3_table_three : new Dom(".part3_table_three"),
part3_table_three_two : new Dom(".part3_table_three_two"),
part3_table_four : new Dom(".part3_table_four"),
part3_table_four_2 : new Dom(".part3_table_four_2"),
slider_vIn : new Dom(".slider_vIn"),
slider_D : new Dom(".slider_D"),
slider_R : new Dom(".slider_R"),
slider_box : new Dom(".universal-slider"),

graph0: new Dom(".graph0"),
graph1: new Dom(".graph1"),
graph2: new Dom(".graph2"),
graph3: new Dom(".graph3"),
graph4: new Dom(".graph4"),
graph5: new Dom(".graph5"),
graph6: new Dom(".graph6"),
graph7: new Dom(".graph7"),
graph8: new Dom(".graph8"),
graph9: new Dom(".graph9"),
graph10: new Dom(".graph10"),
graph_box_0: new Dom(".graph_box0"),
graph_box_1: new Dom(".graph_box1"),
graph_box_2: new Dom(".graph_box2"),
graph_box_3: new Dom(".graph_box3"),
graph_box_4: new Dom(".graph_box4"),
graph_box_5: new Dom(".graph_box5"),
graph_box_6: new Dom(".graph_box6"),
graph_box_7: new Dom(".graph_box7"),
graph_box_8: new Dom(".graph_box8"),
graph_box_9: new Dom(".graph_box9"),
graph_box_10: new Dom(".graph_box10"),
xLabel: new Dom(".xLabel"),
yLabel: new Dom(".yLabel"),
xLabel2: new Dom(".xLabel2"),
yLabel2: new Dom(".yLabel2"),

concept_development_1: new Dom(".concept_development_1"),
concept_development_2: new Dom(".concept_development_2"),
concept_development_3: new Dom(".concept_development_3"),
concept_development_4: new Dom(".concept_development_4"),



btn_delete : new Dom(".btn-delete"),
btn_reset : new Dom(".btn-reset"),


btn_check_connections: new Dom(".btn-check-connections"),
btn_circuit_diagram: new Dom(".btn-circuit-diagram"),

// Theory

// theory image removed

btn_transparent: new Dom(".btn-transparent"),

// ! Procedure formula Nomenclature images 
 
formulas_component_stress : new Dom("formulas_component_stress"),
formulas_efficiency : new Dom("formulas_efficiency"),
formulas_ideal : new Dom("formulas_ideal"),
formulas_nomenclautre : new Dom("formulas_nomenclautre"),
formulas_non_ideal : new Dom("formulas_non_ideal"),
formulas_procedure : new Dom("formulas_procedure"),
formulas_universal : new Dom("formulas_universal"),

// ! Procedure formula Nomenclature images end


// EE2 images added
btn_reset_connections: new Dom(".btn-connections"),
btn_reset_connections: new Dom(".btn-connections"),
btn_reset_connections: new Dom(".btn-connections"),

      //! EE18 images added 
      arrow : new Dom("arrow"),
      box_img : new Dom("box_img"),
      btn_delete : new Dom("btn_delete"),
      btn_record : new Dom("btn_record"),
      btn_reset : new Dom("btn_reset"),
      component_t1 : new Dom("component_t1"),
      component_t2 : new Dom("component_t2"),
      component_t3 : new Dom("component_t3"),
      component_t4 : new Dom("component_t4"),
      graph_border : new Dom("graph_border"),
      load_1 : new Dom("load_1"),
      load_2 : new Dom("load_2"),
      option_1 : new Dom("option_1"),
      option_1_a : new Dom("option_1_a"),
      option_1_graph_1 : new Dom("option_1_graph_1"),
      option_1_graph_2 : new Dom("option_1_graph_2"),
      option_1_graph_3 : new Dom("option_1_graph_3"),
      option_1_graph_4 : new Dom("option_1_graph_4"),
      option_1_graph_circuit : new Dom("option_1_graph_circuit"),
      option_1_graph_full : new Dom("option_1_graph_full"),
      option_1_left_graph : new Dom("option_1_left_graph"),
      option_1_left_graph_text : new Dom("option_1_left_graph_text"),
      option_1_right_graph : new Dom("option_1_right_graph"),
      option_1_right_graph_text : new Dom("option_1_right_graph_text"),
      option_1_tab_1 : new Dom("option_1_tab_1"),
      option_1_tab_2 : new Dom("option_1_tab_2"),
      option_1_tab_3 : new Dom("option_1_tab_3"),
      option_1_tab_4 : new Dom("option_1_tab_4"),
      option_1_tab_5 : new Dom("option_1_tab_5"),
      option_1_tab_6 : new Dom("option_1_tab_6"),
      option_1_text_2_graph : new Dom("option_1_text_2_graph"),
      option_1_text_graph : new Dom("option_1_text_graph"),
      option_1_v_1 : new Dom("option_1_v_1"),
      option_1_v_2 : new Dom("option_1_v_2"),
      option_1_v_3 : new Dom("option_1_v_3"),
      option_2 : new Dom("option_2"),
      option_2_a : new Dom("option_2_a"),
      option_2_graph_1 : new Dom("option_2_graph_1"),
      option_2_graph_2 : new Dom("option_2_graph_2"),
      option_2_graph_3 : new Dom("option_2_graph_3"),
      option_2_graph_4 : new Dom("option_2_graph_4"),
      option_2_graph_circuit : new Dom("option_2_graph_circuit"),
      option_2_graph_full : new Dom("option_2_graph_full"),
      option_2_tab_1 : new Dom("option_2_tab_1"),
      option_2_tab_2 : new Dom("option_2_tab_2"),
      option_2_tab_3 : new Dom("option_2_tab_3"),
      option_2_tab_4 : new Dom("option_2_tab_4"),
      option_2_tab_5 : new Dom("option_2_tab_5"),
      option_2_tab_6 : new Dom("option_2_tab_6"),
      option_2_tab_7 : new Dom("option_2_tab_7"),
      option_2_tab_8 : new Dom("option_2_tab_8"),
      option_2_text_2_graph : new Dom("option_2_text_2_graph"),
      option_2_text_graph : new Dom("option_2_text_graph"),
      option_2_v_1 : new Dom("option_2_v_1"),
      option_2_v_2 : new Dom("option_2_v_2"),
      option_2_v_3 : new Dom("option_2_v_3"),
      part_1_circuit : new Dom("part_1_circuit"),
      part_1_circuit_without_box : new Dom("part_1_circuit_without_box"),
      part_2_select_option_full : new Dom("part_2_select_option_full"),
      tab_alpha : new Dom("tab_alpha"),
      tab_set_1 : new Dom("tab_set_1"),
      tab_set_2 : new Dom("tab_set_2"),
      tab_thyristor : new Dom("tab_thyristor"),
      text_choose : new Dom("text_choose"),
      text_connect : new Dom("text_connect"),
      text_correct : new Dom("text_correct"),
      value_box_alpha : new Dom("value_box_alpha"),
      box_qs1 : new Dom("box_qs1"),
      box_qs2 : new Dom("box_qs2"),
      box_qs3 : new Dom("box_qs3"),
      box_qs4 : new Dom("box_qs4"),
      part_1_helper : new Dom("part_1_helper"),
      arrow_click_here : new Dom("arrow_click_here"),
      btn_check : new Dom("btn_check"),
      symbol_d1 : new Dom("symbol_d1"),
      symbol_d2 : new Dom("symbol_d2"),
      symbol_d3 : new Dom("symbol_d3"),
      symbol_d4 : new Dom("symbol_d4"),
      tab_thyristor_1 : new Dom("tab_thyristor_1"),
      part_1_2_circuit : new Dom("part_1_2_circuit"),
      right_tick_1 : new Dom("right_tick_1"),
      right_tick_2 : new Dom("right_tick_2"),
      table_part_1_r_100: new Dom("table_part_1_r_100"),
      table_part_2_r_10: new Dom("table_part_2_r_10"),
      btn_hint: new Dom("btn_hint"),
      hint_box: new Dom("hint_box"),


      //!EE18 images end here

      //! EE15 tables
      table_resistance: new Dom(".table_resistance"),
      table_inductor: new Dom(".table_inductor"),
      table_ripple_factor: new Dom(".table_ripple_factor"),


           
concept_development: new Dom(".concept_development"), 
      
hw_result_1_1 : new Dom("hw_result_1_1"),
hw_result_1_2 : new Dom("hw_result_1_2"),
hw_result_1_3 : new Dom("hw_result_1_3"),
hw_result_1_4 : new Dom("hw_result_1_4"),
hw_result_2_1 : new Dom("hw_result_2_1"),
hw_result_2_2 : new Dom("hw_result_2_2"),
hw_result_2_3 : new Dom("hw_result_2_3"),
hw_result_2_4 : new Dom("hw_result_2_4"),
hw_result_menu_1_1 : new Dom("hw_result_menu_1_1"),
hw_result_menu_1_2 : new Dom("hw_result_menu_1_2"),
hw_result_menu_1_3 : new Dom("hw_result_menu_1_3"),
hw_result_menu_1_4 : new Dom("hw_result_menu_1_4"),
hw_result_menu_2_1 : new Dom("hw_result_menu_2_1"),
hw_result_menu_2_2 : new Dom("hw_result_menu_2_2"),
hw_result_menu_2_3 : new Dom("hw_result_menu_2_3"),
hw_result_menu_2_4 : new Dom("hw_result_menu_2_4"),
hw_result_menu_2_5 : new Dom("hw_result_menu_2_5"),
mask : new Dom("mask"),


// ! new items dom
 domQs1: new Dom("domQs1"),
 domQs2: new Dom("domQs2"),
 domQs3: new Dom("domQs3"),
 domQs4: new Dom("domQs4"),
 domQs5: new Dom("domQs5"),
 domQs6: new Dom("domQs6"),


  chart: {
    graph: [
      graph1=null,
      graph2=null,
      graph3=null,
      graph4=null,
      graph5=null,
      graph6=null,
      graph7=null,
      graph8=null,
      graph9=null,
      graph10=null,
      graph11=null,
    ],
    label: [
      label1 = {
        x: "Label 2",
        y: "Label 1",
      },
      label2 = {
        x: "Label 2",
        y: "Label 1",
      },
      label3 = {
        x: "Label 2",
        y: "Label 1",
      },
      label4 = {
        x: "Label 2",
        y: "Label 1",
      },
      label5 = {
        x: "Label 2",
        y: "Label 1",
      },
      label6 = {
        x: "Label 2",
        y: "Label 1",
      },
      label7 = {
        x: "Label 2",
        y: "Label 1",
      },
      label8 = {
        x: "Label 2",
        y: "Label 1",
      },
      label9 = {
        x: "Label 2",
        y: "Label 1",
      },
      label10 = {
        x: "Label 2",
        y: "Label 1",
      },
      label11 = {
        x: "Label 2",
        y: "Label 1",
      },
    ]
  }


  },
  // delete it, it is for step helper
  EE18AlreadySeleted: 1, // todo update to 1
  deleteAll() { 
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  optionsDone:[0,0,0,0],
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      }; 
      return true;

    }),

    //! concept development
    (concept_dev_step1 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      // require
      Scenes.items.slider_box.hide()
      
      let btn_transparent = Scenes.items.btn_transparent.set().item;

      Scenes.items.concept_development_1.set().styles({
        zIndex: "5000",
        scale: "1 0.915",
        top: "-144px",
        position: "absolute",
      })
      let src_path = "./iframes/step1/index.html"
      Scenes.items.concept_development_1.item.src = src_path
      // remove other iframes 
      function removeIframes(){
        let safeIdx = 0
        let cds = getAll(".concept_development")
        cds.forEach((cd,idx)=>{
          if(idx != safeIdx){
            cd.src = ""
          }
        })
        
      }
      removeIframes()
      // ! Slide ended enable the button next button
      function checkIsSlideEnded(){
        let isSlideEnded = JSON.parse(localStorage.getItem("isSlideEnded"))
        if(isSlideEnded==true){
          btn_transparent.disabled = false
          setIsProcessRunning(false)
          btn_transparent.classList.remove("btn-disabled")
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
          btn_transparent.onclick = ()=>{
            Scenes.next()
            localStorage.setItem("isSlideEnded",false)
            window.clearInterval(interval)
            btn_transparent.classList.add("btn-disabled")
            btn_transparent.disabled = true
          }
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000)

      return true;
    }),

    //! Circuit formulation part1
    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.btn_transparent.set().hide()
      Scenes.items.slider_box.hide()



      setCC("Connect the wires to form the bridge rectifier circuit.")

      setCC("That is AC input source through auto-transformer connect the bridge circuit and finally connect to the load.")


      let vertexBox = new Dom(".vertex-box")
      vertexBox.show()

      //! Required positions


      function scaleAnime(target){
       return anime({
          targets: target.item,
          scale: 0.9,
          easing: "easeInOutQuad",
          loop: true
        })
      }


      Scenes.items.part_1_circuit_without_box.set(55, 135, 313)
      //  * boxes
      Scenes.items.box_qs1.set(268+30, 137+30, 60).zIndex(2)
      Scenes.items.box_qs2.set(268+112,137+30,60).zIndex(2)
      Scenes.items.box_qs3.set(268+30,137+184,60).zIndex(2)
      Scenes.items.box_qs4.set(268+112,137+184,60).zIndex(2)

      // Scenes.items.tab_thyristor.set(94, -1, 47).zIndex(2)
      Scenes.items.tab_thyristor_1.set(94, -1, 47)

      Scenes.items.btn_check.set(835, -25, 30).zIndex(7)
      Scenes.items.btn_reset.set(835, -25+40, 30).zIndex(7)

      Scenes.items.text_connect.set(610, 98, 105)
      Scenes.items.text_choose.set(610, 98+110, 118).hide()
      Scenes.items.text_correct.set(610, 330, 91).hide()
      Scenes.items.arrow_click_here.set(90, 48, 60).hide()

      //! hint button code
      Scenes.items.btn_hint.set(835, -25 + 40 + 40, 30).zIndex(1)
      Scenes.items.hint_box.set(215, 63, 322).zIndex(10).hide()

      let hint_btn = Scenes.items.btn_hint;
      hint_btn.item.onmouseenter = ()=>{
        Scenes.items.hint_box.show()
      }
      hint_btn.item.onmouseout = ()=>{
        Scenes.items.hint_box.hide()
      }
      

      let text_connect = scaleAnime(Scenes.items.text_connect)
     
      
      // connected vertex src and dest
      let allConnectedVertexSrcDest = {}

      function isConnectionsRight(isConnectionsCorrect){
        let imgToShow = null
        if(isConnectionsCorrect){

          Dom.setBlinkArrowRed(-1)
          text_connect.reset()

          // * destroy all the connection
          // Scenes.items.btn_reset.item.click()
          // getAll(".jtk-endpoint").forEach(ele=>{
          //   ele.style.display = "none"
          // })

          // //to go to next step 
          // setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 544).play();
          setIsProcessRunning(false);
          

        }
        else{
          setCC("Incorrect connections, Press Reset and try again")
        }
      }


      Scenes.items.slider_box.hide();

      // ! JSPLumb cable 
      function cable(){
        
        Scenes.items.btn_check.item.onclick = checkCableConnection
        // ! connections array contains connected idxs
        // ! initializing the checkgraph for connections
        let matricesForCheckGraph = []
        // ! connection is right/wrong
        let isConnectionRight = false
        // set graph
        function fillCheckGraph(){
          //* to fill element in array
          function create2DArray(rows, cols, initValue){

            filledArray = new Array(rows)

            for(let i=0;i<rows;i++){
              filledArray[i] = new Array(cols)

              for(let j=0;j<cols;j++){
                filledArray[i][j] = initValue
              }
            }
            return filledArray;
          }

          // fill zero 
          let noOfVertex = 17
          matricesForCheckGraph = create2DArray(noOfVertex, noOfVertex, 0)

          //* fixed connection is filled
          let xAxisFixed = [1, 2, 5, 6, 9, 11]
          let yAxisFixed = [3, 4, 7, 8, 10, 12]
          for(let i in xAxisFixed){
            matricesForCheckGraph[xAxisFixed[i]][yAxisFixed[i]] = 1
            matricesForCheckGraph[yAxisFixed[i]][xAxisFixed[i]] = 1
          }

          // console.log(matricesForCheckGraph)
        } 
        fillCheckGraph()

        // minimum connection length for check graph
        let minimumConnectionsLength = 6
        // ! check
        function checkCableConnection() {
          // console.log("sneha")
          // console.log("sneha")
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }
          // ! Matched Graph 
          let isGraphMatched = false

          if (connections.length < minimumConnectionsLength) {
            setCC("Connect all the terminals first")
            return false;
          }
          if (connections.length >= minimumConnectionsLength) {
            // ! listDiv contains vertexConnectionsName
            // eg vertex10, vertex23
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos) 
            }

            // ! Main logic for hecking graph
            for(let i=0;i<listDiv.length;i++){
              // * to convert div to idx only
              function convertDivtextToIdx(divText){
                let convertedText = ""
                let text = divText.substr(-2)
                let num1 = text[0]
                let num2 = text[1]
                if(!isNaN(num1))
                  convertedText+=num1
                if(!isNaN(num2))
                  convertedText+=num2
                return parseInt(convertedText)
              }
              // substr is so i can extract the number from the id
              let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0])
              let vertexDestIdx = convertDivtextToIdx(listDiv[i][1])

              if(matricesForCheckGraph[vertexSrcIdx][vertexDestIdx] == 1){
                isGraphMatched = true
              }
              else{
                isGraphMatched = false
                break
              }
            }

            
            // ! for right connection note
            if(isGraphMatched){
              isConnectionsRight(true)
            }else{
              // ! for wrong connection
              // alert("Wrong Connections, try again.")
              isConnectionsRight(false)
              allConnectedVertexSrcDest = []
            }
          }
          
        }
        // checkCableConnection()
        (showConnectionInfo = function (listDiv) {
        }),
        (hideConnectionInfo = function (listDiv) {
          listDiv.style.display = "none";
        }),
        (connections = []),
        (updateConnections = function (conn, remove) {
          if (!remove) {
            connections.push(conn);
            // ! show blink when all vertex are connected
            // todo change size 4 to 13
            if(connections.length == minimumConnectionsLength){
              Dom.setBlinkArrowRed(true,800, -25, 30,30,180).play()
            }
          }

          else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
              if (connections[i] == conn) {
                idx = i;
                break;
              }
            }
            if (idx != -1) connections.splice(idx, 1);
          }
          if (connections.length > 0) {
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            showConnectionInfo(listDiv);
          }
        });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };

            // ! for setting up the endpoints
            function setEndPoint(maxConnections=1, color = "ff0000"){
              let radius = 8
              let endPointStyleData = {
                endpoint: ["Dot", { radius: radius }],
                paintStyle: { fill: `#${color}` },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: `#${color}`, strokeWidth: 6 },
                connector: ["Bezier", { curviness: -5 }],
                maxConnections: maxConnections,
                isTarget: true,
                dropOptions: exampleDropOptions,
              }
              return endPointStyleData
            }

            //colors code
            // red = ff0000
            // Yellow = f2b50c
            // Black = 0070c0
            // Blue = 000000
            

            var exampleEndpoint1 = setEndPoint(1, "c00000")
            var exampleEndpoint2 = setEndPoint(1, "000000")


            function addEndPoints(){

              // ! for all red wire

              // conn 1
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 2
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 3
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //! for black wire
              
              //conn 1
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
                );
                instance.addEndpoint(
                  "vertex4",
                  { anchor: [0.75, 0, 0, -1] },
                  exampleEndpoint2
                  );
                  
              //conn 2
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );

              //conn 3
                  
              instance.addEndpoint(
                "vertex11",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
                  
              instance.addEndpoint(
                "vertex12",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
                  

          
            }
            addEndPoints()


            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection()
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
              Dom.setBlinkArrowRed(-1)
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable()
      
      // ------ end



      return true
    }),

    //! Circuit formulation part2 
    (step1_2 = function () {
      // ! destroy connection
      Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })
      setIsProcessRunning(true);


      Scenes.items.btn_next.show()
      Scenes.items.slider_box.hide()
  
        //! Required items 

        function scaleAnime(target){
          return anime({
             targets: target.item,
             scale: 0.9,
             easing: "easeInOutQuad",
             loop: true
           })
         }
        Scenes.items.slider_box.hide()

        setCC("Select the orientation of the thyristors and place them suitably in the bridge circuit.")

  
  
        // Scenes.items.part_1_circuit_without_box.set(55,/ 135, 313).zIndex(3)
        Scenes.items.part_1_2_circuit.set(26, 111, 332)
        Scenes.items.tab_thyristor.set(94, -1, 47).zIndex(2)
        Scenes.items.tab_thyristor_1.set(94, -1, 47)
        Scenes.items.arrow.set(319, -7, 58)

        Scenes.items.btn_reset.set(835, -25, 30).zIndex(7)
  
        Scenes.items.text_connect.set(610, 98, 105)
        Scenes.items.text_choose.set(610, 98+110, 118).hide()
        Scenes.items.text_correct.set(610, 330, 91).hide()
        Scenes.items.arrow_click_here.set(90, 48, 60)
        
    
  
  
        Scenes.items.part_1_helper.set(306, -41, 130, 501).zIndex(6)
        Scenes.items.box_img.set(473, -37, 120)


        let diodes = [
          Scenes.items.component_t1.set(519-20,-15-4, 80).zIndex(1),
          Scenes.items.component_t2.set(519 + 60 -15+10-3,-15-4, 80).zIndex(1),
          Scenes.items.component_t3.set(519 +60 +60-10+10,-15-4, 80).zIndex(1),
          Scenes.items.component_t4.set(519 +60 +60+60 +10,-15-4, 80).zIndex(1),
        ]
        diodes.forEach(ele=>{
          ele.addClass("btn-img")
        })
        
        Scenes.items.symbol_d1.set(527, 39, 25).zIndex(5)
        Scenes.items.symbol_d2.set(527+75, 39, 27).zIndex(5)
        Scenes.items.symbol_d3.set(527+75+70, 39, 27).zIndex(5)
        Scenes.items.symbol_d4.set(527+75+68+70, 42, 25).zIndex(5)
  
        //  * boxes
        Scenes.items.box_qs1.set(268+30, 137+30, 60).zIndex(2)
        Scenes.items.box_qs2.set(268+112,137+30,60).zIndex(2)
        Scenes.items.box_qs3.set(268+30,137+184,60).zIndex(2)
        Scenes.items.box_qs4.set(268+112,137+184,60).zIndex(2)
  

        //! onclick for reset btn
        let resetBtn = Scenes.items.btn_reset
        resetBtn.item.onclick = ()=>{
          // Scenes.currentStep = 3
          Scenes.steps[3]()
        }

  
        // Scenes.items.part_1_try_again_text_3.set(777, 15, 119).hide()
        function blink(target){
          anime({
            targets: target.item,
            scale: ['0.9', '1.1','0.9', '1.1','0.9', '1.1','0.9', '1.1' ],
            duration: 2000,
            easing: "easeInOutQuad",
            loop: true
          })
        }

  
  
        //* functionality
        let checkCnnctn = ""
        //* Onclick on Thyristor tab
        let btn = Scenes.items.tab_thyristor_1
        btn.item.onclick = ()=>{
          // console.log("clicked")
          Scenes.items.arrow_click_here.hide()
        
          anime({
          targets: Scenes.items.part_1_helper.item,
          easing: "easeInOutQuad",
          duration: 2000,
          left: 873,
          complete(){
            Scenes.items.part_1_helper.hide()
            Scenes.items.text_choose.show()
            scaleAnime(Scenes.items.text_choose)
  
            // Dom.setBlinkArrowRed(true, 525, 48,30,null,19).play()
            // Scenes.items.part_1_text_1.show()
            
          }
          })
        }
  
   
        let compo = {
          box : null,
          item : null,
        }
  
        // for rotate management
        let allRotated = [1,1,1,1]
        let currentDiodeClickedIdx = -1;
        //item click
  
        //! on click on item 
        let item1 = Scenes.items.component_t1
        let rotate_1 = 1
        item1.item.onclick = ()=>{
          if(rotate_1){
            item1.rotate(180)
            rotate_1 = 0
          }else{
            item1.rotate(0)
            rotate_1 = 1
          }
          currentDiodeClickedIdx = 0
          allRotated[currentDiodeClickedIdx] = rotate_1
          console.log("item1 clicked")
          compo.item = item1
          // Scenes.items.part_1_text_2.show()
          // showDiodeInstruction()
          
        }
  
        let item2 = Scenes.items.component_t2
        let rotate_2 = 1
        item2.item.onclick = ()=>{
          if(rotate_2){
            item2.rotate(180)
            rotate_2= 0
          }else{
            item2.rotate(0)
            rotate_2 = 1
          }
          currentDiodeClickedIdx = 1
          allRotated[currentDiodeClickedIdx] = rotate_2
          console.log("item2 clicked")
          compo.item = item2
          // showDiodeInstruction()
        }
  
        let item3 = Scenes.items.component_t3
        let rotate_3 = 1
        item3.item.onclick = ()=>{
          if(rotate_3){
            item3.rotate(180)
            rotate_3 = 0
          }else{
            item3.rotate(0)
            rotate_3 = 1
          }
          currentDiodeClickedIdx = 2
          allRotated[currentDiodeClickedIdx] = rotate_3
          console.log("item3 clicked")
          compo.item = item3
          // showDiodeInstruction()
        }
  
        let item4 = Scenes.items.component_t4
        let rotate_4 = 1
        item4.item.onclick = ()=>{
          if(rotate_4){
            item4.rotate(180)
            rotate_4= 0
          }else{
            item4.rotate(0)
            rotate_4 = 1
          }
          currentDiodeClickedIdx = 3
          allRotated[currentDiodeClickedIdx] = rotate_4
          console.log("item4 clicked")
          compo.item = item4
          // showDiodeInstruction()
        }
  
        // ! box clicked
  
        let boxClickIdx = 0;
  
        let box1 = Scenes.items.box_qs1
        box1.item.onclick = ()=>{
          if(compo.item == null){
            return
          }
          boxClickIdx++
          console.log("box1 clicked")
          compo.box = box1
          toSet(allRotated[currentDiodeClickedIdx]);
          // showBoxInstruction()
        }
        let box2 = Scenes.items.box_qs2
        box2.item.onclick = ()=>{
          if(compo.item == null){
            return
          }
          boxClickIdx++
          console.log("box2 clicked")
          compo.box = box2
          toSet(allRotated[currentDiodeClickedIdx]);
          // showBoxInstruction()
        }
        let box3 = Scenes.items.box_qs3
        box3.item.onclick = ()=>{
          if(compo.item == null){
            return
          }
          boxClickIdx++
          console.log("box3 clicked")
          compo.box = box3
          toSet(allRotated[currentDiodeClickedIdx]);
  
          // showBoxInstruction()
        }
        let box4 = Scenes.items.box_qs4
        box4.item.onclick = ()=>{
          if(compo.item == null){
            return
          }
          boxClickIdx++
          console.log("box4 clicked")
          compo.box = box4
          toSet(allRotated[currentDiodeClickedIdx]);
  
          // showBoxInstruction()
        }
  
       //! function to set the element
      let toSet = function(isRotate){
        console.log("check cnnctn times ",checkCnnctn)
        
   
        
        let boxName = compo.box
        let itemName = compo.item
  
        itemName.item.onclick = ()=>{}
        itemName.removeClass("btn-img")
     
  
        function toSetItem (target, left_=null, top_=null, height_=null, width_=null){
          anime({
            targets: target.item,
            duration: 1000,
            easing: "easeInOutQuad",
            height: height_,
            width: width_, 
            left: left_,
            top : top_
          })
        }
        function toSetSymbol (target, left_ = null, top_ = null){
          anime({
            targets: target.item,
            duration: 1000,
            easing: "easeInOutQuad",
            left: left_,
            top : top_
          })
        }
  
        let d1 = Scenes.items.symbol_d1
        let d2 = Scenes.items.symbol_d2
        let d3 = Scenes.items.symbol_d3
        let d4 = Scenes.items.symbol_d4
  
        //!if item1 clicked
        if(itemName == item1   && boxName == box1){
          box1.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item1, 310, 149)
          }else{
            toSetItem(item1, 310, 143)
          }
  
          toSetSymbol(d1, 345, 198 )
          checkCnnctn+="1"
          console.log(checkCnnctn)
  
        }
        if(itemName == item1 && boxName == box2){
          box2.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item1, 390, 149)
          }else{
            toSetItem(item1, 390.5, 143)
          }
          toSetSymbol(d1, 426, 198 )
        }
        if(itemName == item1 && boxName == box3){
            box3.hide()
            if(!isRotate){
              //*rotating position
              toSetItem(item1, 310, 311)
            }else{
              toSetItem(item1, 310, 299)
            }
            toSetSymbol(d1, 345, 356)
  
        }
        if(itemName == item1 && boxName == box4){
          box4.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item1, 390, 311)
          }else{
            toSetItem(item1, 390.2, 299)
          }
          toSetSymbol(d1, 426, 356)
        }
     
  
        //!if item2 clicked
        if(itemName == item2   && boxName == box1){
          box1.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item2, 310, 149)
          }else{
            toSetItem(item2, 310, 143)
          }
          toSetSymbol(d2, 345, 198 )
          console.log(checkCnnctn)
  
        }
        if(itemName == item2 && boxName == box2){
          box2.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item2, 390, 149)
          }else{
            toSetItem(item2, 390.5, 143)
          }
          toSetSymbol(d2, 426, 198)  
        }
        if(itemName == item2 && boxName == box3){
            box3.hide()
            if(!isRotate){
              //*rotating position
              toSetItem(item2, 310, 311)
            }else{
              toSetItem(item2, 310, 299)
            }
            toSetSymbol(d2, 345, 356)
        }
        if(itemName == item2 && boxName == box4){
          box4.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item2, 390, 311)
          }else{
            toSetItem(item2, 390.2, 299)
          }
          checkCnnctn+="1"
          console.log(checkCnnctn)
  
          toSetSymbol(d2, 426, 356)
  
        }
  
  
        
        //! if item3 clicked
        if(itemName == item3 && boxName == box1){
          box1.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item3, 310, 149)
  
          }else{
            toSetItem(item3, 310, 143)
          }

          toSetSymbol(d3, 345, 198 )
        }
        if(itemName == item3 && boxName == box2){   
          box2.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item3, 390, 149)
          }else{
            toSetItem(item3, 390.5, 143)
          }
          checkCnnctn+="1"
          console.log(checkCnnctn)
          toSetSymbol(d3, 426, 198 )  
        }
        if(itemName == item3 && boxName == box3){
          box3.hide()
          if(!isRotate){
            //*rotating position
              toSetItem(item3, 310, 311)
          }else{
              toSetItem(item3, 310, 299)
          }
          toSetSymbol(d3, 345, 356)
        }
        if(itemName == item3 && boxName == box4){
         
          box4.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item3, 390, 311)
          }else{
            toSetItem(item3, 390.2, 299)
          }
          toSetSymbol(d3, 426, 356)
        }
      
  
         //! if item4 clicked
        if(itemName == item4 && boxName == box1){
          box1.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item4, 310, 149)
          }else{
            toSetItem(item4, 310, 143)
          }
          toSetSymbol(d4, 345, 198 )
        }
        if(itemName == item4 && boxName == box2){
          box2.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item4, 390, 149)
          }else{
            toSetItem(item4, 390.5, 143)
          }
          toSetSymbol(d4, 426, 198 )
        }
        if(itemName == item4 && boxName == box3){
        
          box3.hide()
          if(!isRotate){
            //*rotating position
              toSetItem(item4, 310, 311)
          }else{
              toSetItem(item4, 310, 299)
          }
          toSetSymbol(d4, 345, 356)
          checkCnnctn+="1"
        }
        if(itemName == item4 && boxName == box4){
          box4.hide()
          if(!isRotate){
            //*rotating position
            toSetItem(item4, 390, 311)
          }else{
            toSetItem(item4, 390.2, 299)
          }
          toSetSymbol(d4, 426, 356)
        }
  
        if(boxClickIdx === 4){
  
          console.log(allRotated, "array")
  
          if(allRotated.indexOf(0) === -1 ){
              console.log("correct position")
              setCC("Formulation of circuit is correct.")
              Scenes.items.text_correct.show()
              
              //  after complete
              Dom.setBlinkArrow(true, 790, 408).play()
              setIsProcessRunning(false)
            }
            else{
              console.log("incorrect")
              setCC("Formulation of circuit is incorrect. Press Reset and try again.")
              
          }
        
          
        }
  
  
  
        compo.box  = null
        compo.item  = null
  
      }
  
        // ------ end
      



  

      return true
    }), 

    (concept_dev_step2 = function () {
      // ! destroy connection
      Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })

      setIsProcessRunning(true);
      Dom.hideAll()
      // require
      Scenes.items.slider_box.hide()
      
      let btn_transparent = Scenes.items.btn_transparent.set().item;

      Scenes.items.concept_development_2.set().styles({
        zIndex: "5000",
        scale: "1 0.915",
        top: "-144px",
        position: "absolute",
      })
      let src_path = "./iframes/step3/index.html"
      Scenes.items.concept_development_2.item.src = src_path
      // remove other iframes 
      function removeIframes(){
        let safeIdx = 1
        let cds = getAll(".concept_development")
        cds.forEach((cd,idx)=>{
          if(idx != safeIdx){
            cd.src = ""
          }
        })
      }
      removeIframes()

      // ! Slide ended enable the button next button
      function checkIsSlideEnded(){
        let isSlideEnded = localStorage.getItem("isSlideEnded")
        if(isSlideEnded=="true"){
          btn_transparent.disabled = false
          setIsProcessRunning(false)
          btn_transparent.classList.remove("btn-disabled")
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
          btn_transparent.onclick = ()=>{
            // Scenes.steps[5]()
            Dom.hideAll()
            Scenes.next()
            localStorage.setItem("isSlideEnded",false)
            window.clearInterval(interval)
            btn_transparent.classList.add("btn-disabled")
            btn_transparent.disabled = true

          }
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000)
        
      return true;
    }),

    //! select option
    (step2 = function () {
      setIsProcessRunning(true);
      
      // todo all previous elements hide
      Dom.hideAll();
      
      // ! destroy connection
      // Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.item.innerHTML = ""
      // Scenes.changeHeader(2, -235, 28)

      // Scenes.setStepHeading("Step-3", "Performance Analysis.");
      // setCC("Select any one, to show the performance of controlled bridge rectifier either with R-load or RL-load.")
  
      // * remove all previous restrictions
      
      // ! Required Elements

      Scenes.items.part_2_select_option_full.set(91, -4, 405)  
      Scenes.items.option_1.set(336, 5, 188).zIndex(4)
      Scenes.items.option_2.set(336, 189, 188).zIndex(3)

      // // hide the slider
      Scenes.items.slider_box.hide()

  

      // hide all tables
      // Scenes.items.part3_table_one.hide()
      // Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide()
      // Scenes.items.part3_table_four.hide()
      // Scenes.items.part3_table_four_2.hide()

      // active all sliders
      

      // * showing right tick if done
      // for(let i in rightTicks){
      //   if(Scenes.optionsDone[i] == 1){
      //     rightTicks[i].show()
      //   }
      // }

      // resetSliderValue()
      // ! Final Position
    //  Scenes.items.tableCalc.show()

    // ! onclicks for all options
      let options = [
        Scenes.items.option_1,
        Scenes.items.option_2,
      ]

      // ! Destroy Graphs
      function destroyGraphs(){
        for(let i=0;i<7;i++){
          if(Scenes.items.chart[i]!=null){
            Scenes.items.chart[i].destroy()
          }
        }
      }
      // destroyGraphs()

      
      //! RESET ALL THE SLIDER VALUES
      // sliders.reset()
      Scenes.forMathematicalExpressionBtn = 0
      
      const opOne = ()=>{
        

        Scenes.optionsDone[0]=1;
        Scenes.forMathematicalExpressionBtn = 1
        Scenes.currentStep = 7
        Scenes.steps[6]()
        // Scenes.next()
      }
      const opTwo = ()=>{
        

        Scenes.optionsDone[1]=1;
        Scenes.forMathematicalExpressionBtn = 2
        Scenes.currentStep = 10
        Scenes.steps[9]()
        // Scenes.next()
      }
      // const opThree = ()=>{
        

      //   Scenes.optionsDone[2]=1;
      //   Scenes.forMathematicalExpressionBtn = 3
      //   Scenes.steps[6]()
      // }
  
      options[0].item.onclick = opOne
      // rightTicks[0].item.onclick = opOne

      options[1].item.onclick =  opTwo
      // rightTicks[1].item.onclick = opTwo

      // options[2].item.onclick =  opThree
      // rightTicks[2].item.onclick = opThree

      // ! if all options done then exit
      // Scenes.optionsDone[1] = 1
      let exit = true
      for(let i=0; i<2; i++){
        if(Scenes.optionsDone[i]==0){
          exit = false
          break
        }
      }      

      if(exit){
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Click 'Next' to go to next step");
        Dom.setBlinkArrow(true, 790, 414).play();
        setIsProcessRunning(false);
        Scenes.currentStep = 12
        return true;
      }

      if(Scenes.optionsDone[0] == 1 || Scenes.optionsDone[1] == 1){
        setCC("Select other load combination to show the performance")
      }else{
        setCC("Select any one, to show the performance of controlled bridge rectifier either with R-load or RL-load.")
      }
      return true;

    }),

    //! option 1

    //! option 1 Controlled Bridge Rectifier with R-Load : Principle of Operation
    (concept_dev_step3 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      // require
      Scenes.items.slider_box.hide()
      
      let btn_transparent = Scenes.items.btn_transparent.set().item;

      Scenes.items.concept_development_3.set().styles({
        zIndex: "5000",
        scale: "1 0.915",
        top: "-144px",
        position: "absolute",
      })
      let src_path = "./iframes/step5/index.html"
      Scenes.items.concept_development_3.item.src = src_path
      // remove other iframes 
      function removeIframes(){
        let safeIdx = 2
        let cds = getAll(".concept_development")
        cds.forEach((cd,idx)=>{
          if(idx != safeIdx){
            cd.src = ""
          }
        })
        
      } 
      removeIframes()

      // ! Slide ended enable the button next button
      function checkIsSlideEnded(){
        let isSlideEnded = localStorage.getItem("isSlideEnded")
        if(isSlideEnded=="true"){
          btn_transparent.disabled = false
          setIsProcessRunning(false)
          btn_transparent.classList.remove("btn-disabled")
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
          btn_transparent.onclick = ()=>{
            Scenes.next()
            localStorage.setItem("isSlideEnded",false)
            window.clearInterval(interval)
            btn_transparent.classList.add("btn-disabled")
            btn_transparent.disabled = true

          }
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000)
        
      return true;
    }),

    //! option 1 Controlled Bridge Rectifier with R-Load : Steady-state Waveforms    
    (step3 = function () {
      setIsProcessRunning(true);


      Scenes.setStepHeading(
        "",
        ""
      )
      // Dom.setBlinkArrowRed(true,160,320,30,30,-90).play()
      Scenes.items.btn_next.show()
      Scenes.items.slider_box.hide()


      //! Required items
      Scenes.items.option_1_text_graph.set(10, -59, 123)
      Scenes.items.option_1_text_2_graph.set(2, -70, 136).hide()

      Scenes.items.option_1_graph_circuit.set(70, 118,  282)
      Scenes.items.option_1_v_1.set(16, 214, 108)
      Scenes.items.option_1_v_2.set(436, 178, 157)
      Scenes.items.option_1_v_3.set(117, 104, 123)
      Scenes.items.option_1_a.set(86, 188, 66).zIndex(1)
      Scenes.items.part_1_helper.set(596, -8, 392).zIndex(2)

      
      let graphs = [
        Scenes.items.option_1_graph_1.set(591, -15, 170).hide(),
        Scenes.items.option_1_graph_2.set(591, -15, 192).hide(),
        Scenes.items.option_1_graph_4.set(591, -15, 317).hide(),
        Scenes.items.option_1_graph_3.set(591, -15, 183).hide(),
        Scenes.items.option_1_graph_full.set(620, -65, 470).hide(),
      ]
      let compo = [  
        Scenes.items.option_1_v_1,     
        Scenes.items.option_1_v_2,     
        Scenes.items.option_1_v_3,     
        Scenes.items.option_1_a
      ]

      compo.forEach((ele)=>{
        ele.item.onmouseenter = ()=>{
          anime({
            targets: ele.item,
            scale: 1.1,
            duration: 500,
            easing: "easeInOutQuad",
          })
        }
        ele.item.onmouseout = ()=>{
          anime({
            targets: ele.item,
            scale: 1,
            duration: 500,
            easing: "easeInOutQuad",
          })
        }
      })

      function remove(target){
        return anime({
          targets: target.item,
          left: 1000,
          duration:2000,
          easing: "easeInOutQuad"
        })
      }

      let clickCountIdx = 0
      let currentGraph = Scenes.items.talk_cloud.hide()

      let isCompClick = [0, 0, 0, 0]
      let time 

      compo[0].item.onclick = ()=>{
        time = 4000
        isCompClick[0] = 1
        setCC("Here, the nature of ac input  voltage waveform is shown.")
        Scenes.items.part_1_helper.set(596, -8, 392).zIndex(2)
        remove(Scenes.items.part_1_helper)
        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[0]
        graphs[0].show()
        fullWave()
      }
      compo[1].item.onclick = ()=>{ 
        isCompClick[1] = 1
        setCC("Here, the nature of load voltage waveform with resistive load is shown.")
        setCC(" Load voltage is present from the time instant of firing angle and it is zero upto the time instant of firing angle.")
        setCC("It is possible to adjust the magnitude of load voltage by varying the firing angle alpha.")
        Scenes.items.part_1_helper.set(596, -8, 392).zIndex(2)
        remove(Scenes.items.part_1_helper)
        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[1]
        graphs[1].show()
        fullWave(19000)

      }
      compo[2].item.onclick = ()=>{
        time = 4000
        isCompClick[2] = 1
        setCC("Here, the voltage appearing across thyristor one and current through it is shown.")
        Scenes.items.part_1_helper.set(596, -8, 392).zIndex(2)
        remove(Scenes.items.part_1_helper)
        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[2]
        graphs[2].show()
        fullWave(5000)

      }
      compo[3].item.onclick = ()=>{
        time = 8000
        isCompClick[3] = 1
        setCC("Here, the ac input current waveform is shown and its variation  closely follows the load voltage.")
        Scenes.items.part_1_helper.set(596, -8, 392).zIndex(2)
        remove(Scenes.items.part_1_helper)

        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[3]
        graphs[3].show()
        console.log(clickCountIdx)
        fullWave(5000)
      }


  
      function fullWave(time){
        if(isCompClick.indexOf(0) == -1){
          compo.forEach((ele)=>{
            ele.item.onmouseenter = ()=>{
              
            }
            ele.item.onclick = ()=>{

            }
          })
        setTimeout(()=>{
          Scenes.items.option_1_text_graph.hide()
          Scenes.items.option_1_text_2_graph.show()
          currentGraph.hide()
          graphs[4].show()
          Dom.setBlinkArrow(true, 790, 408).play()
          console.log(time)
          setCC("Here, various voltage and current waveforms all together are shown for better understanding of the controlled rectifier operation.")
          setCC(" Also, the conducting devices sequence is indicated.")
          setIsProcessRunning(false)
        },time)
        }
      } 
      
      return true
    }),

    //! option 1 table Controlled Bridge Rectifier : Resistive Load 
    (step4 = function () {
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Dom.useTogglePointerEventsHere()
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "",
        ""
      )
      // ! show the slider
      Scenes.items.slider_box.set(0,-38).show("flex")
      sliders.d_max = 180
      sliders.changeCircuitImage("r")
      sliders.resetSlidersValue()
      sliders.showAllSliders()
      // sliders.showSliderFor(1  )
      //!new added for EE8
      Scenes.items.part3_table_three.set(3).scale(0.9)



      //* to set the styling of conclusion front
      // let conclusionFront = "Here, the load voltage waveform is shown. The load voltage ripple is reduced after connecting the C-filter"
      // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

      
      // Scenes.items.graph_bcg.set(612,-75, 120)
      Scenes.items.tab_alpha.set(628, -58, 53)
      Scenes.items.option_1_tab_1.set(719, -80, 50).zIndex(3)
      Scenes.items.option_1_tab_2.set(719+58, -80, 50).zIndex(3)
      Scenes.items.option_1_tab_3.set(719+58+58, -80, 50).zIndex(3)
      Scenes.items.option_1_tab_4.set(719, -36, 50).zIndex(3)
      Scenes.items.option_1_tab_5.set(719+58, -36, 50).zIndex(3)
      Scenes.items.option_1_tab_6.set(719+58+58, -36, 50).zIndex(3)
      Scenes.items.graph_border.set(610, -76, 475, 302)

      let optionTabs = [
        Scenes.items.tab_set_1.set(385, -17, 59).zIndex(2001),
        Scenes.items.tab_set_2.set(386, 52, 59).zIndex(2001),
      ]
      
      // Scenes.items.tempTitle18.setContent("100 Ω").set(345,128,null,100).styles({color: "red", fontWeight: "800"}).zIndex(1001)
      Scenes.items.table_part_1_r_100.set(340,130,30)

      let rightTicks = [
        Scenes.items.right_tick_1.set(402,1,18).hide().zIndex(2002),
        Scenes.items.right_tick_2.set(402,67,18).hide().zIndex(2002),
      ]

      Scenes.items.btn_record.set(8, -67, 38)
      Scenes.items.btn_reset.set(8+130, -67, 38)
      Scenes.items.btn_delete.set(8+130+130, -67, 38)
      // Scenes.items.btn_plot.set(698+20, 360, 35).zIndex(2)

      let valuesToMatch = []

      let table = new Dom(".part3_table_three").item
      
       // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

      // option onclicks
      
      optionTabs[0].item.onclick = ()=>{
        Dom.setBlinkArrowRed(true,60,11,30,null,-90).play()
        setCC("Set the ac voltage")

        rightTicks[0].show()

        // remove default value from table
        table.tBodies[0].rows[0].cells[1].innerHTML = ""
        table.tBodies[0].rows[1].cells[1].innerHTML = ""
      }
      optionTabs[1].item.onclick = ()=>{
        // slider firing angle
        Dom.setBlinkArrowRed(true,157,172,30,null,90).play()
        setCC("Set the firing angle")

        rightTicks[1].show()
      }

      // ! Tutorial Function
      // Dom.setBlinkArrowRed(true,0,0,30,null,-90)
      function stepTutorial2(){
        if(Scenes.EE18AlreadySeleted == 1){
          Dom.setBlinkArrowRed(true,472,39,30,null,90).play()
          setCC("Here, set AC input voltage and vary the firing angle and record the observations.")

          sliders.v_knob.onclick = ()=>{
            Dom.setBlinkArrowRed(true,157,172,30,null,90).play()
            setCC("Set the firing angle")
            sliders.sliderV()
            sliders.v_knob.click()

            // d onclick
            sliders.d.onclick = ()=>{
              Dom.setBlinkArrowRed(true,50,-18,30,null,90).play()
              setCC("Press Record")
            }
          }
        }else{
          Dom.setBlinkArrowRed(true,472,114,30,null,90).play()
          setCC("Here, set the firing angle and vary the AC input voltage and  record the observations.")

          // d onclick
          sliders.d.onclick = ()=>{
            Dom.setBlinkArrowRed(true,50,-18,30,null,90).play()
            setCC("Press Record")
          }

          // v onclick
          sliders.v_knob.onclick = ()=>{
            sliders.sliderV(()=>{
              Dom.setBlinkArrowRed(true,50,-18,30,null,90).play()
              setCC("Press Record")
            })
            sliders.v_knob.click()
          }
        }
        // setTimeout(() => {
        //   Dom.setBlinkArrowvRed(true,50,-18,30,null,90).play()
        //   setCC("Press Record")
        // }, 8000);

        // reset slider d onclick
        // sliders.v_knob.onclick = ()=>{
        //   sliders.sliderV(()=>{
            
        //   })
        //   sliders.v_knob.click()
        // }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }

      if(Scenes.EE18AlreadySeleted == 1){
        optionTabs[1].item.onclick = ()=>{}
      }
      else{
        rightTicks[0].show()
        optionTabs[0].item.onclick = ()=>{}
      }

      // ! graph
      // let graph_width = 346
      // let graph_height = 273

      let graph_width = 308
      let graph_height = 268

      // let graph_box_height = 295
      // let graph_box_top = 60

      let graph_box_height = 383
      let graph_box_width = 290
      let graph_box_top = 10
      let graph_box_left = 615
      let dataLabelX = Scenes.EE18AlreadySeleted == 1 ? "Firing Angle (α)" : "AC Input Voltage (volts)"
      
      // ! Forshowing dummy graph
      Scenes.items.graph_box_0.set(graph_box_left, graph_box_top, graph_box_height, graph_box_width).zIndex(5)
      Scenes.items.graph0.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph0.item
      let dummyGraphIdx = 10
      // graph idx is for  showing which graph is being shown
      let graphIdx = 0
      // * showing the dummy graph
      function showDummyGraph(zidx = 10){
        // if(forceShow || Scenes.items.chart.graph[dummyGraphIdx]==null){
        //   Scenes.items.graph_box_0.set()
        //   Scenes.plotGraph(ctx,dummyGraphIdx,true,dataLabelX,"")
        // }
        Scenes.items.graph_box_0.zIndex(zidx)
      }
      showDummyGraph()  
      
      // ! To Plot graph
      function plotGraphs(){
        let ctxs = {
          graph_box: [
            Scenes.items.graph_box_1.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_2.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_3.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_4.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_5.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_6.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
          ],
          graph: [
            Scenes.items.graph1.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph2.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph3.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph4.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph5.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph6.set(null,null,graph_height,graph_width).item,
          ]
        }
        let data = {
          labels: [
            ["Vdc"],
            ["Idc"],
            ["Vrms"],
            ["Irms"],
            ["P0"],
            ["PF"],
          ],
          colors: {
            first:"#d95117",
            second:"#0072bd",
          },
          datas:[],
        }
        let yLabels = [
          "Load Voltage (volts)",
          "Load Current (amps)",
          "Vrms (volts)",
          "Irms (amps)",
          "Power (watts)",
          "Power Factor (PF)",
        ]
        function getDataFromTable(){
          let datas_XY = [] // v0,i0,p0,PF,THD
          let indexForTableColunmDataY = [
            [3],[4],[5],[6],[7],[9]
          ]
          // * change according to constant
          let colIdxFiringAngle = 2
          let colIdxAcInputVoltage = 1
          let indexForTableColumnDataX = Scenes.EE18AlreadySeleted == 1 ? colIdxFiringAngle : colIdxAcInputVoltage

          indexForTableColunmDataY.forEach(col_idxs=>{
            let col_idxs_datas = []
            col_idxs.forEach(col_idx=>{
              let rows = table.tBodies[0].rows
              // get data from rows.cells
              let col_idx_datas = []
              for(let row of rows){
                let x = row.cells[indexForTableColumnDataX].innerHTML
                let y = row.cells[col_idx].innerHTML
                let data = {x,y}
                col_idx_datas.push(data);
              }
              // save data on datas_XY
              col_idxs_datas.push(col_idx_datas)
            })
            datas_XY.push(col_idxs_datas)
          })
          return datas_XY
        }
        // table data to array conversion
        let datas_XY = getDataFromTable()
        data.datas = datas_XY

        // ! set all data and plot graph but hide all or don't set
        // and active all click buttons
        function dataToGraphConversion(){
          ctxs.graph.forEach((ctx,idx)=>{
            idx = idx
            let 
            xLabel = dataLabelX,
            yLabel = yLabels[idx],
            dataArrays = data.datas[idx],
            dataLabels = data.labels[idx],
            dataColor = data.colors
            // plot empty graph
            let graphRef = Scenes.plotGraph(ctx,idx,true,xLabel,yLabel)

            let first = 0
            let second = 1
            let data_1 = {
              array: dataArrays[first],
              label: dataLabels[first],
              color: dataColor.first, 
            }
            // let data_2 = {
            //   array: dataArrays[second],
            //   label: dataLabels[second],
            //   color: dataColor.second, 
            // }
            Scenes.graphFeatures.addDataset(graphRef,data_1.label,data_1.color,data_1.array)
            // Scenes.graphFeatures.addDataset(graphRef,data_2.label,data_2.color,data_2.array)
            
          })
          Scenes.items.yLabel.setContent("")
          Scenes.items.xLabel.setContent("")
        }
        dataToGraphConversion()
                
        // * graph tab btn onclick
        function btnGraphTab(){
          let subtitles = {
            lastButtonFunction: ()=>{
              if(Scenes.EE18AlreadySeleted == 1){
                Dom.setBlinkArrowRed(-1)
                setCC("The plot shows source power factor variation with firing angle and, it is decreasing with increase in alpha").onend = ()=>{
                  setCC("Click on 'Reset' to select different values")
                  Dom.setBlinkArrowRed(true,183,-26,30,null,90).play()
                }
                Scenes.EE18AlreadySeleted++
              }else{
                setCC("The plot shows that the power factor is constant with R-load for constant firing angle.").onend = ()=>{
                  // Dom.setBlinkArrowRed(-1)
                  Scenes.currentStep = 5
                  // Scenes.steps[5]()
                  setCC("Click 'Next' to go to next step");
                  Dom.setBlinkArrow(true, 790, 544).play();
                  setIsProcessRunning(false);
                }
                // Scenes.currentStep = 4
              }
            },
            arrows: [
              ()=>Dom.setBlinkArrowRed(true,730,11,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,790,-29,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,790,11,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,845,-29,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,845,11,30,null,90).play(),
            ],
            texts: [
              ["In controlled rectifier, the DC load voltage is adjustable with firing angle. The plot shows that the load voltage is decreasing with increase in firing angle.",
              "Here also, the load current is  decreasing with increase in firing angle.",
              "The plot shows RMS load voltage which is decreasing with firing angle.",
              "The plot shows RMS load current which is decreasing with firing angle.",
              "The plot shows load power variation with firing angle and, it is decreasing with increase in alpha. "],
              ["The plots show load voltage is increasing  with increasing  ac input voltage.",
              "Here also, the load current is increasing  with increasing  ac input voltage.",
              "The plot shows RMS load voltage is increasing  with increasing  ac input voltage.",
              "The plot shows RMS load current is increasing  with increasing  ac input voltage.",
              "The plot shows load power increases with increasing input ac voltage."],
            ]
          }
          let btns = [
            Scenes.items.option_1_tab_1.item,
            Scenes.items.option_1_tab_4.item,
            Scenes.items.option_1_tab_2.item,
            Scenes.items.option_1_tab_5.item,
            Scenes.items.option_1_tab_3.item,
            Scenes.items.option_1_tab_6.item,
            // Scenes.items.option_2_tab_7.item,
            // Scenes.items.option_2_tab_8.item,
          ]

          btns.forEach((btn,idx)=>{
            btn.onclick = () =>{
              // dummy graph by zindex
              showDummyGraph(1)
              // Scenes.items.part_5_tab1.styles({filter: "hue-rotate(158deg)"})
              // btn.style.filter = "hue-rotate(158deg)"

              //for labeling
              let conclusionFront = ""
              //* for conclusion
              switch(idx){ 
                case 0: 
                  conclusionFront = "With R-load, the RMS output voltage ( V<sub>rms</sub>) is more as compared to average output voltage (V<sub>o</sub>)."
                  break;
                
                case 1: 
                  conclusionFront = "With R-load the I<sub>rms</sub> is more as compared to I<sub>o</sub> (average output current)"
                  break;
                
                case 2: 
                  conclusionFront = "The load power increases with increasing input ac source voltage."
                  break;
                
                case 3: 
                  conclusionFront = "Here, the ripple factor and TUF are constant and they are independent of load."
                  break;
              }
              // ! SHOW FRONT TEXT
              // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

              for(let gb of ctxs.graph_box){
                gb.hide()
              }

              // * show current clicked graph and labels
              ctxs.graph_box[idx].show()
              if(idx < btns.length - graphIdx - 1){
                Dom.setBlinkArrowRed(-1)
                // * text is 2d array where text is located
                setCC(subtitles.texts[Scenes.EE18AlreadySeleted-1][idx]).onend = ()=>{
                  subtitles.arrows[idx]()
                }
              }else{
                subtitles.lastButtonFunction()
              }
              let yLabel = Scenes.items.chart.label[idx].y
              Scenes.items.yLabel.setContent(yLabel)
              Scenes.items.xLabel.setContent(dataLabelX)

              //! toolkit

              Download.playDownloadButtonAnime();

            }
          })
        }
        btnGraphTab()
      }

      //* to check conclusion appearance
      // Scenes.items.tempTitle1.set(null, -74,108, 301 ).setContent("lorem20sdhs jfjdsf ajhs;as hdf asdlhf").addClass("conclusion").zIndex(2000).item


      // ! ------------> If data already present plot the graph
      // if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
      //   // setDataToGraph()= 
      //     setIsProcessRunning(false)
      //     Scenes.currentStep  = 4

      //     recordBtnClickIdx = 21
      //     let r=7
      //     let tab=3
      //     // * to get old values from table for matching
      //     for(let i=0;i<tab;i++){
      //       let arr = []
      //       for(let j=0;j<r;j++){
      //         arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
      //       }
      //       valuesToMatch.push(arr)
      //     }

      //     disableSlider("r")
      //     disableSlider("v")
      //     setDataToGraph()
      // }else{
      //   plotGraph()
      // }
       
      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
          return
        }
        let rows = table.tBodies[0].rows
        let n = 11
        
        for(let i=1;i<n;i++){
          rows[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          // disableSlider("reset")
        }
        valuesToMatch.pop()
        let constVal1 = 50
        let constVal2 = 220
        // for safe the prdefined values
        if(recordBtnClickIdx==0){
          rows[0].cells[1].innerHTML = constVal1
          valuesToMatch.push(constVal1)
        }else if(recordBtnClickIdx==1){
          rows[1].cells[1].innerHTML = constVal2
          valuesToMatch.push(constVal2)
        }
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=rows.length
        let m=rows[0].cells.length
  
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          } 
        }
        rows[0].cells[1].innerHTML = 50
        rows[1].cells[1].innerHTML = 220
        // reset all the parameters
        // so just simply call this step again
        // sliders.reset()
        // let tabs = [
        //   Scenes.items.part_5_tab1,
        //   Scenes.items.part_5_tab2,
        //   Scenes.items.part_5_tab3,
        //   Scenes.items.part_5_tab4,
        //   Scenes.items.part_5_tab5,
        // ]

        // tabs.forEach(tab=>{
        //   tab.styles({
        //     filter: "",
        //   })
        //   tab.item.onclick = ()=>{}
        // })
        sliders.active("all")
        Scenes.steps[8]()
      }

      let currentTableIdx = 0
      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){
        // for hiding slider
        if(recordBtnClickIdx == 0){
          if(Scenes.EE18AlreadySeleted == 1){
            sliders.disable("v")
          }else{
            sliders.disable("d")
          }
        }
        // for arrow system
        if(Scenes.EE18AlreadySeleted == 1 && recordBtnClickIdx < 6){
          Dom.setBlinkArrowRed(true,157,172,30,null,90).play()
          setCC("Change the firing angle")
        }else{
          if(0 <= recordBtnClickIdx && recordBtnClickIdx <1){
            Dom.setBlinkArrowRed(true,50,-18,30,null,90).play()
            setCC("Press Record")
          }else if(recordBtnClickIdx < 6){
            Dom.setBlinkArrowRed(true,60,11,30,null,-90).play()
            setCC("Change the ac voltage")
          } 
        }
        // dutyRatioValue/d is firing angle
        let vInValue = Number(sliders.v.value)
        let dutyRatioValue = Number(sliders.d.value)
        // * for default two values
        if(Scenes.EE18AlreadySeleted == 2 && (recordBtnClickIdx == 0 || recordBtnClickIdx == 1)){
          vInValue = recordBtnClickIdx == 0 ? 50 : 220
        }
        let resistanceValue = 100 // 50 ohm fixed
        updateValues(vInValue, dutyRatioValue ,resistanceValue)
        // ! Can't select same values
        let changableVal = Scenes.EE18AlreadySeleted == 1 ? dutyRatioValue : vInValue
        if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(changableVal)!=-1){
          let type = Scenes.EE18AlreadySeleted == 1 ? "firing angle" : "ac voltage"
          setCC("Please set different " + type)
          return
        }else{
          valuesToMatch.push(changableVal)
        }

        // ! sort the data
        if(recordBtnClickIdx==7){

          function sortTable(){
            var rows = table.tBodies[0].rows
            // * change according to constant
            let colIdxFiringAngle = 2
            let colIdxAcInputVoltage = 1
            let valueColumnToShort = Scenes.EE18AlreadySeleted == 1 ? colIdxFiringAngle : colIdxAcInputVoltage
            
            let n = rows.length
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[valueColumnToShort].innerHTML)
                    let val2 = Number(rows[j+1].cells[valueColumnToShort].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
              rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()
          // ! plot all graphs
          plotGraphs()
          

          // ! Graph Tab Buttons click
          function graphTabButtonArrows(){
            window.speechSynthesis.cancel()
            // conclusionFontAdd_1
              // ! ADD TEXT HERE
            // let text = "To see the average and rms load voltage variation with input ac voltage press the respective button."
            // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(text).addClass("conclusion").zIndex(2000).item
            // Dom.setBlinkArrowRed(-1)
            // setCC(text).onend = ()=>{
              // ! ADD ARROW HERE
              // Dom.setBlinkArrowRed(true,730,-29,30,null,90).play()
            // }
            Dom.setBlinkArrowRed(true,730,-29,30,null,90).play()
            // refer to plotGraphs() area

          }
          graphTabButtonArrows()
          // after complete
          // Dom.setBlinkArrow(true, 790, 408).play()
          // setCC("Click 'Next' to go to next step")
          // setIsProcessRunning(false)
          // Scenes.currentStep = 4
        }

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          // disableSlider("v")
          // disableSlider("d")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        // let FiringAngleValue = tableRow.cells[2].innerHTML
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = dutyRatioValue
        tableRow.cells[3].innerHTML = Number(Formulas.r_load.vdc(values)).toFixed(2)
        tableRow.cells[4].innerHTML = Number(Formulas.r_load.idc(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.r_load.vrms(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.r_load.irms(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.r_load.power(values)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.r_load.s(values)).toFixed(2)
        tableRow.cells[9].innerHTML = Number(Formulas.r_load.pf(values)).toFixed(2)
        // added a display none column

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        if(recordBtnClickIdx==7){
          setCC("Press Record")
        }
      }    

      return true;

    }),


    //! option 2 

    //! option 2 part 1 Controlled Bridge Rectifier with RL-Load : Principle of Operation
    (concept_dev_step4 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      // require
      Scenes.items.slider_box.hide()
      
      let btn_transparent = Scenes.items.btn_transparent.set().item;

      Scenes.items.concept_development_4.set().styles({
        zIndex: "5000",
        scale: "1 0.915",
        top: "-144px",
        position: "absolute",
      })
      let src_path = "./iframes/step8/index.html"
      Scenes.items.concept_development_4.item.src = src_path
      // remove other iframes 
      function removeIframes(){
        let safeIdx = 3
        let cds = getAll(".concept_development")
        cds.forEach((cd,idx)=>{
          if(idx != safeIdx){
            cd.src = ""
          }
        })
        
      } 
      removeIframes()

      // ! Slide ended enable the button next button
      function checkIsSlideEnded(){
        let isSlideEnded = localStorage.getItem("isSlideEnded")
        if(isSlideEnded=="true"){
          btn_transparent.disabled = false
          setIsProcessRunning(false)
          btn_transparent.classList.remove("btn-disabled")
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
          btn_transparent.onclick = ()=>{
            Scenes.next()
            localStorage.setItem("isSlideEnded",false)
            window.clearInterval(interval)
            btn_transparent.classList.add("btn-disabled")
            btn_transparent.disabled = true

          }
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000)
        
      return true;
    }),

    //! option 2 part 2 Controlled Bridge Rectifier with RL-Load : Steady-state Waveforms  
    (step5 = function () {
      setIsProcessRunning(true);


      Scenes.setStepHeading(
        "",
        ""
      )
      Scenes.items.btn_next.show()
      Scenes.items.slider_box.hide()

      //! Required items
      Scenes.items.option_2_text_graph.set(10, -59, 123)
      Scenes.items.option_2_text_2_graph.set(10, -59, 102).hide()

      Scenes.items.option_2_graph_circuit.set(70, 118,  282)
      Scenes.items.option_2_v_1.set(16, 214, 108)
      Scenes.items.option_2_v_2.set(419, 136, 221)
      Scenes.items.option_2_v_3.set(148, 113, 103)
      Scenes.items.option_2_a.set(81, 182, 74).zIndex(1)
      Scenes.items.part_1_helper.set(596, -8, 392).zIndex(2)
      
      let graphs = [
        Scenes.items.option_2_graph_1.set(591, -15, 170).hide(),
        Scenes.items.option_2_graph_2.set(591, -15, 325).hide(),
        Scenes.items.option_2_graph_4.set(591, -15, 317).hide(),
        Scenes.items.option_2_graph_3.set(591, -15, 205).hide(),
        Scenes.items.option_2_graph_full.set(602, -65, 462).hide(),
      ]
      let compo = [  
        Scenes.items.option_2_v_1,     
        Scenes.items.option_2_v_2,     
        Scenes.items.option_2_v_3,     
        Scenes.items.option_2_a
      ]

      compo.forEach((ele)=>{
        ele.item.onmouseenter = ()=>{
          anime({
            targets: ele.item,
            scale: 1.1,
            duration: 500,
            easing: "easeInOutQuad",
            // loop: true,
          })
        }
        ele.item.onmouseout = ()=>{
          anime({
            targets: ele.item,
            scale: 1,
            duration: 500,
            easing: "easeInOutQuad",
            // loop: true,
          })
        }
      })

      function remove(target){
        return anime({
          targets: target.item,
          left: 1000,
          duration:2000,
          easing: "easeInOutQuad"
        })
      }

      let clickCountIdx = 0
      let currentGraph = Scenes.items.talk_cloud.hide()

      let isCompClick = [0, 0, 0, 0]
      let time 

      compo[0].item.onclick = ()=>{
        time = 4000
        isCompClick[0] = 1
        setCC("Here, the ac input  voltage waveform is shown.")
        Scenes.items.part_1_helper.set(596, -8, 392).zIndex(2)
        remove(Scenes.items.part_1_helper)
        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[0]
        graphs[0].show()
        fullWave()
      }
      compo[1].item.onclick = ()=>{ 
        isCompClick[1] = 1

        setCC("Here, the load voltage and load current waveforms with RL  load is shown. ")
        setCC(" Based on the firing angle of the gate terminal,the thyristors start conducting and  voltage and current waveforms across load obtained.")
       
        Scenes.items.part_1_helper.set(596, -8, 392).zIndex(2)
        remove(Scenes.items.part_1_helper)
        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[1]
        graphs[1].show()
        fullWave(19000)

      }
      compo[2].item.onclick = ()=>{
        isCompClick[2] = 1
        setCC("Here, the voltage appearing across thyristor one and current through it is shown.")
        Scenes.items.part_1_helper.set(596, -8, 392).zIndex(2)
        remove(Scenes.items.part_1_helper)
        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[2]
        graphs[2].show()
        fullWave(5000)

      }
      compo[3].item.onclick = ()=>{
        time = 8000
        isCompClick[3] = 1
        setCC("Here, the ac input current waveform is shown.  the value of inductor decides the smoothness of the waveform and it can be a perfect square wave.")
        Scenes.items.part_1_helper.set(596, -8, 392).zIndex(2)
        remove(Scenes.items.part_1_helper)

        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[3]
        graphs[3].show()
        console.log(clickCountIdx)
        fullWave(8000)
      }


  
      function fullWave(time){
        if(isCompClick.indexOf(0) == -1){
          compo.forEach((ele)=>{
            ele.item.onmouseenter = ()=>{   
            }
            ele.item.onclick = ()=>{
            }
          })
        setTimeout(()=>{
          Scenes.items.option_2_text_graph.hide()
          Scenes.items.option_2_text_2_graph.show()
          currentGraph.hide()
          graphs[4].show()
          Dom.setBlinkArrow(true, 790, 408).play()
          console.log(time)
          setCC("Here, various voltage and current waveforms are shown for better understanding of the controlled rectifier principle of operation.")
          setIsProcessRunning(false)
        },time)
        }
      } 
      
      return true
    }),  

    //! option 2 part 3 Controlled Bridge Rectifier with RL-Load : Steady-state Waveforms part 2
    (step6 = function () {
      setIsProcessRunning(true);


  
      Scenes.items.btn_next.show()
      Scenes.items.slider_box.hide()

      //! Required items

      let items = Scenes.items
      items.option_1_left_graph.set(7, -36, 463).zIndex(4)
      items.option_1_left_graph_text.set(270, 222, 90)
      // items.option_1_right_graph.set(670, -66, 463).zIndex(4)
      // items.option_1_right_graph_text.set(268, 13, 80)
      items.part_1_helper.set(270, 180, 134).zIndex(2)

      let slide = (target, slide)=>{

        anime({
          targets: target.item,
          translateX: slide,
          easing: "linear",
          duration: 2000
        })

      }

      slide(items.part_1_helper, 480)

      setTimeout(()=>{
        items.option_1_right_graph.set(670, -36, 463).zIndex(4)
        items.option_1_right_graph_text.set(268, 13, 80)
        items.part_1_helper.set(266, -6, 154).zIndex(2)
        slide(items.part_1_helper, -520)



      }, 3000)

      setCC("Here, various voltage and current waveforms are shown for RL-load and highly inductive loads.")
      setCC(" In case of highly inductive loads, the source current waveform is square wave in nature.").onend = ()=>{
        console.log("complete")
        //* After complete
        Dom.setBlinkArrow(true, 790, 408).play()
        // setCC("Click 'Next' to go to next step.")
        setIsProcessRunning(false)
      }

      return true
    }), 
    
    //! option 2 part 4 Controlled Bridge Rectifier : RL-Load
    (step7 = function () {
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Dom.useTogglePointerEventsHere()
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "",
        ""
      )
      // ! show the slider
      Scenes.items.slider_box.set(0, -38).show("flex")
      let d_max = 0
      if(Scenes.EE18AlreadySeleted <= 2){
        d_max = 72
      }else if(Scenes.EE18AlreadySeleted == 2.5){
        d_max = 88
      }else if(Scenes.EE18AlreadySeleted == 3){
        d_max = 72
      }
      sliders.d_max = d_max
      sliders.changeCircuitImage("rl")
      sliders.resetSlidersValue()
      sliders.showAllSliders()
      // sliders.showSliderFor(1)
      //!new added for EE8
      Scenes.items.part3_table_three_two.set(5)
      sliders.active("d")
      sliders.active("v")

      //* to set the styling of conclusion front
      // let conclusionFront = "Here, the load voltage waveform is shown. The load voltage ripple is reduced after connecting the C-filter"
      // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

      
      // Scenes.items.graph_bcg.set(612,-75, 120)
      Scenes.items.tab_alpha.set(608, -58, 53)
      Scenes.items.option_2_tab_1.set(690, -80, 50).zIndex(3)
      Scenes.items.option_2_tab_2.set(690+55, -80, 50).zIndex(3)
      Scenes.items.option_2_tab_3.set(690+55+55, -80, 50).zIndex(3)
      Scenes.items.option_2_tab_4.set(690+55+55+55, -80, 50).zIndex(3)
      Scenes.items.option_2_tab_5.set(690, -36, 50).zIndex(3)
      Scenes.items.option_2_tab_6.set(690+55, -36, 50).zIndex(3)
      Scenes.items.option_2_tab_7.set(690+55+55, -36, 50).zIndex(3)
      Scenes.items.option_2_tab_8.set(690+55+55+52, -36, 50).zIndex(3)
      Scenes.items.graph_border.set(610, -76, 475, 302)

      let optionTabs = [
        Scenes.items.tab_set_1.set(385, -17, 59).zIndex(2001),
        Scenes.items.tab_set_2.set(386, 52, 59).zIndex(2001),
      ]

      let subOptionTabs = [
        Scenes.items.load_1.set(396,40,44).zIndex(2001).hide(),
        Scenes.items.load_2.set(396,84,44).zIndex(2001).hide(),
      ]

      let rightTicks = [
        Scenes.items.right_tick_1.set(402,1,18).hide().zIndex(2002),
        Scenes.items.right_tick_2.set(402,67,18).hide().zIndex(2002),
      ]

      Scenes.items.btn_record.set(8, -67, 38)
      Scenes.items.btn_reset.set(8+130, -67, 38)
      Scenes.items.btn_delete.set(8+130+130, -67, 38)
      // Scenes.items.btn_plot.set(698+20, 360, 35).zIndex(2)

      let valuesToMatch = []

      let table = new Dom(".part3_table_three_two").item
      
       // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

      optionTabs[0].item.onclick = ()=>{
        Dom.setBlinkArrowRed(true,472,84,30,null,90).play()

        rightTicks[0].show()
        optionTabs[1].hide()
                
        //! Sub tab option 
        subOptionTabs.forEach((ele, idx)=>{
          ele.show()
          ele.item.onclick = ()=>{
            Dom.setBlinkArrowRed(true,60,11,30,null,-90).play()
            setCC("Set the ac voltage")

            if(Scenes.EE18AlreadySeleted == 2 && idx == 0){
              
              subOptionTabs[1].hide()
              rightTicks[1].set(412,58, 10).zIndex(2002)
            }else if(Scenes.EE18AlreadySeleted == 2.5 && idx == 1){

              rightTicks[1].set(412,58, 10).zIndex(2002)
              subOptionTabs[1].set(396,40,44).zIndex(2001)
            }
            Scenes.items.value_box_alpha.set(353,85,118)
            Scenes.items.tempTitle16.set(564, 162).setContent(`${d_max}°`).styles({
              color: "black",
            })
          }
          // * Removing already completed onclicks
          if(Scenes.EE18AlreadySeleted == 2){
            optionTabs[1].item.onclick = ()=>{}
            subOptionTabs[1].item.onclick = ()=>{}
          }else if(Scenes.EE18AlreadySeleted == 2.5){
            optionTabs[1].item.onclick = ()=>{}
            subOptionTabs[0].item.onclick = ()=>{}
          }
        })

        // remove default value from table
        table.tBodies[0].rows[0].cells[1].innerHTML = ""
        table.tBodies[0].rows[1].cells[1].innerHTML = ""
      } 
      optionTabs[1].item.onclick = ()=>{
        // slider firing angle
        Dom.setBlinkArrowRed(true,157,172,30,null,90).play()
        setCC("Set the firing angle")

        rightTicks[1].show()
      }

      // ! for restoring the set constant state
      if(Scenes.EE18AlreadySeleted == 2.5){
        optionTabs[0].item.click()
        rightTicks[1].set(412,58, 10).zIndex(2002)
      }
      if(Scenes.EE18AlreadySeleted == 3){
        rightTicks[0].show()
        Scenes.items.table_part_2_r_10.set(330,130,25)
      }

      // * Removing already completed onclicks
      if(Scenes.EE18AlreadySeleted == 2){
        optionTabs[1].item.onclick = ()=>{}
        subOptionTabs[1].item.onclick = ()=>{}
      }else if(Scenes.EE18AlreadySeleted == 2.5){
        optionTabs[0].item.onclick = ()=>{}
        optionTabs[1].item.onclick = ()=>{}
        subOptionTabs[0].item.onclick = ()=>{}
      }else{
        optionTabs[0].item.onclick = ()=>{}
      }
      
      // ! Tutorial Function
      // Dom.setBlinkArrowRed(true,0,0,30,null,-90)
      function stepTutorial2(){
        if(Scenes.EE18AlreadySeleted < 3){
          if(Scenes.EE18AlreadySeleted == 2){
            Dom.setBlinkArrowRed(true,472,39,30,null,90).play()
            setCC("Here, set AC input voltage and vary the firing angle and record the observations.")
          }else{
            Dom.setBlinkArrowRed(true,472,132,30,null,90).play()
          }

          sliders.v_knob.onclick = ()=>{
            Dom.setBlinkArrowRed(true,157,172,30,null,90).play()
            setCC("Set the firing angle")
            sliders.sliderV()
            sliders.v_knob.click()

            // d onclick
            sliders.d.onclick = ()=>{
              Dom.setBlinkArrowRed(true,50,-18,30,null,90).play()
              setCC("Press Record")
            }
          }
        }
        // ! For clicking automatic after one step is done
        else if(Scenes.EE18AlreadySeleted == 3){
          Dom.setBlinkArrowRed(true,472,114,30,null,90).play()
          setCC("Here, set the firing angle and vary the AC input voltage and  record the observations.")

          // d onclick
          sliders.d.onclick = ()=>{
            Dom.setBlinkArrowRed(true,50,-18,30,null,90).play()
            setCC("Press Record")
          }

          // v onclick
          sliders.v_knob.onclick = ()=>{
            sliders.sliderV(()=>{
              Dom.setBlinkArrowRed(true,50,-18,30,null,90).play()
              setCC("Press Record")
            })
            sliders.v_knob.click()
          }
        }
        // setTimeout(() => {
        //   Dom.setBlinkArrowvRed(true,50,-18,30,null,90).play()
        //   setCC("Press Record")
        // }, 8000);

        // reset slider d onclick
        // sliders.v_knob.onclick = ()=>{
        //   sliders.sliderV(()=>{
            
        //   })
        //   sliders.v_knob.click()
        // }
      }
      if(recordBtnClickIdx == 0){
        // Dom.setBlinkArrowRed(true,730,11,30,null,90)
        stepTutorial2()
      }

      // ! graph
      // let graph_width = 346
      // let graph_height = 273

      let graph_width = 308
      let graph_height = 268

      // let graph_box_height = 295
      // let graph_box_top = 60

      let graph_box_height = 383
      let graph_box_width = 290
      let graph_box_top = 10
      let graph_box_left = 615
      let dataLabelX = Scenes.EE18AlreadySeleted < 3 ? "Firing Angle (α)" : "AC Input Voltage (volts)"
      
      // ! Forshowing dummy graph
      Scenes.items.graph_box_0.set(graph_box_left, graph_box_top, graph_box_height, graph_box_width).zIndex(5)
      Scenes.items.graph0.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph0.item
      let dummyGraphIdx = 10
      // graph idx is for  showing which graph is being shown
      let graphIdx = 0
      // * showing the dummy graph
      function showDummyGraph(zidx = 10){
        // if(forceShow || Scenes.items.chart.graph[dummyGraphIdx]==null){
        //   Scenes.items.graph_box_0.set()
        //   Scenes.plotGraph(ctx,dummyGraphIdx,true,dataLabelX,"")
        // }
        Scenes.items.graph_box_0.zIndex(zidx)
      }
      showDummyGraph()  
      
      // ! To Plot graph
      function plotGraphs(){
        let ctxs = {
          graph_box: [
            Scenes.items.graph_box_1.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_2.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_3.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_4.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_5.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_6.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_7.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            Scenes.items.graph_box_8.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
          ],
          graph: [
            Scenes.items.graph1.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph2.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph3.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph4.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph5.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph6.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph7.set(null,null,graph_height,graph_width).item,
            Scenes.items.graph8.set(null,null,graph_height,graph_width).item,
          ]
        }
        let data = {
          labels: [
            ["Vdc"],
            ["Idc"],
            ["Vrms"],
            ["Irms"],
            ["P"],
            ["DF"],
            ["HF"],
            ["PF"],
          ],
          colors: {
            first:"#d95117",
            second:"#0072bd",
          },
          datas:[],
        }
        let yLabels = [
          "Average Load Voltage (volts)",
          "Average Load Current (amps)",
          "Load RMS voltage (volts)",
          "Load IRMS current (amps)",
          "Power (watts)",
          "Displacement factor (DF)",
          "Harmonic Factor (HF)",
          "Power Factor (PF)",
        ]
        function getDataFromTable(){
          let datas_XY = [] // v0,i0,p0,PF,THD
          let indexForTableColunmDataY = [
            [3],[4],[5],[6],[7],[12],[10],[13]
          ]
          // * change according to constant
          let colIdxFiringAngle = 2
          let colIdxAcInputVoltage = 1
          let indexForTableColumnDataX = Scenes.EE18AlreadySeleted < 3 ? colIdxFiringAngle : colIdxAcInputVoltage
          indexForTableColunmDataY.forEach(col_idxs=>{
            let col_idxs_datas = []
            col_idxs.forEach(col_idx=>{
              let rows = table.tBodies[0].rows
              // get data from rows.cells
              let col_idx_datas = []
              for(let row of rows){
                let x = row.cells[indexForTableColumnDataX].innerHTML
                let y = row.cells[col_idx].innerHTML
                let data = {x,y}
                col_idx_datas.push(data);
              }
              // save data on datas_XY
              col_idxs_datas.push(col_idx_datas)
            })
            datas_XY.push(col_idxs_datas)
          })
          return datas_XY
        }
        // table data to array conversion
        let datas_XY = getDataFromTable()
        data.datas = datas_XY

        // ! set all data and plot graph but hide all or don't set
        // and active all click buttons
        function dataToGraphConversion(){
          ctxs.graph.forEach((ctx,idx)=>{
            idx = idx
            let 
            xLabel = dataLabelX,
            yLabel = yLabels[idx],
            dataArrays = data.datas[idx],
            dataLabels = data.labels[idx],
            dataColor = data.colors
            // plot empty graph
            let graphRef = Scenes.plotGraph(ctx,idx,true,xLabel,yLabel)

            let first = 0
            let second = 1
            let data_1 = {
              array: dataArrays[first],
              label: dataLabels[first],
              color: dataColor.first, 
            }
            console.log(data_1)
            // let data_2 = {
            //   array: dataArrays[second],
            //   label: dataLabels[second],
            //   color: dataColor.second, 
            // }
            Scenes.graphFeatures.addDataset(graphRef,data_1.label,data_1.color,data_1.array)
            // Scenes.graphFeatures.addDataset(graphRef,data_2.label,data_2.color,data_2.array)
            
          })
          Scenes.items.yLabel.setContent("")
          Scenes.items.xLabel.setContent("")
        }
        dataToGraphConversion()
                
        // * graph tab btn onclick
        function btnGraphTab(){
          let subtitles = {
            lastButtonFunction: ()=>{
              if(Scenes.EE18AlreadySeleted < 3){
                Dom.setBlinkArrowRed(-1)

                setCC("The plot shows that the power factor is decreasing with increase in firing angle.").onend = ()=>{
                  setCC("Click 'Reset' to select different set")
                  Dom.setBlinkArrowRed(true,183,-26,30,null,90).play()
                }
                Scenes.EE18AlreadySeleted+=0.5
              }else{
                setCC("The power factor depends on the firing angle, and hence it is constant.")
                  // Dom.setBlinkArrowRed(-1)
                  // setCC("Simulation Done");
                Scenes.currentStep = 5
                setCC("Click 'Next' to go to next step")
                Dom.setBlinkArrow(true, 790, 544).play();
                setIsProcessRunning(false);
                
                // Scenes.currentStep = 4
              }
            },
            arrows: [
              ()=>Dom.setBlinkArrowRed(true,701,13,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,756,-32,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,756,13,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,809,-32,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,809,13,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,863,-32,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,863,13,30,null,90).play(),
            ],
            texts: [
              [
                "In controlled rectifier, the DC load voltage is adjustable with firing angle. The plot shows that the load voltage is decreasing with increase in firing angle. For firing angles greater than 90 degrees average load voltage become negative.",
                "The plot shows that the load current is decreasing with increase in firing angle. ",
                "The plot shows RMS load voltage variation with firing angle and it is almost constant. ",
                "The plot shows that the RMS value of load current is decreasing with increase in firing angle.",
                "The plot shows that the load power is decreasing with increase in firing angle.",
                "The plot shows that the displacement factor is decreasing with increase in firing angle.",
                "The harmonic factor does not depends on the firing angle, and hence it is constant.",
              ],
              [
                "The plot shows that the DC load voltage is increasing with increase in AC input voltage.",
                "The plot shows that the DC load current is increasing with increase in AC input voltage.",
                "The plot shows that the RMS load voltage is increasing with increase in AC input voltage.",
                "The plot shows that the RMS load current is increasing with increase in AC input voltage.",
                "The plot shows that the load power is increasing with increase in AC input voltage.",
                "The displacement factor depends on the firing angle, and hence it is constant.",
                "The harmonic factor depends on the firing angle, and hence it is constant.",
              ],
            ]
          }
          let btns = [
            Scenes.items.option_2_tab_1.item,
            Scenes.items.option_2_tab_5.item,
            Scenes.items.option_2_tab_2.item,
            Scenes.items.option_2_tab_6.item,
            Scenes.items.option_2_tab_3.item,
            Scenes.items.option_2_tab_7.item,
            Scenes.items.option_2_tab_4.item,
            Scenes.items.option_2_tab_8.item,
          ]

          btns.forEach((btn,idx)=>{
            btn.onclick = () =>{
              // dummy graph by zindex
              showDummyGraph(1)
              // Scenes.items.part_5_tab1.styles({filter: "hue-rotate(158deg)"})
              // btn.style.filter = "hue-rotate(158deg)"

              //for labeling
              let conclusionFront = ""
              //* for conclusion
              switch(idx){ 
                case 0: 
                  conclusionFront = "With R-load, the RMS output voltage ( V<sub>rms</sub>) is more as compared to average output voltage (V<sub>o</sub>)."
                  break;
                
                case 1: 
                  conclusionFront = "With R-load the I<sub>rms</sub> is more as compared to I<sub>o</sub> (average output current)"
                  break;
                
                case 2: 
                  conclusionFront = "The load power increases with increasing input ac source voltage."
                  break;
                
                case 3: 
                  conclusionFront = "Here, the ripple factor and TUF are constant and they are independent of load."
                  break;
              }
              // ! SHOW FRONT TEXT
              // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

              for(let gb of ctxs.graph_box){
                gb.hide()
              }

              // * show current clicked graph and labels
              ctxs.graph_box[idx].show()
              if(idx < btns.length - graphIdx - 1){
                Dom.setBlinkArrowRed(-1)
                // * text is 2d array where text is located
                if(Scenes.EE18AlreadySeleted < 3 && idx == 0){
                  setCC("In controlled rectifier, the DC load voltage is adjustable with firing angle. The plot shows that the load voltage is decreasing with increase in firing angle.")
                  setCC("For firing angles greater than 90 degrees average load voltage become negative.").onend = ()=>{
                    subtitles.arrows[idx]()
                  }
                }
                else{
                  setCC(subtitles.texts[(Scenes.EE18AlreadySeleted < 3 ? 0 : 1)][idx]).onend = ()=>{
                    subtitles.arrows[idx]()
                  }
                }
              }else{
                subtitles.lastButtonFunction()
              }
              let yLabel = Scenes.items.chart.label[idx].y
              Scenes.items.yLabel.setContent(yLabel)
              Scenes.items.xLabel.setContent(dataLabelX)
              //! toolkit
              Download.playDownloadButtonAnime();
              
            }
          })
        }
        btnGraphTab()
      }

      //* to check conclusion appearance
      // Scenes.items.tempTitle1.set(null, -74,108, 301 ).setContent("lorem20sdhs jfjdsf ajhs;as hdf asdlhf").addClass("conclusion").zIndex(2000).item


      // ! ------------> If data already present plot the graph
      // if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
      //   // setDataToGraph()= 
      //     setIsProcessRunning(false)
      //     Scenes.currentStep  = 4

      //     recordBtnClickIdx = 21
      //     let r=7
      //     let tab=3
      //     // * to get old values from table for matching
      //     for(let i=0;i<tab;i++){
      //       let arr = []
      //       for(let j=0;j<r;j++){
      //         arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
      //       }
      //       valuesToMatch.push(arr)
      //     }

      //     disableSlider("r")
      //     disableSlider("v")
      //     setDataToGraph()
      // }else{
      //   plotGraph()
      // }
       
      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
          return
        }
        let rows = table.tBodies[0].rows
        let n = rows[0].cells.length
        
        for(let i=1;i<n;i++){
          rows[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          // disableSlider("reset")
        }
        valuesToMatch.pop()
        if(Scenes.EE18AlreadySeleted == 3){
          let constVal1 = 50
          let constVal2 = 220
          // for safe the prdefined values
          if(recordBtnClickIdx==0){
            rows[0].cells[1].innerHTML = constVal1
            valuesToMatch.push(constVal1)
          }else if(recordBtnClickIdx==1){
            rows[1].cells[1].innerHTML = constVal2
            valuesToMatch.push(constVal2)
          }
        }
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=rows.length
        let m=rows[0].cells.length
  
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          } 
        }
        
        if(Scenes.EE18AlreadySeleted == 3){
          rows[0].cells[1].innerHTML = 50
          rows[1].cells[1].innerHTML = 220
        }
        // reset all the parameters
        // so just simply call this step again
        // sliders.reset()
        // let tabs = [
        //   Scenes.items.part_5_tab1,
        //   Scenes.items.part_5_tab2,
        //   Scenes.items.part_5_tab3,
        //   Scenes.items.part_5_tab4,
        //   Scenes.items.part_5_tab5,
        // ]

        // tabs.forEach(tab=>{
        //   tab.styles({
        //     filter: "",
        //   })
        //   tab.item.onclick = ()=>{}
        // })
        sliders.active("all")
        Scenes.steps[12]()
      }

      let currentTableIdx = 0
      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){
        // for hiding slider
        if(recordBtnClickIdx == 0){
          if(Scenes.EE18AlreadySeleted == 2 || Scenes.EE18AlreadySeleted == 2.5){
            sliders.disable("v")
          }else{
            sliders.disable("d")
          }
        }
        // for arrow system
        if(Scenes.EE18AlreadySeleted < 3 && recordBtnClickIdx < 6){
          Dom.setBlinkArrowRed(true,157,172,30,null,90).play()
          setCC("Change the firing angle")
        }else{
          if(0 <= recordBtnClickIdx && recordBtnClickIdx <1){
            Dom.setBlinkArrowRed(true,50,-18,30,null,90).play()
            setCC("Press Record")
          }else if(recordBtnClickIdx < 6){
            Dom.setBlinkArrowRed(true,60,11,30,null,-90).play()
            setCC("Change the ac voltage")
          } 
        }
        // dutyRatioValue/d is firing angle
        let vInValue = Number(sliders.v.value)
        let dutyRatioValue = Number(sliders.d.value)
        let inductanceValue = 100
        let resistanceValue = 0 // 10 or 1

        if(Scenes.EE18AlreadySeleted == 2 || Scenes.EE18AlreadySeleted == 3){
          resistanceValue = 10
        }else if(Scenes.EE18AlreadySeleted == 2.5){
          resistanceValue = 1
        }
        
        // * for default two values
        if(Scenes.EE18AlreadySeleted == 3 && (recordBtnClickIdx == 0 || recordBtnClickIdx == 1)){
          vInValue = recordBtnClickIdx == 0 ? 50 : 220
        }
        updateValues(vInValue, dutyRatioValue ,resistanceValue, inductanceValue)
        // ! Can't select same values
        let changableVal = Scenes.EE18AlreadySeleted < 3 ? dutyRatioValue : vInValue
        if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(changableVal)!=-1){
          let type = Scenes.EE18AlreadySeleted < 3 ? "firing angle" : "ac voltage"
          setCC("Please set different " + type)
          return
        }else{
          valuesToMatch.push(changableVal)
        }

        // ! sort the data
        if(recordBtnClickIdx==7){

          function sortTable(){
            var rows = table.tBodies[0].rows
            // * change according to constant
            let colIdxFiringAngle = 2
            let colIdxAcInputVoltage = 1
            let valueColumnToShort = Scenes.EE18AlreadySeleted < 3 ? colIdxFiringAngle : colIdxAcInputVoltage
            
            let n = rows.length
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[valueColumnToShort].innerHTML)
                    let val2 = Number(rows[j+1].cells[valueColumnToShort].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
              rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()
          // ! plot all graphs
          plotGraphs()
          

          // ! Graph Tab Buttons click
          function graphTabButtonArrows(){
            window.speechSynthesis.cancel()
            // conclusionFontAdd_1
              // ! ADD TEXT HERE
            // let text = "To see the average and rms load voltage variation with input ac voltage press the respective button."
            // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(text).addClass("conclusion").zIndex(2000).item
            // Dom.setBlinkArrowRed(-1)
            // setCC(text).onend = ()=>{
              // ! ADD ARROW HERE
              // Dom.setBlinkArrowRed(true,730,-29,30,null,90).play()
            // }
            Dom.setBlinkArrowRed(true,701,-32,30,null,90).play()
            // refer to plotGraphs() area

          }
          graphTabButtonArrows()
          // after complete
          // Dom.setBlinkArrow(true, 790, 408).play()
          // setCC("Click 'Next' to go to next step")
          // setIsProcessRunning(false)
          // Scenes.currentStep = 4
        }

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          // disableSlider("v")
          // disableSlider("d")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        // let FiringAngleValue = tableRow.cells[2].innerHTML
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = dutyRatioValue
        tableRow.cells[3].innerHTML = Number(Formulas.rl_load.vdc(values)).toFixed(2)
        tableRow.cells[4].innerHTML = Number(Formulas.rl_load.idc(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.rl_load.vrms(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.rl_load.irms(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.rl_load.power(values)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.rl_load.is(values)).toFixed(2)
        tableRow.cells[9].innerHTML = Number(Formulas.rl_load.is1(values)).toFixed(2)
        tableRow.cells[10].innerHTML = Number(Formulas.rl_load.hf(values)).toFixed(2)
        // tableRow.cells[11].innerHTML = Number(Formulas.rl_load.df(values)).toFixed(2)
        // tableRow.cells[11].innerHTML = 10

        //! 11th cell is not responding
        tableRow.cells[12].innerHTML = Number(Formulas.rl_load.df(values)).toFixed(2)
        tableRow.cells[13].innerHTML = Number(Formulas.rl_load.pf(values)).toFixed(2)

        // console.log(tableRow.cells[13])
        // console.log("last cell", Number(Formulas.rl_load.pf(values)).toFixed(2))

        // added a display none column

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        if(recordBtnClickIdx==7){
          setCC("Press Record")
        }
      }    

      return true;

    }),

    //! HW Result Start - Menu 1
    (function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.slider_box.hide()

      Scenes.items.btn_next.show()
      let mask = Scenes.items.mask;

      //! Required positions
      let menu_images = [
        Scenes.items.hw_result_menu_1_1,
        Scenes.items.hw_result_menu_1_2,
        Scenes.items.hw_result_menu_1_3,
        Scenes.items.hw_result_menu_1_4,
      ]

      let button_subtitles = [
        "Click on the Input Voltage",
        "Click on Load Resistance",
        "Click on Firing Angle",
        "See the waveforms",
      ]
      setCC("To view the experimental waveforms select the parameters")
      let mask_clicks = [
        (onClick=()=>{})=>{
          Dom.maskClick(mask, ()=>{
            onClick()
          }, 165,127,66,157)
          Dom.setBlinkArrowOnElement(mask, "left").play()
        },
        (onClick=()=>{})=>{
          Dom.maskClick(mask, ()=>{
            onClick()
          }, 165,229,66,157)
          Dom.setBlinkArrowOnElement(mask, "left").play()
        },
        (onClick=()=>{})=>{
          Dom.maskClick(mask, ()=>{
            onClick()
          }, 165,326,66,157)
          Dom.setBlinkArrowOnElement(mask, "left").play()
        },
        (onClick=()=>{})=>{
          Dom.maskClick(mask, ()=>{
            onClick()
          }, 514,379,37,422)
          Dom.setBlinkArrowOnElement(mask, "bottom").play()
        },
      ]

      // setting up menu images styles
      menu_images.forEach((image,idx)=>{
        image.set(0,-48, 500, 950)
        if(idx == 0){
          image.show()
        }else{
          image.hide()
        }
        image.zIndex(idx + 1)
      })

      // * Menu button anime
      function button_clicks(idx=0){
        setCC(button_subtitles[idx])
        mask_clicks[idx](()=>{
          if(idx < menu_images.length-1)
            menu_images[idx+1].fadeShow(1000, ()=>button_clicks(idx+1))
          else{
            setIsProcessRunning(false)
            Scenes.next()
          }
        })
        if(idx == menu_images.length-1){
          return
        }
      }
      button_clicks()
      // Dom.setBlinkArrowRed(true,100,100)

      return true
    }),
    // ! Result 1 1
    (function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.slider_box.hide()

      Scenes.items.btn_next.show()

      //! Required positions
      let mask = Scenes.items.mask;
      Scenes.items.hw_result_1_1
        .set(0,-48, 500, 950)
      Dom.setBlinkArrowRed(true,550,50,30,null).play()
      // Start
      // Dom.maskClick(mask, ()=>{
      //   setIsProcessRunning(false)
      //   Scenes.next()
      // }, 728, 79, 39, 157)
      // Dom.setBlinkArrowOnElement(mask, "left").play()

      // setCC("DC supply voltage of 12 volts is given to flyback converter and duty ratio is varied from 0.1 to 0.9.")
      setCC("AC supply voltage of 100 volts (RMS value) is given to the Controlled Bridge Rectifier").onend = ()=>{
        // setCC("Click 'Next' to go to next step");
        setTimeout(() => {
          Dom.setBlinkArrow(true, 790, 410).play();
          setIsProcessRunning(false);
        }, 2000);
      }


      return true
    }),
    // ! Result 1 2
    (function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.slider_box.hide()

      Scenes.items.btn_next.show()

      //! Required positions
      let mask = Scenes.items.mask;
      Scenes.items.hw_result_1_2
        .set(0,-48, 500, 950)
      Dom.setBlinkArrowRed(true,550,121,30,null).play()
      // Start
      // Dom.maskClick(mask, ()=>{
      //   setIsProcessRunning(false)
      //   Scenes.next()
      // }, 728, 79, 39, 157)
      // Dom.setBlinkArrowOnElement(mask, "left").play()

      // setCC("DC supply voltage of 12 volts is given to flyback converter and duty ratio is varied from 0.1 to 0.9.")
      setCC("Load voltage is present from     ”α” to “π”.").onend = ()=>{
        // setCC("Click 'Next' to go to next step");
        setTimeout(() => {
          Dom.setBlinkArrow(true, 790, 410).play();
          setIsProcessRunning(false);
        }, 2000);
      }


      return true
    }),
    // ! Result 1 3
    (function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.slider_box.hide()

      Scenes.items.btn_next.show()

      //! Required positions
      let mask = Scenes.items.mask;
      Scenes.items.hw_result_1_3
        .set(0,-48, 500, 950)
      Dom.setBlinkArrowRed(true,550,226,30,null).play()
      // Start
      // Dom.maskClick(mask, ()=>{
      //   setIsProcessRunning(false)
      //   Scenes.next()
      // }, 728, 79, 39, 157)
      // Dom.setBlinkArrowOnElement(mask, "left").play()

      // setCC("DC supply voltage of 12 volts is given to flyback converter and duty ratio is varied from 0.1 to 0.9.")
      setCC("AC input current  closely follows the load voltage.").onend = ()=>{
        // setCC("Click 'Next' to go to next step");
        setTimeout(() => {
          Dom.setBlinkArrow(true, 790, 410).play();
          setIsProcessRunning(false);
        }, 2000);
      }


      return true
    }),
    // ! Result 1 4
    (function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.slider_box.hide()

      Scenes.items.btn_next.show()

      //! Required positions
      let mask = Scenes.items.mask;
      Scenes.items.hw_result_1_4
        .set(0,-48, 500, 950)
      Dom.setBlinkArrowRed(true,550,294,30,null).play()
      // Start
      // Dom.maskClick(mask, ()=>{
      //   setIsProcessRunning(false)
      //   Scenes.next()
      // }, 728, 79, 39, 157)
      // Dom.setBlinkArrowOnElement(mask, "left").play()

      // setCC("DC supply voltage of 12 volts is given to flyback converter and duty ratio is varied from 0.1 to 0.9.")
      setCC("Voltage across thyristor is present when it is in OFF-state and the voltage is close to zero during its ON-state.").onend = ()=>{
        // setCC("Click 'Next' to go to next step");
        setTimeout(() => {
          Dom.setBlinkArrow(true, 790, 410).play();
          setIsProcessRunning(false);
        }, 2000);
      }


      return true
    }),

    //! HW Result Start - Menu 2
    (function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.slider_box.hide()

      Scenes.items.btn_next.show()
      let mask = Scenes.items.mask;

      //! Required positions
      let menu_images = [
        Scenes.items.hw_result_menu_2_1,
        Scenes.items.hw_result_menu_2_2,
        Scenes.items.hw_result_menu_2_3,
        Scenes.items.hw_result_menu_2_4,
        Scenes.items.hw_result_menu_2_5,
      ]

      setCC("To view the experimental waveforms select the parameters")
      let button_subtitles = [
        "Click on the Input Voltage",
        "Click on Load Resistance",
        "Click on Load Inductance",
        "Click on Firing Angle",
        "See the waveforms",
      ]

      let mask_clicks = [
        (onClick=()=>{})=>{
          Dom.maskClick(mask, ()=>{
            onClick()
          }, 165,127,66,157)
          Dom.setBlinkArrowOnElement(mask, "left").play()
        },
        (onClick=()=>{})=>{
          Dom.maskClick(mask, ()=>{
            onClick()
          }, 165,205,56,157)
          Dom.setBlinkArrowOnElement(mask, "left").play()
        },
        (onClick=()=>{})=>{
          Dom.maskClick(mask, ()=>{
            onClick()
          }, 165,279,56,157)
          Dom.setBlinkArrowOnElement(mask, "left").play()
        },
        (onClick=()=>{})=>{
          Dom.maskClick(mask, ()=>{
            onClick()
          }, 165, 354, 56, 157)
          Dom.setBlinkArrowOnElement(mask, "left").play()
        },
        (onClick=()=>{})=>{
          Dom.maskClick(mask, ()=>{
            onClick()
          }, 513,382,36,421)
          Dom.setBlinkArrowOnElement(mask, "bottom").play()
        },
      ]

      // setting up menu images styles
      menu_images.forEach((image,idx)=>{
        image.set(0,-48, 500, 950)
        if(idx == 0){
          image.show()
        }else{
          image.hide()
        }
        image.zIndex(idx + 1)
      })

      // * Menu button anime
      function button_clicks(idx=0){
        setCC(button_subtitles[idx])
        mask_clicks[idx](()=>{
          if(idx < menu_images.length-1)
            menu_images[idx+1].fadeShow(1000, ()=>button_clicks(idx+1))
          else{
            setIsProcessRunning(false)
            Scenes.next()
          }
        })
        if(idx == menu_images.length-1){
          return
        }
      }
      button_clicks()
      // Dom.setBlinkArrowRed(true,100,100)

      return true
    }),
    // ! Result 2 1
    (function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.slider_box.hide()

      Scenes.items.btn_next.show()

      //! Required positions
      let mask = Scenes.items.mask;
      Scenes.items.hw_result_2_1
        .set(0,-48, 500, 950)
      Dom.setBlinkArrowRed(true,550,62,30,null).play()
      // Start
      // Dom.maskClick(mask, ()=>{
      //   setIsProcessRunning(false)
      //   Scenes.next()
      // }, 728, 79, 39, 157)
      // Dom.setBlinkArrowOnElement(mask, "left").play()

      // setCC("DC supply voltage of 12 volts is given to flyback converter and duty ratio is varied from 0.1 to 0.9.")
      setCC("AC supply voltage of 100 volts (RMS value) is given to the Controlled Bridge Rectifier").onend = ()=>{
        // setCC("Click 'Next' to go to next step");
        setTimeout(() => {
          Dom.setBlinkArrow(true, 790, 410).play();
          setIsProcessRunning(false);
        }, 2000);
      }


      return true
    }),
    // ! Result 2 2
    (function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.slider_box.hide()

      Scenes.items.btn_next.show()

      //! Required positions
      let mask = Scenes.items.mask;
      Scenes.items.hw_result_2_2
        .set(0,-48, 500, 950)
      Dom.setBlinkArrowRed(true,569,131,30,null).play()
      // Start
      // Dom.maskClick(mask, ()=>{
      //   setIsProcessRunning(false)
      //   Scenes.next()
      // }, 728, 79, 39, 157)
      // Dom.setBlinkArrowOnElement(mask, "left").play()

      // setCC("DC supply voltage of 12 volts is given to flyback converter and duty ratio is varied from 0.1 to 0.9.")
      setCC("In continuous current mode of operation, the load voltage is present from   “α” to “(π+α)”").onend = ()=>{
        // setCC("Click 'Next' to go to next step");
        setTimeout(() => {
          Dom.setBlinkArrow(true, 790, 410).play();
          setIsProcessRunning(false);
        }, 2000);
      }


      return true
    }),
    // ! Result 2 3
    (function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.slider_box.hide()

      Scenes.items.btn_next.show()

      //! Required positions
      let mask = Scenes.items.mask;
      Scenes.items.hw_result_2_3
        .set(0,-48, 500, 950)
      Dom.setBlinkArrowRed(true,571,247,30,null).play()
      // Start
      // Dom.maskClick(mask, ()=>{
      //   setIsProcessRunning(false)
      //   Scenes.next()
      // }, 728, 79, 39, 157)
      // Dom.setBlinkArrowOnElement(mask, "left").play()

      // setCC("DC supply voltage of 12 volts is given to flyback converter and duty ratio is varied from 0.1 to 0.9.")
      setCC("The AC input current closely follows the input voltage and its nature is decided by the RL-Load.").onend = ()=>{
        // setCC("Click 'Next' to go to next step");
        setTimeout(() => {
          Dom.setBlinkArrow(true, 790, 410).play();
          setIsProcessRunning(false);
        }, 2000);
      }


      return true
    }),
    // ! Result 2 4
    (function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.slider_box.hide()

      Scenes.items.btn_next.show()

      //! Required positions
      let mask = Scenes.items.mask;
      Scenes.items.hw_result_2_4
        .set(0,-48, 500, 950)
      Dom.setBlinkArrowRed(true,562,302,30,null).play()
      // Start
      // Dom.maskClick(mask, ()=>{
      //   setIsProcessRunning(false)
      //   Scenes.next()
      // }, 728, 79, 39, 157)
      // Dom.setBlinkArrowOnElement(mask, "left").play()

      // setCC("DC supply voltage of 12 volts is given to flyback converter and duty ratio is varied from 0.1 to 0.9.")
      setCC("The AC input current closely follows the input voltage and its nature is decided by the RL-Load.").onend = ()=>{
        // setCC("Click 'Next' to go to next step");
        setTimeout(() => {
          Dom.setBlinkArrowRed(-1)
          setCC("Simulation Done")
          setCC("This concludes the vrtual lab experiment on diode bridge rectifier with C-filter")

        }, 2000);
      }


      return true
    }),

  ],
  // ! For adding realcurrentstep in every step
  // ! For tracking the current step accuratly
  realCurrentStep: null,
  setRealCurrentStep(){
    let count = 0
    this.steps.forEach((step,idx) => {
      const constCount = count
      let newStep = () => {
        this.realCurrentStep = constCount;
        console.log(`RealCurrentStep: ${this.realCurrentStep}`)
        return step();
      };

      count++;
      this.steps[idx] = newStep
    });
  },
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]()
      this.currentStep++
      backDrawerItem()
      backProgressBar()
    }
  },
  next() {
    let ignore = true
    const ignoreDrawerProgress = ()=>{
      let stepsToIgnore = [6,7,8,9,10,11,12]
      console.log(this.realCurrentStep)
      ignore = stepsToIgnore.indexOf(this.realCurrentStep) != -1
      return 
    }
    if(!this.realCurrentStep){
      Scenes.setRealCurrentStep()
    }
    //! animation isRunning
    if (isRunning) {
      return
    }
    if (this.currentStep < this.steps.length) {
      ignoreDrawerProgress()

      if (this.steps[this.currentStep]()) {
        if(!ignore){
          nextDrawerItem();
          nextProgressBar();
        }
        this.currentStep++;
      }         
    } else {
      
    }
  },
}

//stepcalling
Scenes.currentStep = 1
Scenes.next()
// Scenes.steps[3]()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next")

const backBtn = get(".btn-back")
nextBtn.addEventListener("click", () => {
  Scenes.next();
})
backBtn.addEventListener("click", () => {
  Scenes.back();
})

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
    window.speechSynthesis.cancel()
  }
});

// ! Anime Header Hover Buttons
function btnPopupBox(){
  let popupBtns = document.querySelectorAll(".btn-popup")
  let popupWindow = document.querySelector(".btn-popup-window")
  
  popupBtns[0].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_procedure.item.src
  }
  popupBtns[1].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src
  }
  popupBtns[2].onmouseover = ()=>{
    switch (Scenes.forMathematicalExpressionBtn) {
      case 1:
        popupWindow.src = Scenes.items.formulas_ideal.item.src
        break;

      case 2:
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src
        break;

      case 3:
        popupWindow.src = Scenes.items.formulas_efficiency.item.src
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src
        break;
    
      default:
        popupWindow.src = Scenes.items.formulas_universal.item.src
        break;
    }
  }
}
btnPopupBox()

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }























