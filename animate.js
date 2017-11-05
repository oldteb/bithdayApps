function animate(){
  let startTime = Date.now()
  // let center = $(document).width() / 2
  initCanvas($("#myCanvas")[0])

  var timer = setInterval(function(){
    let passedTime = Date.now() - startTime
    firstLayer(passedTime)
    secondLayer(passedTime - 2000)
    thirdLayer(passedTime - 4000)
    creamLayer(passedTime - 6000)
    dropCandles(passedTime - 8000)
    dropCream1($("#myCanvas")[0], passedTime - 6300)
    dropCandles()
    showTitle(passedTime - 12000)
    if(passedTime > 15000){
      clearInterval(timer)
      return
    }
  },20)
}

function firstLayer(passedTime){
  var obj = $("#cake1")[0]
  if(passedTime > 0 && passedTime < 2000){
    obj.style.display = "block";
    dropLayer(obj, passedTime, 250)
  }
}

function secondLayer(passedTime){
  var obj = $("#cake2")[0]
  if(passedTime > 0 && passedTime < 2000){
    obj.style.display = "block";
    dropLayer(obj, passedTime, 220)
  }
}

function thirdLayer(passedTime){
  var obj = $("#cake3")[0]
  if(passedTime > 0 && passedTime < 2000){
    obj.style.display = "block";
    dropLayer(obj, passedTime, 190)
  }
}

function creamLayer(passedTime){
  var obj = $("#cream")[0]
  if(passedTime > 0 && passedTime < 2000){
    obj.style.display = "block";
    dropLayer(obj, passedTime, 160)
    drawEdge($("#myCanvas")[0])
  }
}

function dropLayer(obj, passedTime, top){
  let pos = speedupDrop(passedTime/80)
  if(pos > top)  pos = top
  obj.style.top = pos + 'px'
}

function speedupDrop(x){
  return Math.pow(x, 2)
}




function testCanvas(){
  var obj = $("#myCanvas")[0]
  var ctx = obj.getContext("2d")
  ctx.beginPath()
  ctx.arc(50, 40, 20, - Math.PI, 0)
  ctx.quadraticCurveTo(60,50,60,80)
  ctx.arc(50,80,10,0,Math.PI)
  ctx.quadraticCurveTo(40,50,30,40)
  ctx.fillStyle = "#b1b1b1"
  ctx.strokeStyle = "rgb(118,113,108)"
  ctx.shadowColor = "#ccc";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 1;
  ctx.lineWidth = 1;
  ctx.fill()
}

function initCanvas(obj){
  var ctx = obj.getContext("2d")
  ctx.fillStyle = "#fffbfc"
  ctx.strokeStyle = "#fffbfc"
}


function dropCream1(canvas, ht){
  if(ht > 0 && ht < 6000){
    var def = {
      topX: 15,
      topY: 15,  // do not change
      topR: 15,
      height: ht/200,
      botR: 7
    }
    // dropLayer(obj, passedTime, 160)
    // drawEdge($("#myCanvas")[0])
    drawCream(canvas, def)
  }
}

function dropCandles(time){
  if(time > 0 && time < 2000){
    var obj = $("#candles")[0]
    obj.style.display = "block";
    dropLayer(obj, time, 90)
    drawCandle($("#canvas-candle")[0])
  }
}



function drawCream(obj, def){
  // if(def.height < 10) def.height = 10
  var ctx = obj.getContext("2d")
  ctx.beginPath()
  // ctx.arc(def.topX, def.topY, def.topR, - Math.PI, 0)
  ctx.moveTo(def.topX-def.topR, def.topY)
  ctx.lineTo(def.topX+def.topR, def.topY)
  ctx.quadraticCurveTo(def.topX+def.topR/2, def.topY+def.height/4, def.topX+def.botR, def.topY+def.height)
  ctx.arc(def.topX, def.topY+def.height, def.botR, 0,Math.PI)
  ctx.quadraticCurveTo(def.topX-def.topR/2, def.topY+def.height/4, def.topX-def.topR, def.topY)
  // ctx.fillStyle = "#fffbfc"
  ctx.fill()
}

function drawEdge(obj, def){
  var ctx = obj.getContext("2d")
  var def = {
    width: 100,
    y: 20,  // changing in animation
    ht: 10,
    num: 3
  }
  let dir = -1
  let intval = def.width/(def.num * 2)
  let x = def.width+intval/2
  ctx.beginPath()
  ctx.moveTo(0, def.y-def.ht)
  ctx.lineTo(def.width, def.y-def.ht)
  ctx.lineTo(def.width+intval/2, def.y)
  for(let i = 0; i < def.num*2+1; i++){
    ctx.quadraticCurveTo(x-intval/2, def.y+def.ht*dir, x-intval, def.y)
    x = x-intval
    dir *= -1
  }
  ctx.lineTo(0, def.y-def.ht)
  ctx.closePath();
  ctx.fill()
}

// function candle(time){
//   if(time > 0 && time < 2000){
//     var obj = $("#candles")[0]
//     obj.style.display = "block";
//     draws($("#canvas-candle")[0])
//   }
// }


function drawCandle(canvas){
  var def = {
    topX: 50,
    topY: 0,
    wd: 3,
    ht: 40,
    color:"#655622",
    sc:"#aafbfc",
    snum: 3
  }
  // draw candle body
  var ctx = canvas.getContext("2d")
  ctx.fillStyle = def.color
  ctx.beginPath()
  ctx.fillRect(def.topX,def.topY,def.wd,def.ht);
  ctx.lineWidth=1.5;
  ctx.strokeStyle = def.sc
  let d = def.ht / def.snum
  for(let x = 0; x < def.snum; x++){
    ctx.moveTo(def.topX+def.wd, def.topY+d*x)
    ctx.lineTo(def.topX, def.topY+d*(x+1))
    ctx.stroke()
  }
}

function showTitle(time){
  if(time > 0 && time < 2000){
    var title = $(".birthday-title")[0]
    title.style.opacity = (time / 2000.0)
  }
}
