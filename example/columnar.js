import chart from '../src'

var update = chart.createColumnar('#content',800,500)

window.setTimeout(()=>{
  update([
    {title:"数据1",data:100},
    {title:"数据2",data:200},
    {title:"数据3",data:300},
    {title:"数据4",data:400},
    {title:"数据5",data:250},
    {title:"数据6",data:300}
  ])  
},1000)
