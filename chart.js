!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("d3"));else if("function"==typeof define&&define.amd)define(["d3"],e);else{var r=e("object"==typeof exports?require("d3"):t.d3);for(var a in r)("object"==typeof exports?exports:t)[a]=r[a]}}(this,function(t){return function(t){function e(a){if(r[a])return r[a].exports;var n=r[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,a){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(e,r){e.exports=t},function(t,e,r){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.default={createCircle:a(r(2)).default,createLine:a(r(3)).default,createDashBoard:a(r(4)).default}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(0),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}(a);e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:400,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:400;"string"==typeof t&&(t=document.querySelector(t));var a=document.createElement("div");t.appendChild(a);var o=n.select(a).style("position","relative").append("svg").attr("width",e).attr("height",r).append("g").attr("transform","translate("+e/2+","+r/2+")"),i=["#98abc5","#8a89a6","#7b6888","#6b486b","#a05d56","#d0743c","#ff8c00"];return function(t){var r=3*e/8,a=t.reduce(function(t,e){return t+e.data},0),l=function(e){return t.filter(function(t,r){return e>=r}).reduce(function(t,e){return t+e.data},0)/a},s=function(t,e){var a=(0===t?0:l(t-1))*Math.PI*2,o=l(t)*Math.PI*2;return n.arc().padAngle(Math.PI/180).innerRadius(0).outerRadius(e||r).cornerRadius(5).startAngle(a).endAngle(o)()},u=n.easeBackOut,d=function(t,e){var a=e||r+25,n=(0===t?0:l(t-1))*Math.PI*2,o=l(t)*Math.PI*2,i=(o+n)/2;return[a*Math.sin(i),-a*Math.cos(i),i]},f=o.selectAll("path").data(t,function(t,e){return e});f.enter().append("path").style("fill",function(t,e){return i[e%7]}).attr("d",function(t,e){return s(e)}).attr("transform","scale(.01,.01)").transition().duration(500).ease(u).delay(function(t,e){return 100*e}).attr("transform","scale(1,1)"),f.transition().duration(1e3).attr("d",function(t,e){return s(e)}).attr("transform","scale(1,1)"),f.exit().transition().style("transform","scale(0,0)").remove();var c=o.selectAll("text").data(t,function(t,e){return e});c.enter().append("text").each(function(t,e){var r=d(e),a=n.select(this).attr("x",r[0]).attr("y",r[1]).attr("transform","rotate("+180*r[2]/Math.PI+","+r[0]+","+r[1]+")");a.append("tspan").html(t.title).attr("dx",0),a.append("tspan").html(t.data).attr("dx",-12*t.title.length).attr("dy",15)}),c.each(function(t,e){var r=d(e);n.select(this).transition().duration(1e3).attr("x",r[0]).attr("y",r[1]).attr("transform","rotate("+180*r[2]/Math.PI+","+r[0]+","+r[1]+")")}),c.exit().remove()}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(0),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}(a);e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:400,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:400,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1e3;"string"==typeof t&&(t=document.querySelector(t));var o=[],i=n.select(t).append("svg").attr("width",e).attr("height",r),l=[];i.append("defs").append("clipPath").attr("id","clip").append("rect").attr("x",30).attr("y",30).attr("width",e-30).attr("height",r-30);var s=function(t){return n.axisLeft(n.scaleLinear().domain([0,t]).range([r-60,30]))},u=function(t){return i.append("g").attr("class","axis-y").attr("transform","translate(30,30)").call(t)};u(s(Math.max.apply(Math,l)));var d=n.scaleLinear().domain([0,5]).range([30,e]),f=i.append("g").attr("clip-path","url(#clip)").append("path").attr("class","line-path").style("fill","transparent").style("stroke","#000").attr("transform","translate(0,30)");return function(t){o.push(t);var e=Math.max.apply(Math,o.map(function(t){return t.data})),l=n.scaleLinear().domain([0,e]).range([r-60,30]);i.select(".axis-y").remove(),u(s(e));var c=n.line().x(function(t,e){return d(e)}).y(function(t){return l(t.data)}),p=7>o.length?0:d(0)-d(1);f.attr("d",c(o)).attr("transform","translate(0,30)").transition().ease(n.easeLinear).duration(a-50).attr("transform","translate("+p+",30)").on("end",function(){0!==p&&(o.shift(),n.select(void 0).datum(o).attr("d",c).attr("transform","translate(0,30)"))})}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(0),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}(a);e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:400,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:400,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:100,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"%",i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"仪表盘示例",l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:1e3;"string"==typeof t&&(t=document.querySelector(t));for(var s=n.select(t).append("svg").attr("width",e).attr("height",r).append("g").attr("transform","translate("+e/2+","+r/2+")"),u=Math.PI,d=Math.sin,f=Math.cos,c=3*-u/4,p=u/2,h=(e>r?r:e)/2,v=function(t,e){s.append("path").attr("d",n.arc().innerRadius(h-10).outerRadius(h).startAngle(c+t*p).endAngle(c+(t+1)*p)).attr("fill",e)},y=function(t){return t>6?"red":t>3?"green":"grey"},g=0;11>g;g++){for(var m=c+3*p/10*g-p,x=0;5>x&&10!==g;x++){var M=m+3*p/10/5*x;s.append("rect").attr("width",5).attr("height",1.5).attr("fill",y(g)).attr("x",(h-13)*f(M)-2.5).attr("y",(h-13)*d(M)-1).style("transform","rotate("+M/u*180+"deg)").style("transform-origin","50% 50%")}s.append("rect").attr("width",10).attr("height",3).attr("fill",y(g)).attr("x",(h-14)*f(m)-5).attr("y",(h-14)*d(m)-3).style("transform","rotate("+m/u*180+"deg)").style("transform-origin","50% 50%")}v(0,"grey"),v(1,"green"),v(2,"red");var b=s.append("text").text("0"+o).attr("y",h/2).attr("dx",-(o.length+1)/2*50).style("font-size",50);s.append("text").text(i).attr("y",-h/2).attr("dx",-i.length/2*30).style("font-size",30).style("color","green");var P=s.append("g");return P.append("polygon").attr("points","0,-10 15,0 0,150 -15,0").attr("fill","green").attr("stroke","#000"),P.append("circle").attr("x",0).attr("y",0).attr("r",5).attr("fill","#fff").attr("stroke","#000"),P.style("transform","rotate(0deg)").style("transition","all "+l/1e3+"s ease-in-out 0s"),function(t){0>t&&(t=0),t>100&&(t=100),P.style("transform","rotate("+(45+270*t/a)+"deg)"),b.transition().duration(l).tween("transform",function(e,r){var e=n.select(this),a=parseInt(e.text().replace(/\D/g,""));return function(r){e.text(parseInt(a+(t-a)*r)+o)}})}}}])});