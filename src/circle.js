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

  
  const SIN = Math.sin;
  const COS = Math.cos;
  let angleArr=[];

  return (list)=>{
    angleArr = [];
    
    // list => [{title:"标题",data:123}]

    const RADIUS = width*3/8
    var sum = list.reduce(($1,$2)=>$1+$2.data,0)
    var curRect = index => list.filter((data,dex)=>{return (dex<=index)}).reduce(($1,$2)=>$1+$2.data,0)/sum;

    var arc = (index,radius) => {

      // console.log(index);
      var startAngle = (index===0?0:curRect(index-1)) * Math.PI * 2
      var endAngle = curRect(index) * Math.PI * 2

      if(angleArr.length<list.length){
        angleArr.push((Math.PI - endAngle-startAngle)/2);
      }

      return d3.svg.arc().padAngle(Math.PI/180)
        .innerRadius(0).outerRadius(radius||RADIUS)
        .cornerRadius(5).startAngle(startAngle).endAngle(endAngle)()
    }

    var ease = d3.ease('sin')

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
    var g_data = svg.selectAll('g').data(list,(data,index)=>index)
    var g = g_data.enter().append('g')


    // text
    var text = g.append('text')
    .data(list,(data,index)=>index)
    .attr('x',(data,index)=>{return arcText(index)[0]})
    .attr('y',(data,index)=>{return arcText(index)[1]})
    .attr('transform',(data,index)=>{return `rotate(${arcText(index)[2]*180/Math.PI},${arcText(index)[0]},${arcText(index)[1]})`})

    text.append('tspan').html((data,index)=>{return data.title}).attr('dx',0)
    text.append('tspan').html((data,index)=>{return data.data}).attr('dx',(data,index)=>{return -12*data.title.length;}).attr('dy',15)


    // arc
    g.append('path')
    .style('fill',(data,index)=>colors[index%colors.length])
    // .attr('d',(data,index)=>{ return arc(index)})  下面还有一次arc(index) 不能设两次

    // - mouse event
    g.each(function(e,i){
      var _this = d3.select(this);
      var ang = angleArr[i];

      _this.on('mouseenter',function(){
        _this.transition().duration(200).ease(ease).attr('transform','translate('+COS(ang)*10+','+(-SIN(ang)*10)+')')
    
      })

      _this.on('mouseleave',function(){
        _this.transition().duration(200).ease(ease).attr('transform','translate(0,0)')
      })

    })

    g.attr('transform','scale(.01,.01)')
    .transition().duration(500).delay((data,index)=>index*100).ease(ease).attr('transform','scale(1,1)')



    var g_data_transition = g_data.transition().duration(1000).attr('transform','scale(1,1)');
    g_data_transition.select('path').attr('d',(data,index)=>{return arc(index)})
    
    g_data_transition.select('text')
    .attr('x',(data,index)=>{return arcText(index)[0]})
    .attr('y',(data,index)=>{return arcText(index)[1]})
    .attr('transform',(data,index)=>{return `rotate(${arcText(index)[2]*180/Math.PI},${arcText(index)[0]},${arcText(index)[1]})`})

    g_data.each(function(e,i){
      var _this = d3.select(this);
      var ang = angleArr[i];

      _this.on('mouseenter',function(){
        _this.transition().duration(200).ease(ease).attr('transform','translate('+COS(ang)*10+','+(-SIN(ang)*10)+')')
      })

      _this.on('mouseleave',function(){
        _this.transition().duration(200).ease(ease).attr('transform','translate(0,0)')
      })
    })

    g_data.exit().transition().attr('transform','scale(0,0)').each('end',function(){
      d3.select(this).remove()
    })



    // 文字变化
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
