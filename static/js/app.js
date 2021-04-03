//Step 1: 
// Use d3 to read in samples.json
 d3.json("../../samples.json").then((samples)=> {
  console.log(samples)
});

//Step 2: 
// Use D3 to create an event handler
// d3.selectAll("body").on("change", updatePage);
//We utilized the html select tag for event handler.
// //this will display the id and the value of the drop down menu. 
// function updatePage() {
//   // Use d3 to read in samples.json
//   d3.json("../../samples.json").then((data)=> {
//   // Use d3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset"); //# means id // . means class
//       //use forEach grab the names key 
//       data['names'].forEach((id_num)=> {
//       //append (the name text to value name in the dropdown menu)
//         dropdownMenu.append('option').text(id_num).property('value', id_num);	//.text method grab (name text)
//     });
//     var wash_freq= d3.select("#selDataset");
//       data['metadata'].forEach((wfreq)=> {
//         wash_freq.append('option').text(wfreq).property('value', wfreq);
//       });
//   });
//   // //Call the buildPlot function inside of updatePage
//   d3.selectAll("body").on("change", buildPlot);
// }

updatePage();
//Step 3: create buildPlot function. Make sure to update html to reflect select buildPlot
function buildPlot(sample_id){
  d3.json("../../samples.json").then((data)=>{
    // console.log(data)

    //Create a filter to pull the sample_id 
    //x=>x.id provides place holder to compare to sample_id
    var result_filter= data.samples.filter(x=>x.id==sample_id)[0]
    // console.log(sample_id)
    //data is an array of objects. use samples key, index 0, grab otu_labels key
    var metadata=data['metadata'].filter(x=>x.id==sample_id)[0];
    // console.log(metadata) //metadata an array of objects
    
    // var wash_freq  =metadata['wfreq']
    // console.log(wash_freq) //gives you the first wfreq 2

    // var samples= data['samples'];
    // console.log(samples); //samples an array of objects
    var wash_freq=data['metadata'].map(d=>d.wfreq)
    console.log(wash_freq) //shows all the wash_freq

    //Use result_filter for bar chart:
    // data.samples[0]
    // var otu_ids_bar=data.samples['otu_ids']
    var otu_ids=result_filter['otu_ids']
    // console.log(otu_ids);

    //Use result_filter,b grab samples_values key

    var samples = result_filter['sample_values']
    // console.log(samples)
    //Use result_filter, grab otu_labels
    var hover_text=result_filter['otu_labels']
    // console.log(hover_text);
    
    // Convert otu_ids to string
    otu_label= otu_ids.map(x=> `otu ${x}`).slice(0,10).reverse()
    // console.log(otu_label)
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
      't': 30,
      'b': 30,
      xaxis: {title:
        'Sample Values'}
    };

    //create plot using Plotly: use 'bar' as type & trace as data, plus a layout
    Plotly.newPlot('bar', [trace_bar], bar_layout);

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

    //Step 4 & 5: 
    //Create Data Table
    //Get a refernce to the table body
    var tbody=d3.select("tbody");
    tbody.html("")
    // console.log(metadata);
    // var cur_metadata=metadata.filter(x=>x.id==sample_id);
    // console.log(cur_metadata);
    Object.entries(metadata).forEach(([key,value])=>{
      var row=tbody.append("tr");
      row.text(`${key}: ${value}`);
      // row.append('td').text(key.concat(":",value));
    });
  });

  //Bonus Gauge attempt:
  var data = [
    {
      domain: { x: [0,1], y: [0,1]},
      labels: ["0-1", "1-2","2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
      value: parseFloat(wash_freq),
      // value: (wash_freq),
      // value: 5,
      title: { text: "Belly Button Washing Frequency Scrubs per Week" , font: {size: 17}},
      type: "indicator",
      mode: "gauge+number+delta",
      // delta: {reference: null, increasing: {color: "RebeccaPurple"}},
      gauge: {
        axis: {range: [null, 9], tickwidth: 2, tickcolor: "orange"},
        bar: {color: "RebeccaPurple"},
        bgcolor: "white", 
        borderwidth: 3,
        bordercolor: "gray",
        steps: [
          {range: [0,2], color: "#ffc7b6"},
          {range: [2,4], color: "#ffb39c"},
          {range: [4,6], color: "#ffa083"},
          {range: [6,8], color: "#ff8c69"},
          {range: [8,9], color: "#ff784f"}
        ],
        threshold: {
          line: {color: "red", width: 3},
          thickness: 0.75,
          // value: 5
        }
      }
    }
  ];

  var layout = { 
    width: 600, 
    height: 500, 
    margin: { t: 25, b: 25, 1: 25, b: 25 },
    paper_bgcolor: "white",
    font: {color: "black", family: "Arial"}
  };

  Plotly.newPlot('gauge', data, layout);

};
  //Call the updatePlotly function inside of buildPlot
  // d3.selectAll("body").on("change", updatePlotly);

buildPlot('940');

// function BuildPlot(id) {
//   console.log(id);
// }

//Step 6: 
//We utilized the html select tag for event handler.
function updatePage() {
  // Use d3 to read in samples.json
  d3.json("../../samples.json").then((data)=> {
  // Use d3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset"); //# means id // . means class
      //use forEach grab the names key 
      data['names'].forEach((id_num)=> {
      //append (the name text to value name in the dropdown menu)
        dropdownMenu.append('option').text(id_num).property('value', id_num); //.text method grab (name text)
    });
    // var wash_freq= d3.select("#selDataset");
    //   data['metadata'].forEach((wfreq)=> {
    //     wash_freq.append('option').text(wfreq).property('value', wfreq);
    //   });
  });
  // //Call the buildPlot function inside of updatePage
  d3.selectAll("body").on("change", buildPlot);
};
// updatePage();

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
