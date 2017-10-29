var d3 = require('d3')

export default (content,width=800,height=500,duration=1000)=>{
  if(typeof(content)==='string'){
    content = document.querySelector(content)
  }

  var arg = []
  const maxLength = 7

  var svg = d3.select(content).append('svg')
      .attr('width',width)
      .attr('height',height)

  var d = []
  var padding = 50
  var y = d3.scale.linear()
      .range([height-2*padding,0])
      .domain([0,Math.max.apply(Math,d)])

  var yAxis = d3.svg.axis()
      .scale(y)
      .ticks(10)
      .orient('left')

  var pathy = svg.append('g')
      .attr('transform',`translate(${padding},${padding})`)
      .attr('stroke','#000')
      .attr('fill','transparent')
      .attr('class','axis-y')
      .call(yAxis)

  var x = d3.scale.linear()
      .range([padding+10,width-padding])
      .domain([0,5])

  var path = svg.append('path')
      .attr('class','line')
      .style('stroke','#000')
      .style('fill','none')

  return (argu)=>{

    arg.push(argu)
    argu.timeStamp = +new Date
    if(arg.length > maxLength){
      arg.shift()
    }

    y.domain([0,Math.max.apply(Math,arg.map(a=>a.data))])
    svg.transition().duration(duration).select('g.axis-y')
      .call(yAxis)
      .selectAll('text')
        .attr('fill','#000')
        .attr('stroke','transparent')

    x.domain([0,arg.length-1])

    var texts = svg.selectAll('text.th').data(arg,d=>d.timeStamp)
    var fontSize = 16
    var rectWidth = 50

    texts.enter().append('text')
      .attr('class','th')
      .style('font-size',fontSize)
      .attr('x',(d,index)=>x(index))
      .attr('y',d=>(height-padding))
      .text(d=>d.data)
      .transition()
      .duration(duration/2)
      .attr('y',d=>(y(d.data)+padding-fontSize/2))

    texts
      .transition()
      .duration(duration/2)
      .attr('y',d=>(y(d.data)+padding-fontSize/2))
      .attr('x',(d,index)=>x(index))

    texts.exit().remove()

    var circles = svg.selectAll('circle.cc').data(arg,d=>d.timeStamp)

    circles.enter().append('circle')
      .attr('class','cc')
      .attr('r',3)
      .attr('cx',(d,index)=>x(index)+5)
      .attr('cy',d=>(y(d.data)+padding))
      .style('stroke','#000')
      .style('fill','none')

    circles.transition()
      .attr('cy',d=>(y(d.data)+padding))
      .attr('cx',(d,index)=>x(index)+5)

    circles.exit().remove()

    var line = d3.svg.line()
      .x((d,index)=>x(index)+5)
      .y(d=>(y(d.data)+padding))

    path
      .transition()
      // .tween('transition',function(){
      //   var ele = d3.select(this)
      //   var d = d3.select(this).datum()||[]
      //   if(d.length===0){
      //     return t=>{}
      //   }
      //   var ar = []
      //   if(d.length<maxLength){
      //     for(var i=0;i<arg.length;i++){
      //       ar.push(arg[i].data-(d[i]&&d[i].data)||0)
      //     }
      //     return t=>{
      //       var da = Object.assign([],arg)
      //       for(var i=0;i<da.length;i++){
      //         da[i].data = ((d[i]&&d[i].data)||0)+t*ar[i]
      //       }
      //       ele.attr('d',d=>line(da))
      //     }
      //   }
      //
      //   for(var i=0;i<arg.length-1;i++){
      //     ar[i] = arg[i].data-d[i+1].data
      //   }
      //
      //   return (t)=>{
      //     var da = Object.assign([],arg)
      //     for(var i=0;i<ar.length;i++){
      //       da[i].data = d[i+1].data+t*ar[i]
      //     }
      //     ele.attr('d',d=>line(da))
      //   }
      // }).each('end',function(){
      //   d3.select(this).datum(arg)
      // })
      //.attr('d',d=>line(d))

  }
}
