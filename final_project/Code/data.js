var color_na = "lightgrey";
var quantiles = [0, 0.25, 0.5, 0.75, 1];
var init_year = 1990;
var headline = "Government expenditure on education in ";
var headline_2 = "Literacy rate in ";
var pect = "(% of GDP)";
var pect_2 = "(% of people ages 15-24)";


// slider
d3.select("body").insert("p", ":first-child").append("input")
    .attr("type", "range")
    .attr("min", "1990")
    .attr("max", "2016")
    .attr("value", init_year)
    .attr("id", "year");



d3.select("body").insert("h2", ":first-child").text(headline + init_year + pect)
  .attr("id", "myh1");

// init map container, projection
var width = 960, height = 425;
var svg_map = d3.select("body").insert("svg")
              .attr("id", "map")
              .attr("height", height)
              .attr("width", width)
              .style("fill","white");
var path = d3.geoPath(d3.geoRobinson());

// init legend container
svg_map.append("g")
    .attr("class", "legend");
svg_map.append("g")
    .attr("class", "legend_title")
    .append("text");

// init bars container
var margin = {top: 50, right:10, bottom:50, left:30};
var svgBarsWidth = 960 - margin.left - margin.right,
    svgBarsHeight = 200 - margin.top - margin.bottom;

var x = d3.scaleBand()
            .rangeRound([0, svgBarsWidth])
            .padding(.05);
var y = d3.scaleLinear().range([svgBarsHeight, 0]);

var svg_bars = d3.select("body")
    .append("svg")
      .attr("id", "bars")
      .attr("width", svgBarsWidth + margin.left + margin.right)
      .attr("height", svgBarsHeight + margin.top + margin.bottom)
    .append("g")
      .attr("class", "bars")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


// function getData(year){
//   var line = `/api/${year}`;
//   // vegaEmbed('#vis', line);

//   fetch(line)
//     .then(response => response.json())
//     .then(r => {console.log(r);});
// }

// load data and render
  var year = 1990;
  var url = `/api/${year}`;
  fetch(url)
    .then(response => response.json())
    .then(r => {
//       console.log(r);
      myinitmap(r)
    });


function myinitmap(data) {
  let color = calcColorScale(data);

  // read map
  d3.json("https://raw.githubusercontent.com/davidhhk1994/Data-Visualization/master/final_project/New_Dataset/world.json", function(error, worldmap) {
    if (error) throw error;

    // init map
    svg_map.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(topojson.feature(worldmap, worldmap.objects.world).features)
      .enter().append("path")
        .attr("d", path)
        .attr("id", function(d) { return d.id; })
        .call(fillMap, color, data, "svg#map")
      .append("title")
        .call(setPathTitle, data);


    // init legend
    renderLegend(color, data, "svg#map");
    renderBars(color, data, "svg#bars", 30);
  });
}


  // update map
  d3.select("#year").on("input", function() {

       var year = this.value;
       var url = `/api/${year}`;
       fetch(url)
        .then(response => response.json())
        .then(r => {
//           console.log(r);
          let upd_color = calcColorScale(r);
          updateMap(upd_color, r, "svg#map", "#year", headline, "h2#myh1", pect);
          renderLegend(upd_color, r, "svg#map");
          renderBars(upd_color, r, "svg#bars", 30);
       });


  });

// });


// second slider
d3.select("body").insert("h2").text(headline_2 + init_year + pect_2)
 .attr("id", "myh2")
 .style("fill","white");

d3.select("body").insert("p").append("input")
    .attr("type", "range")
    .attr("min", "1990")
    .attr("max", "2016")
    .attr("value", init_year)
    .attr("id", "year_2");




// init second map container, projection
var svg_map_2 = d3.select("body").insert("svg")
              .attr("id", "map_2")
              .attr("height", height)
              .attr("width", width);

// init legend container
svg_map_2.append("g")
    .attr("class", "legend")
    .style("fill","white");
svg_map_2.append("g")
    .attr("class", "legend_title")
    .append("text")
    .style("fill","white");

    // init bars container
var svg_bars_2 = d3.select("body")
    .append("svg")
      .attr("id", "bars_2")
      .attr("width", svgBarsWidth + margin.left + margin.right)
      .attr("height", svgBarsHeight + margin.top + margin.bottom)
    .append("g")
      .attr("class", "bars")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


// load data and render
  var year = 1990;
  var url = `/vis/${year}`;
  fetch(url)
    .then(response => response.json())
    .then(r => {
//       console.log(r);
      myinitmap_2(r)
    });


function myinitmap_2(data_2) {
  let color_2 = calcColorScale_2(data_2);

  // read map
  d3.json("https://raw.githubusercontent.com/davidhhk1994/Data-Visualization/master/final_project/New_Dataset/world.json", function(error, worldmap) {
    if (error) throw error;

    // init second map
    svg_map_2.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(topojson.feature(worldmap, worldmap.objects.world).features)
      .enter().append("path")
        .attr("d", path)
        .attr("id", function(d) { return d.id; })
        .call(fillMap, color_2, data_2, "svg#map_2")
      .append("title")
        .call(setPathTitle, data_2);

    // init legend
    renderLegend(color_2, data_2, "svg#map_2");
    renderBars(color_2, data_2, "svg#bars_2", 30);
  });
}



  // update second map
  d3.select("#year_2").on("input", function() {
       var year = this.value;
       var url = `/vis/${year}`;
       fetch(url)
        .then(response => response.json())
        .then(r => {
//           console.log(r);
             let upd_color_2 = calcColorScale_2(r);
             updateMap(upd_color_2, r, "svg#map_2", "#year_2", headline_2, "h2#myh2", pect_2);
             renderLegend(upd_color_2, r, "svg#map_2");
             renderBars(upd_color_2, r, "svg#bars_2", 30);
       });
  });

