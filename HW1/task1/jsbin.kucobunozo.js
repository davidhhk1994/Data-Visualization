function processing (item) {
  var D = item.DroppedOut / item.Total
  var A = item.Advanced / item.Total
  var yr = item.Cohort
  return [A,D,yr]
}
var selected = grads.filter(function(record) {
	return record.Cohort == "2002" ||
           record.Cohort == "2004" ||
           record.Cohort == "2006";
}).slice(0,15);
var results = selected.map(processing);

//console.log(results);

var chart = document.getElementById("chart");
function addElementSVG(parent, name, props={}) {
  let svgNamespace = "http://www.w3.org/2000/svg";
  var element = 
document.createElementNS(svgNamespace, name);
  for (var key in props) {
    element.setAttributeNS(null, key, props[key]);
  }
  parent.appendChild(element);
  return element;
}
var canvas = addElementSVG(chart, "svg", {
  "width": "350",
  "height": "400",
  "style": "background-color: white;"
});
cmap = {"2002":"SteelBlue", "2004":"SeaGreen", "2006":"IndianRed"};
addElementSVG(canvas, 
              "text", {"x":60, "y":15}).textContent = 
  "NYC High School Graduate Statistics";

results.forEach(function(d, i){
 var circle = addElementSVG(canvas, "circle", {
 "cx":d[0]*1000, "cy":300-d[1]*1000, r:"5", 
   "stroke":"black", "stroke-width":"2",
   "fill": cmap[d[2]],});});

addElementSVG(canvas, "rect", 
              {"x":260, "y":30, 
               "width":90, "height":90,
               "fill":"lightgrey","stroke":"black", 
               "stroke-width":"1",});
addElementSVG(canvas, "rect", 
              {"x":270, "y":35, 
               "width":15, "height":15,
               "fill":"SteelBlue","stroke":"black", 
               "stroke-width":"0.5",});
addElementSVG(canvas, "rect", 
              {"x":270, "y":67, 
               "width":15, "height":15,
               "fill":"SeaGreen","stroke":"black", 
               "stroke-width":"0.5",});
addElementSVG(canvas, "rect", 
              {"x":270, "y":100, 
               "width":15, "height":15,
               "fill":"IndianRed","stroke":"black", 
               "stroke-width":"0.5",});

addElementSVG(canvas, "text", 
              {"x":300, "y":47}).textContent = "2002";
addElementSVG(canvas, "text", 
              {"x":300, "y":79}).textContent = "2004";
addElementSVG(canvas, "text", 
              {"x":300, "y":112}).textContent = "2006";

addElementSVG(canvas, "line", 
              {"x1":55, "y1":260, "x2":300, "y2": 260, "stroke":"black", 
               "stroke-width":"1",}); //drawing x axis

addElementSVG(canvas, "line", 
              {"x1":55, "y1":40, "x2":55, "y2": 260, "stroke":"black", 
               "stroke-width":"1",}); //drawing y axis
addElementSVG(canvas, "text", 
              {"x":100, "y":320}).textContent = "Advanced Regents(%)";//add x axis label
addElementSVG(canvas, "text", 
              {"x":-200, "y":20, "transform":"rotate(-90)"}).textContent = 
  "Dropped Out(%)"; // add y axis label


for (i = 0; i < 5; i++) {
    addElementSVG(canvas, "line", 
              {"x1":50, "y1":230 -i*36, "x2":55, "y2": 230 -i*36, "stroke":"black", 
               "stroke-width":"1",}); 
  addElementSVG(canvas, "text", 
              {"x":35, "y":233-i*36, "font-size":12}).textContent = 5*(i+1)+"%";
}//drawing y ticks

for (i = 0; i < 5; i++) {
addElementSVG(canvas, "line", 
              {"x1":61+i*50, "y1":267, "x2":61+i*50, "y2": 260, "stroke":"black", 
               "stroke-width":"0.8",}); 
  addElementSVG(canvas, "text", 
              {"x":58+i*50, "y":276, "font-size":12}).textContent = 5*(i+1)+"%";
}//drawing x ticks