// // use d3 to read in samples.json
//  d3.json("samples.json").then((samples)=> {
//   console.log(samples)
// });

// Use D3 to create an event handler
d3.selectAll("body").on("change", updatePage);

//this will display the id and the value of the drop down menu. 
function updatePage() {
  // Use d3 to read in samples.json
  d3.json('samples.json').then((data)=> {
  // Use d3 to select the dropdown menu
  var dropdownMenu = d3.selectAll("#selDataset"); //# means id // . means class
  //use forEach grab the names key 
  data['names'].forEach((id_num)=> {
  //append (the name text to value name in the dropdown menu)
    dropdownMenu.append('option').text(id_num).property('value', id_num);	//.text method grab (name text)
  
  var id_num=dropdownMenu.property('value'); 
  console.log(id_num); //gives you the first id value (940)
  //grab the remaining keys inside of dict
  var metadata=data['metadata']; 
  // console.log(metadata) //metadata is a list of dictionaries
  var samples= data['samples'];
  console.log(samples) //samples is a list of dictionaries
  //use filter to grab the sample.id equal to the id.num and convert to string
  var cur_sample=samples.filter(sample=>sample.id==id_num.toString()) 
  console.log(cur_sample);
  var otu
  });
  });
}

updatePage();

///////
// // function init() {
//  d3.json("samples.json").then((data)=> {
//  	//Grab values from json object to build the plot
//   var dropdown=d3.select('#selDataset');
//   var data= data;
//   // console.log(dropdown);
//   // console.log(data);
//   var names= data['names'];
//   names.ForEach()

// });

//  	var samples =
//  	var otu_top_ten=(samples.otu_id.slice(0,10)).reverse();

// 	console.log(samples);
// 	console.log(otu_top_ten);

// });
// // var data = [trace1];
// d3.json("samples.json").then(function(data) {
//   var otu_ids= data.samples.otu_ids;
//   console.log(otu_ids)
// });
// }

///Can't run forEach below:
// function updatePage() {
//   // Use d3 to select the dropdown menu
//   var dropdownMenu = d3.selectAll("#selDataset");
//   // Use d3 to read in samples.json
//   d3.json('samples.json').then((samples)=> {
//    //use forEach grab the names key 
//    samples['samples'][0]['id'].forEach((id)=> {
//      //append (the name text to value name in the dropdown menu)
//      dropdownMenu.append('option').text(id).property('value', id); 
//    });
//   });

// }


// var data= Object.values(samples['otu_ids']);
// console.log(data);

// function init() {
//   var trace= {
//     'type' = 'bar',
//     'values'= data
//   };

//   Plotly.newPlot('bar', [trace]);

// d3.select('#selDataset').on('change', updatePlot)

// function updatePlot() {

// }
// init();



// };
