# 动态数据图表库 - dc

## 前言

目前优秀的图表库非常多，比如eCharts、highChart等，但大多都是适合静态的数据展示。当面对需要持续更新数据的场景(比如监控数据、数据投屏面板)，大多采用重绘的方式，容易造成卡顿。开发dc的目的就是为了应对这种场景，使数据的切换更加的平滑、流畅。

## 安装

````
npm install xzs-chart

````

## 文档

### 1、饼图

#### chart.createCircle(dom,width,height)

初始化饼图。
* `dom`可以为`querySelector`，也可以是原生dom对象。
* `width`为图表宽度，默认`400`。
* `height`为图表高度，默认`400`。


#### update(data)

更新数据。
* `data`的形式为`[{title:'数据1',data:100}]`，`title`作为饼图的文本，并为数据的key，`data`是展示的数据

#### [实际效果](https://zonghuan.github.io/xzs-chart/dist/circle.html)


#### 代码示例

````
import chart from 'xzs-chart'


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



````

### 2、仪表盘

#### chart.createDashBoard(content,width,height,maxNum,unit,title,during)

初始化仪表盘

* `content` - `dom`可以为`querySelector`，也可以是原生dom对象。
* `width` : 图表宽度，默认400。
* `height` : 图表长度，默认400。`maxNum` : 最大值，默认100。
* `unit` : 数据单位，默认%。
* `title` : 图表的标题。
* `during` : 切换动画的持续时间


#### update(num)

* num - 更新的数据


#### [实际效果](https://zonghuan.github.io/xzs-chart/dist/dashBoard.html)

#### 代码示例

````
import chart from 'xzs-chart'

var maxNum = 100
var update = chart.createDashBoard('#content',400,400,maxNum)

window.setInterval(()=>{
  update(parseInt(Math.random()*maxNum))
},2000)


````
