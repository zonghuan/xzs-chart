import chart from '../src'

var update = chart.createLine(require('d3'),'#content',1000,500,1000)


var randomTitle = ()=>`数据${Math.round(Math.random()*10)}`
var randomData = ()=>Math.round(Math.random()*100)

window.setInterval(()=>{
  update({title:randomTitle(),data:randomData()})
},1000)
