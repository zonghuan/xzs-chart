var d3 = require('d3')
export default (dom,width=400,height=400,duration=1000)=>{

  if(typeof(dom)==='string'){
    dom = document.querySelector(dom)
  }
  var dataLink = []
  var length = 6
  var padding = 30
  var svg = d3.select(dom)
      .append('svg')
      .attr('width',width)
      .attr('height',height)

  var initData = []

  // 定义裁剪区域
  svg.append('defs')
    .append('clipPath').attr('id','clip')
      .append('rect')
      .attr('x',padding)
      .attr('y',padding)
      .attr('width',width-padding)
      .attr('height',height-padding)

  var createAxisY = domain => (
    d3.axisLeft(
      d3.scaleLinear()
        .domain([0,domain])
        .range([height-padding*2,padding])
    )
  )

  var createAxisYg = axisY => (
    svg.append('g')
      .attr('class','axis-y')
      .attr('transform',`translate(${padding},${padding})`)
      .call(axisY)
  )

  createAxisYg(createAxisY(Math.max.apply(Math,initData)))

  var x = d3.scaleLinear()
      .domain([0,length-1])
      .range([padding,width])

  var path = svg.append('g').attr('clip-path',"url(#clip)")
      .append('path')
      .attr('class','line-path')
      .style('fill','transparent')
      .style('stroke','#000')
      .attr('transform',`translate(0,${padding})`)

  return obj=>{

    dataLink.push(obj)

    // 左侧
    var domain = Math.max.apply(Math,dataLink.map(d=>d.data))
    var y = d3.scaleLinear()
      .domain([0,domain])
      .range([height-padding*2,padding])

    svg.select('.axis-y').remove()
    createAxisYg(createAxisY(domain))

    var line = d3.line()
        //.curve(d3.curveCardinal.tension(0.5))
        .x((d,index)=>x(index))
        .y(d=>y(d.data))

    var offsetx = dataLink.length<length+1?0:(x(0)-x(1))
    path.attr('d',line(dataLink))
      .attr('transform',`translate(0,${padding})`)
      .transition()
      .ease(d3.easeLinear)
      .duration(duration-50)
      .attr('transform',`translate(${offsetx},${padding})`)
      .on('end',()=>{
        if(offsetx===0){
          return
        }
        dataLink.shift()
        d3.select(this).datum(dataLink).attr('d',line).attr('transform',`translate(0,${padding})`)
      })

  }
}
