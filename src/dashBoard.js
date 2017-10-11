var d3 =  require('d3')

export default (content,width=400,height=400,maxNum=100,unit='',title='仪表盘示例')=>{
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


  var createRadian = (index,color) => {
    svg.append('path')
      .attr('d',d3.arc().innerRadius(r-10)
          .outerRadius(r)
          .startAngle(sr+index*st)
          .endAngle(sr+(index+1)*st)
      )
      .attr('fill',color)
  }

  var d = 10
  var selectColor = (i)=>{
    if(i>6){
      return 'red'
    }
    if(i>3){
      return 'green'
    }
    return 'grey'
  }
  // 添加刻度
  for(var i=0;i<d+1;i++){
    var corner = sr+st*3/d*i-st
    var smn = 5
    for(var j=0;j<smn;j++){
      if(i===d){
        break;
      }
      var sc = corner + st*3/10/smn*j
      svg.append('rect')
        .attr('width',5)
        .attr('height',1.5)
        .attr('fill',selectColor(i))
        .attr('x',(r-13)*cos(sc)-2.5)
        .attr('y',(r-13)*sin(sc)-1)
        .style('transform',`rotate(${sc/pi*180}deg)`)
        .style('transform-origin','50% 50%')
    }

    svg.append('rect')
      .attr('width',10)
      .attr('height',3)
      .attr('fill',selectColor(i))
      .attr('x',(r-14)*cos(corner)-5)
      .attr('y',(r-14)*sin(corner)-3)
      .style('transform',`rotate(${corner/pi*180}deg)`)
      .style('transform-origin','50% 50%')

    // var text = maxNum/d*i+unit
    // var fontSize = 14
    // svg.append('text')
    //   .attr('fill','#000')
    //   .attr('font-size',fontSize)
    //   .attr('x',(r-25)*cos(corner)+10)
    //   .attr('y',(r-25)*sin(corner)+15)
    //   .attr('dx',-text.length/2*fontSize)
    //   .attr('dy',-fontSize/2)
    //   .text(text)
  }

  // 添加圆弧
  createRadian(0,'grey')
  createRadian(1,'green')
  createRadian(2,'red')

  //添加指针

  return ()=>{

  }

}
