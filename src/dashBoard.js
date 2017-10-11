var d3 =  require('d3')

export default (content,width=400,height=400,maxNum=100,unit='%',title='仪表盘示例')=>{
  if(typeof(content)==='string'){
    content = document.querySelector(content)
  }

  var svg = d3.select(content).append('svg')
      .attr('width',width)
      .attr('height',height)
      .append('g')
        .attr('transform',`translate(${width/2},${height/2})`)

  const pi = Math.PI,sin = Math.sin,cos = Math.cos
  const sr = -pi*3/4
  const st = pi/2
  const mn = 10
  const r = (width>height?height:width)/2


  var createRadian = (index,color) => svg.append('path')
      .attr('d',d3.arc().innerRadius(r-10)
          .outerRadius(r)
          .startAngle(sr+index*st)
          .endAngle(sr+(index+1)*st)
      )
      .attr('fill',color)

  var greyPath = createRadian(0,'grey')
  var greenPath = createRadian(1,'green')
  var redPath = createRadian(2,'red')

  for(var i=0;i<mn+1;i++){
    var corner = sr+st*3/(mn)*i-st
    svg.append('rect')
      .attr('width',10)
      .attr('height',3)
      .attr('fill','#000')
      .attr('x',(r-15)*cos(corner))
      .attr('y',(r-15)*sin(corner))
      .style('transform',`rotate(${corner/pi*180-180}deg)`)
      .style('transform-origin','50% 50%')
  }

}