// });




function fillMap(selection, color, data, myid) {
selection
.attr("fill", function(d) { return typeof data[d.id] === 'undefined' ? color_na :
                                          d3.rgb(color(data[d.id])); });
}

function setPathTitle(selection, data) {
//   console.log(data)
selection
.text(function(d) { return "" + d.id + ", " +
                           (typeof data[d.id] === 'undefined' ? 'N/A' : data[d.id]); });
}

function updateMap(color, data, myid, yearid, myheadline, mytextid, mypect) {

d3.selectAll(myid + " path").transition()
.delay(100)
.call(fillMap, color, data);

d3.selectAll(myid + " path title")
.call(setPathTitle, data);

// update headline
d3.select(mytextid).text(myheadline + d3.select(yearid).node().value + mypect);
}

function renderLegend(color, data, myid) {

let svg_height = +d3.select(myid).attr("height");
let legend_items = pairQuantiles(color.domain());

let legend = d3.select(myid + " g.legend").selectAll("rect")
           .data(color.range());

legend.exit().remove();

legend.enter()
      .append("rect")
    .merge(legend)
      .attr("width", "20")
      .attr("height", "20")
      .attr("y", function(d, i) { return (svg_height-29) - 25*i; })
      .attr("x", 30)
      .attr("fill", function(d, i) { return d3.rgb(d); })
      .on("mouseover", function(d) { legendMouseOver(d, color, data, myid); })
      .on("mouseout", function() { legendMouseOut(color, data, myid); });

let text = d3.select(myid + " g.legend").selectAll("text");

text.data(legend_items)
.enter().append("text").merge(text)
  .attr("y", function(d, i) { return (svg_height-14) - 25*i; })
  .attr("x", 60)
  .text(function(d, i) { return d; });

d3.select(myid + " g.legend_title text")
    .text("Legend (Quarter ranges)")
    .attr("x", 30)
    .attr("y", 300)
    .attr("fill","white");
}

function renderBars(color, data, myid, loc) {
array = [];
for( let key of Object.keys(data) ) {
array.push({'id':key, 'value': data[key]});
}

array = sortArrObj(array, 'id');

x.domain(array.map(function(d) {return d.id;}));
y.domain([0, d3.max(Object.values(data), function(d) {return d;})]);

d3.select(myid + " g.axis").remove();
let axis = d3.select(myid).append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate("+ loc +"," + (svgBarsHeight+margin.top) + ")")
          .call(d3.axisBottom(x))
            .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)");

let bars = d3.select(myid + " g.bars").selectAll("rect").data(array);
bars.exit().remove();
bars.enter().append("rect")
    .merge(bars)
    .attr("fill", function(d) { return color(d.value); })
    .attr("x", function(d) { return x(d.id); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) {return svgBarsHeight - y(d.value); })
;

let annot = d3.select(myid + "g.bars").selectAll("text").data(array);
annot.exit().remove();
annot.enter().append("text")
    .merge(annot)
    .text(function(d) {return d3.format(",")(d.value);})
    .attr("class", "barlabel")
    .attr("x", function(d) { return x(d.id) + x.bandwidth()/2; })
    .attr("y", function(d) { return y(d.value) - 5; });
}

function calcColorScale(data) {

let data_values = Object.values(data).sort( function(a, b){ return a-b; });

quantiles_calc = quantiles.map( function(elem) {
              return Math.ceil(d3.quantile(data_values, elem));
});

let scale = d3.scaleQuantile()
          .domain(quantiles_calc)
          .range(d3.schemeRdPu[(quantiles_calc.length)-1]);

return scale;
}


function calcColorScale_2(data) {

let data_values = Object.values(data).sort( function(a, b){ return a-b; });

quantiles_calc = quantiles.map( function(elem) {
              return Math.ceil(d3.quantile(data_values, elem));
});

let scale = d3.scaleQuantile()
          .domain(quantiles_calc)
          .range(d3.schemeGreens[(quantiles_calc.length)-1]);

return scale;
}

function legendMouseOver(color_key, color, data, myid) {

d3.selectAll(myid + " path").interrupt();

d3.selectAll(myid + " path")
.call(fillMap, color, data, myid);

d3.selectAll(myid + " path:not([fill = '"+ d3.rgb(color_key) +"'])")
  .attr("fill", color_na);
}


function legendMouseOut(color, data, myid) {

d3.selectAll(myid + " path").transition()
.delay(100)
.call(fillMap, color, data, myid);
}

function sortArrObj(arr,sortkey) {

sorted_keys = arr.map( function(elem) {return elem[sortkey];}).sort();

newarr = [];
for(let key of sorted_keys){
for(i in arr){
  if(arr[i][sortkey] === key){
    newarr.push(arr[i]);
    continue;
  }
}
}

return newarr;
}

function pairQuantiles(arr) {

new_arr = [];
for (let i=0; i<arr.length-1; i++) {
if(i == arr.length-2) {
  new_arr.push([arr[i],  arr[i+1]]);
}
else {
  new_arr.push([arr[i], arr[i+1]-1]);
}
}

new_arr = new_arr.map(function(elem) { return elem[0] === elem[1] ?
d3.format(",")(elem[0]) :
d3.format(",")(elem[0]) + " - " + d3.format(",")(elem[1]);
});

return new_arr;
}
