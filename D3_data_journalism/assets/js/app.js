// @TODO: YOUR CODE HERE!
/** From 16.3.9 from Activities */
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

/** From 16.2 Ins_Loading_Data */
// Load data from data.csv
d3.csv("./data.csv").then(function(censusData) {

        console.log(censusData);
    
        // log a list of names
        var state = censusData.map(data => data.state);
        console.log("state", state);

        var abbr = censusData.map(data => data.abbr);
        console.log("abbr", abbr);
    
        // Cast each value censusData as a number using the unary + operator
        censusData.forEach(function(data) {
            data.poverty = parseInt(data.poverty);
            data.healthcare = +parseInt(data.healthcare);
            console.log("state:", data.state, data.abbr);
            console.log("Poverty:", data.poverty);
            console.log("Lack Healthcare:", data.healthcare);
        });

        // Step 2: Create scale functions
        // ==============================
        var xLinearScale = d3.scaleLinear()
            .domain([8, d3.max(censusData, d => parseInt(d.poverty))])
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            .domain([2, d3.max(censusData, d => parseInt(d.healthcare))])
            .range([height, 0]);
        
        // Step 3: Create axis functions
        // ==============================
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Step 4: Append Axes to the chart
        // ==============================
        chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

        chartGroup.append("g")
        .call(leftAxis);

        // Step 5: Create Circles
        // ==============================
        var circlesGroup = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "lightblue")
        .attr("opacity", ".5")
        .text(d => d.abbr);

        // Create axes labels
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");

        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
        


    }).catch(function(error) {
        console.log(error);
    });

