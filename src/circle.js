var d3 = require('d3')

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
    var sum = list.reduce(($1,$2)=>$1+$2.data,0)
    var curRect = index => list.filter((data,dex)=>(dex<=index)).reduce(($1,$2)=>$1+$2.data,0)/sum;

    var arc = (index,radius) => {
      var startAngle = (index===0?0:curRect(index-1)) * Math.PI * 2
      var endAngle = curRect(index) * Math.PI * 2
      return d3.arc().padAngle(Math.PI/180)
        .innerRadius(0).outerRadius(radius||width*3/8)
        .cornerRadius(5).startAngle(startAngle).endAngle(endAngle)()
    }
    var ease = d3.easeBackOut

    svg.selectAll('path').data(list,(data,index)=>index)
      .enter().append('path')
        .style('fill',(data,index)=>colors[index%colors.length])
        .attr('d',(data,index)=>arc(index))
        .on('mouseover',function(e,index){
          d3.select(this).transition().duration(200).attr('d',()=>arc(index,width*3.5/8)).attr('transform','scale(1,1)')
        })
        .on('mouseout',function(e,index){
          d3.select(this).transition().duration(200).attr('d',()=>arc(index)).attr('transform','scale(1,1)')
        })
        .attr('transform','scale(.01,.01)')
        .transition().duration(500).ease(ease).delay((data,index)=>index*200).attr('transform','scale(1,1)')


  }

}
