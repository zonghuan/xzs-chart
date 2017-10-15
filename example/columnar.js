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

window.setTimeout(()=>{

  update([
    {title:"数据1",data:1000},
    {title:"数据2",data:2300},
    {title:"数据3",data:300},
    {title:"数据4",data:400},
    {title:"数据5",data:250},
    {title:"数据6",data:300},
    {title:'数据7',data:700}
  ])

},2000)

window.setTimeout(()=>{

  update([
    {title:"数据11",data:1500},
    {title:"数据21",data:2200},
    {title:"数据6",data:1900},
    {title:"数据8",data:600},
    {title:"数据5",data:250},
    {title:"数据6",data:300}
  ])

},3000)
