import * as d3 from "d3"

export default (dom,width=400,height=400) => {
  if(typeof(dom)==='string'){
    dom = document.querySelector(dom)
  }
  var wrap = document.createElement('div')
  dom.appendChild(wrap)
  var svg = d3.select(wrap).style('position','relative')
    .append('svg')
    .attr('width',width).attr('height',height)
    .append('g')
    .attr('transform',`translate(${width/2},${height/2})`)
  var colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

  return (list)=>{

    // list => [{title:"标题",data:123}]
    const RADIUS = width*3/8
    var sum = list.reduce(($1,$2)=>$1+$2.data,0)
    var curRect = index => list.filter((data,dex)=>(dex<=index)).reduce(($1,$2)=>$1+$2.data,0)/sum;
    var arc = (index,radius) => {
      var startAngle = (index===0?0:curRect(index-1)) * Math.PI * 2
      var endAngle = curRect(index) * Math.PI * 2
      return d3.arc().padAngle(Math.PI/180)
        .innerRadius(0).outerRadius(radius||RADIUS)
        .cornerRadius(5).startAngle(startAngle).endAngle(endAngle)()
    }
    var ease = d3.easeBackOut
    var arcText = (index,radius) => {
      var r = radius||RADIUS+25
      var startAngle = (index===0?0:curRect(index-1)) * Math.PI * 2
      var endAngle = curRect(index) * Math.PI * 2
      var centerAngle = (endAngle + startAngle)/2
      var x = r*Math.sin(centerAngle)
      var y = -r*Math.cos(centerAngle)
      return [x,y,centerAngle]
    }

    // 图案变化
    var path = svg.selectAll('path').data(list,(data,index)=>index)
    path.enter().append('path')
        .style('fill',(data,index)=>colors[index%colors.length])
        .attr('d',(data,index)=>arc(index))
        .attr('transform','scale(.01,.01)')
        .transition().duration(500).ease(ease).delay((data,index)=>index*100).attr('transform','scale(1,1)')
    path.transition().duration(1000).attr('d',(data,index)=>arc(index)).attr('transform','scale(1,1)')
    path.exit().transition().style('transform','scale(0,0)').remove()

    // 文字变化
    var text = svg.selectAll('text').data(list,(data,index)=>index)
    text.enter()
      .append('text')
      .each(function(d,index){
        var pix = arcText(index)
        var p = d3.select(this)
          .attr('x',pix[0])
          .attr('y',pix[1])
          .attr('transform',`rotate(${pix[2]*180/Math.PI},${pix[0]},${pix[1]})`)
        p.append('tspan').html(d.title).attr('dx',0)
        p.append('tspan').html(d.data).attr('dx',-12*d.title.length).attr('dy',15)
      })

    text.each(function(d,index){
      var pix = arcText(index)
      d3.select(this)
        .transition()
        .duration(1000)
        .attr('x',pix[0])
        .attr('y',pix[1])
        .attr('transform',`rotate(${pix[2]*180/Math.PI},${pix[0]},${pix[1]})`)
    });

    text.exit().remove()

  }

}
