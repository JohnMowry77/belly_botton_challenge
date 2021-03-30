// Use D3 to create an event handler
// d3.selectAll("body").on("change", updatePage);

//in javascript you can pass functions as a variable (see line 2: updatePage)


//this will display the id and the value of the drop down menu. 
function updatePage() {
  // Use d3 to select the dropdown menu
  var dropdownMenu = d3.selectAll("#selDataset");
  // Use d3 to read in samples.json
  d3.json('samples.json').then((samples)=> {
  	//use forEach grab the names key 
  	samples['names'].forEach((name)=> {
  		//append (the name text to value name in the dropdown menu)
  		dropdownMenu.append('option').text(name).property('value', name);	
  	});
  });

}

updatePage();
// function dropDown() {
// 	var dropdown = d3.selectAll("#selDataset").node();
// 	// d3.json("samples.json").then((samples)=> {

// 	// Use D3 to select the dropdown menu
// 	var namesDropDown = dropdown.names;
// 	// Assign the dropdown menu item ID to a variable
// 	var selectOption=dropdown.value;
// 	};
// 	console.log(selectOption);


// use d3 to read in samples.json
 d3.json("samples.json").then((samples)=> {
	console.log(samples)
});

// var data = [trace1];


