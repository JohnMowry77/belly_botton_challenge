// // use d3 to read in samples.json
//  d3.json("samples.json").then((samples)=> {
//   console.log(samples)
// });

// Use D3 to create an event handler
// d3.selectAll("body").on("change", updatePage);

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
  });
});
}

updatePage();

  // var id_num=dropdownMenu.property('value'); 
  // console.log(id_num); //gives you the first id value (940)
  //grab the remaining keys inside of dict
  //use filter to grab the sample.id equal to the id.num and convert to string
  // var cur_sample=samples.filter(sample=>sample.id==id_num.toString()) 
  // console.log(cur_sample);

function buildPlot(sample_id){
  d3.json('samples.json').then((data)=>{
  //create a filter to pull the sample_id ????????FOLLOW UP NEEDED CHART NOT CHANGING
  //x=>x.id provides place holder to compare to sample_id
  var result_filter= data.samples.filter(x=>x.id==sample_id)[0]
  // console.log(sample_id)
  //data is an array of objects. use samples key, index 0, grab otu_labels key

  //use result_filter for bar chart:
  // var otu_ids_bar=data.samples['otu_ids']
  var metadata=data['metadata']; 
  // console.log(metadata) //metadata an array of objects
  // var samples= data['samples'];
  // console.log(samples); //samples an array of objects

  //use data.samples for bubble chart
  var otu_ids=data.samples[0]['otu_ids']
  // console.log(otu_ids);
  //use samples key, index 0, grab samples_values key
  var samples = data.samples[0]['sample_values']
  // console.log(samples)
  //use samples key, index 0, grab otu_labels
  var hover_text=data.samples[0]['otu_labels']
  // console.log(hover_text);
  
  // convert otu_ids to string
  otu_label= otu_ids.map(x=> `otu ${x}`).slice(0,10).reverse()

//create trace & use .slice & .reverse to get the top 10 results
var trace_bar= {
  'type': 'bar',
  'y': otu_label,
  'x': samples.slice(0,10).reverse(),
  'text': hover_text.slice(0,10).reverse(),
  'orientation': 'h'
};
// console.log(otu_ids.slice(0,10).reverse());
// // console.log(otu_ids.slice(0,10));
// console.log(samples.slice(0,10).reverse());
// console.log(hover_text.slice(0,10).reverse());

var bar_layout= {
  'title': 'Top 10 Clusters Found',
//   'height': 30,
//   'width': 30
};

//create plot using Plotly: use 'bar' as type & trace as data, plus a layout
Plotly.newPlot('bar', [trace_bar], bar_layout);
// Plotly.newPlot('bar', [trace_bar], bar_layout);

// var sample_values= 
var trace_bubble= {
  'type': 'scatter',
  'y': otu_ids,
  'x': samples,
  mode: 'markers',
  text: hover_text,
  marker: {
    // color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
    // // opacity: [1, 0.8, 0.6, 0.4],
    size: samples,
    color: otu_ids
  }
};
var bubble_layout= {
  xaxis: {title:{text: 'OTU ID'}}
};

Plotly.newPlot('bubble', [trace_bubble], bubble_layout);

// var table_body=d3.select("tbody");
// // d3.json('samples.json').then((data)=>{
// //Populate the demographic table
// // var metadata=data.samples.filter(x=>x.id==sample_id);
// Object.entries(data.metadata[0].forEach(([key,value])=>{
//   row=table_body.append('tr');
//   row.append('td').text(key.concat(":",value));
// }));
// });
// };

//Create Data Table
//Get a refernce to the table body
var tbody=d3.select("tbody");
// var cur_metadata=metadata.filter(x=>x.id==sample_id);
// console.log(cur_metadata);
Object.entries(metadata[0]).forEach(([key,value])=>{
  var row=tbody.append("tr");
  row.text(`${key}: ${value}`);
  // row.append('td').text(key.concat(":",value));
});
});
};

// buildPlot();

function optionChanged(id) {
  console.log(id);
}

function updatePlotly() {
  var tbody=d3.select("tbody");
  tbody.text("");
  d3.json('samples.json').then((data)=> {
    var result_filter= data.samples.filter(x=>x.id==sample_id)[0]
    // console.log(result_filter);
    var metadata=data['metadata']; 
    // console.log(metadata);
  //use data.samples for bubble chart
  var otu_ids=data.samples[0]['otu_ids']
  // console.log(otu_ids);
  //use samples key, index 0, grab samples_values key
  var samples = data.samples[0]['sample_values']
  // console.log(samples)
  //use samples key, index 0, grab otu_labels
  var hover_text=data.samples[0]['otu_labels']
  // console.log(hover_text);

  // convert otu_ids to string
  otu_label= otu_ids.map(x=> `otu ${x}`).slice(0,10).reverse()

    Plotly.restyle('bar', 'y',[otu_label].slice(0,10));
    Plotly.restyle('bar', 'x',[samples].slice(0,10));
  });
};

// updatePlotly()


// function init(sample_id) {
// var table_body=d3.select("tbody");
// d3.json('samples.json').then((data)=>{
// //Populate the demographic table
// var result_filter= data.samples.filter(x=>x.id==sample_id)[0]
// console.log(demo);
// // var metadata=data.samples.filter(x=>x.id==sample_id);
// Object.entries(result_filter[0].forEach(([key,value])=>{
//   row=table_body.append('tr');
//   row.append('td').text(key.concat(":",value));
// }));
// });
// };
// init();

///////
// function init() {
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
// updatePlotly()
buildPlot();