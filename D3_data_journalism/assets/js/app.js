// @TODO: YOUR CODE HERE!
/** From 16.2 Ins_Loading_Data */
// Load data from hours-of-tv-watched.csv
d3.csv("./data.csv").then(function(censusData) {

    console.log(censusData);
  
    // log a list of names
    var state = censusData.map(data => data.state);
    console.log("state", state);
  
    // Cast each hours value in tvData as a number using the unary + operator
    censusData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      console.log("state:", data.state);
      console.log("Poverty:", data.poverty);
      console.log("Lack Healthcare:", data.healthcare);
    });
  }).catch(function(error) {
    console.log(error);
  });