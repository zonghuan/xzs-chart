import chart from '../src'

var update = chart.createColumnar('#content',800,500)

// update([
//   {title:"数据11",data:1500},
//   {title:"数据21",data:2200},
//   {title:"数据6",data:1900},
//   {title:"数据8",data:600},
//   {title:"数据5",data:250},
//   {title:"数据6",data:300}
// ])

var d = [
  {title:"数据1",data:100},
  {title:"数据2",data:200},
  {title:"数据3",data:300},
  {title:"数据4",data:400},
  {title:"数据5",data:250},
  {title:"数据6",data:300}
]
var i = 6
var maxNum = 3000

window.setInterval(()=>{

  d.shift()
  d.push({title:`数据${i++}`,data:(maxNum*Math.random()).toFixed(2)})

  update(d)

},4000)
