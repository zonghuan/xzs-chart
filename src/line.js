var d3 = require('d3')
export default (dom,width=400,height=400)=>{

  if(typeof(dom)==='string'){
    dom = document.querySelector(dom)
  }
  var dataLink = []
  var length = 6
  var padding = 10
  var svg = d3.select(dom)
      .append('svg')
      .attr('width',width)
      .attr('height',height)



  return obj=>{

    // obj => {title:"数据1",data:100}
    if(dataLink.length<length){
      for(var i=0;i<length-dataLink.length;i++){
        dataLink.push(obj)
      }
    }else{
      dataLink.push(obj)
      dataLink = dataLink.slice(dataLink.length-length,dataLink.length-1)
    }
    var y = d3
        .scaleLinear()
        .domain([0,Math.max.call(Math,dataLink)])
        .range([padding,height-padding])

    var x = d3.scaleLinear()
        .domain([0,dataLink.length])
        .range([padding,width-padding])


    // var axisX = svg.selectAll('g.axis-x')
    // axisX.enter()
    //   .append('g')
    //   .attr('class','axis-x')
    //   .call(d3.axisLeft(y))

  }
}
