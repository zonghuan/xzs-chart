var d3 = require('d3')
export default (dom,width=400,height=400)=>{

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

  var initData = [0,20,30,40,100]

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

    var x = d3.scaleLinear()
        .domain([0,dataLink.length])
        .range([padding,width-padding])

    svg.select('.axis-y').remove()
    createAxisYg(createAxisY(Math.max.apply(Math,dataLink.map(d=>d.data))))

  }
}
