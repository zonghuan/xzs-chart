import chart from '../src'

var update = chart.createCircle('#content',500,500)

update([
  {title:"数据1数据1",data:100},
  {title:"数据2",data:200},
  {title:"数据3",data:300},
  {title:"数据4",data:400},
  {title:"数据5",data:250},
  {title:"数据6",data:300}
])

window.setTimeout(()=>{
  update([
    {title:"数据1",data:150},
    {title:"数据2",data:660},
    {title:"数据3",data:300},
    {title:"数据4",data:460},
    {title:"数据5",data:150},
    {title:'数据6',data:300},
    {title:'数据7',data:500}
  ])
},2000)

window.setTimeout(()=>{
  update([
    {title:"数据1",data:150},
    {title:"数据2",data:660},
    {title:"数据3",data:300},
    {title:"数据4",data:460},
    {title:"数据5",data:150}
  ])
},4000)
