var d3 = require('d3')

export default (content,width=800,height=500)=>{
  if(typeof(content)==='string'){
    content = document.querySelector(content)
  }

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

  var x = d3.scale.ordinal()
      .rangePoints([0,width-padding*2])
      .domain(['0','1'])

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')

  var pathx = svg.append('g')
      .attr('transform',`translate(${padding},${height-padding})`)
      .attr('class','axis-x')
      .attr('fill','transparent')
      .attr('stroke','#000')
      .call(xAxis)

  return (arg)=>{
    y.domain([0,Math.max.apply(Math,arg.map(a=>a.data))])
    svg.transition().duration(500).select('g.axis-y')
      .call(yAxis)
      .selectAll('text')
        .attr('fill','#000')
        .attr('stroke','transparent')

    x.domain(['0'].concat(arg.map(a=>a.title)))
    svg.select('g.axis-x').call(xAxis).selectAll('text')
      .attr('fill','#000')
      .attr('stroke','transparent')

      

  }
}
