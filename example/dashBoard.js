import chart from '../src'

var maxNum = 100
var update = chart.createDashBoard('#content',400,400,maxNum)

window.setInterval(()=>{
  update(parseInt(Math.random()*maxNum))
},2000)
