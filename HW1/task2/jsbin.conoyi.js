//task2
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

console.log(selected)

var svg = d3.select("svg");
var g = svg.append("g");

var Max_A = Math.max(...results
                     .map(function(d){return d[0];}));
var Max_D = Math.max(...results
                     .map(function(d){return d[1];}));

var formatPercent = d3.format(",.0%");

//drawing x axis
var xScale = d3.scaleLinear()
    .domain([0,0.25])
    .range([10,400]);
var xAxis = d3.axisBottom();
xAxis.scale(xScale)
     .ticks(5)
     .tickFormat(formatPercent);
svg.append("g")
    .attr("transform", "translate(30, 400)")
    .call(xAxis);  

//drawing y axis
var yScale = d3.scaleLinear()
    .domain([0,0.25])
    .range([350,0]);
var yAxis = d3.axisLeft();
yAxis.scale(yScale)
     .ticks(5)
     .tickFormat(formatPercent);
svg.append("g")
    .attr("transform", "translate(40, 50)")
    .call(yAxis);

// Define the div for the tooltip
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

//plotting the dots
var color = {"2002":"SteelBlue", "2004":"SeaGreen", "2006":"IndianRed"};
g.selectAll("circle")
  .data(selected)
  .enter()
    .append('circle')
    .attr('class', 'circle')
    .attr('cx', function(d,i) {return (d.Advanced/d.Total)*1500+25;})
    .attr('cy', function(d,i) {return 450-(d.DroppedOut/d.Total)*1600;})
    .attr('r', 6)
    .attr('fill',function(d,i) {return color[d.Cohort];})
    .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", 0.9);		
            div	.html("Advanced:" + d.Advanced + "<br/>" + 
                      "Borough:" + d.Borough+ "<br/>" +
                      "Cohort:" + d.Cohort + "<br/>" +
                      "DroppedOut:" + d.DroppedOut + "<br/>" +
                      "Grads:" + d.Grads + "<br/>" +
                      "Local:" + d.Local + "<br/>" + 
                      "Regents:" + d.Regents + "<br/>" + 
                      "Total:" + d.Total + "<br/>" + 
                      "Type:" + d.Type)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

// adding axis labels
g.append("text")      // text label for the x axis
        .attr("x", 225 )
        .attr("y", 440 )
        .style("text-anchor", "middle")
        .text("Advanced Regents (%)");

g.append("text")      // text label for the y axis
        .attr("x", -215 )
        .attr("y", 10 )
        .style("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Dropped Out (%)");

//adding chart title
g.append("text")
        .attr("x", 239 )             
        .attr("y", 40)
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .text("NYC High School Gradute Statistics");

//adding legends

g.append("rect")
 .attr("x", 340)
 .attr("y", 50)
 .attr("width", 100)
 .attr("height", 100)
 .attr("fill", "lightgrey")
 .attr("stroke", "black")
 .attr("stroke-width", "1");
 
g.append("rect")
 .attr("x", 350)
 .attr("y", 56)
 .attr("width", 20)
 .attr("height", 20)
 .attr("fill", "SteelBlue")
 .attr("stroke", "black")
 .attr("stroke-width", "1");

g.append("rect")
 .attr("x", 350)
 .attr("y", 90)
 .attr("width", 20)
 .attr("height", 20)
 .attr("fill", "SeaGreen")
 .attr("stroke", "black")
 .attr("stroke-width", "1");

g.append("rect")
 .attr("x", 350)
 .attr("y", 123)
 .attr("width", 20)
 .attr("height", 20)
 .attr("fill", "IndianRed")
 .attr("stroke", "black")
 .attr("stroke-width", "1");

g.append("text")
        .attr("x", 392)
        .attr("y", 72)
        .attr("font-size", "16px")
        .text("2002");

g.append("text")
        .attr("x", 392)
        .attr("y", 104)
        .attr("font-size", "16px")
        .text("2004");

g.append("text")
        .attr("x", 392)
        .attr("y", 137)
        .attr("font-size", "16px")
        .text("2006");