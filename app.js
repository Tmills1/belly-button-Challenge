
    //////  !!!!!!  "Horizontal bar chart with a dropdown menu to display the top 10 OTUs"  !!!!!! //////
  
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let samples = data.samples;
    let sampleNames = data.names;
    let sample = sampleNames[0];

    console.log(data) 
    console.log(samples)
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    console.log(result)
    let otu_ids = result.otu_ids;
    
  
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];
  

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
  });


                 ///////// !!!!!!  "Bubble chart that displays each sample" !!!!!! //////////


  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
  let samples = data.samples;
  let sampleNames = data.names;
  let sample = sampleNames[0];

  let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
  let result = resultArray[0];

  let otu_ids = result.otu_ids;
  let otu_labels = result.otu_labels;
  let sample_values = result.sample_values;

  let bubbleData = [
    {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
      }
    }
  ];

  let bubbleLayout = {
    title: "Bacteria Cultures Per Sample",
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Sample Values" },
    showlegend: false,
    height: 600,
    width: 1000
  };

  Plotly.newPlot("bubble", bubbleData, bubbleLayout);
});


 
//// !!!!!!  "Display the sample metadata and each key-value pair from the metadata JSON object"  !!!!!! ////



d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
  let samples = data.samples;
  let sampleNames = data.names;
  let dropdown = d3.select("#selDataset");

  // Populate the dropdown with sample names
  sampleNames.forEach(sample => {
    dropdown.append("option").text(sample).property("value", sample);
  });

  // Function to update the plots
  function updatePlots(selectedSample) {
    let resultArray = samples.filter(sampleObj => sampleObj.id == selectedSample);
    let result = resultArray[0];

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    let sampleMetadata = d3.select("#sample-metadata");

    // Clear existing content in the sample metadata
    sampleMetadata.html("");

    // Iterate over the key-value pairs in the metadata and display them on the page
    let metadataArray = data.metadata.filter(metadataObj => metadataObj.id == selectedSample);
    let metadataResult = metadataArray[0];
    Object.entries(metadataResult).forEach(([key, value]) => {
      sampleMetadata.append("p").text(`${key}: ${value}`);
    });

    let bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
        }
      }
    ];

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" },
      showlegend: false,
      height: 600,
      width: 1000
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  }

  // Event handler for sample selection
  function optionChanged(selectedSample) {
    updatePlots(selectedSample);
  }

  // Initialize the page with the first sample
  let initialSample = sampleNames[0];
  updatePlots(initialSample);

  // Event listener for sample selection
  dropdown.on("change", function () {
    let selectedSample = dropdown.property("value");
    updatePlots(selectedSample);
  });
});


                      //// !!! "Weekly washing frequency of the individual"  !!! ////



d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
  let samples = data.samples;
  let sampleNames = data.names;
  let dropdown = d3.select("#selDataset");

  // Populate the dropdown with sample names
  sampleNames.forEach(sample => {
    dropdown.append("option").text(sample).property("value", sample);
  });

  // Function to update the plots
  function updatePlots(selectedSample) {
    let resultArray = samples.filter(sampleObj => sampleObj.id == selectedSample);
    let result = resultArray[0];

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    let sampleMetadata = d3.select("#sample-metadata");

    // Clear existing content in the sample metadata
    sampleMetadata.html("");

    // Iterate over the key-value pairs in the metadata and display them on the page
    let metadataArray = data.metadata.filter(metadataObj => metadataObj.id == selectedSample);
    let metadataResult = metadataArray[0];
    Object.entries(metadataResult).forEach(([key, value]) => {
      sampleMetadata.append("p").text(`${key}: ${value}`);
    });

    let bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
        }
      }
    ];

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" },
      showlegend: false,
      height: 600,
      width: 1000
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    let washFrequency = metadataResult.wfreq;

    let gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washFrequency,
        title: { text: "Belly Button Washing Frequency <br> Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [0, 9] },
          steps: [
            { range: [0, 1], color: "#f7f7f7" },
            { range: [1, 2], color: "#f2f2f2" },
            { range: [2, 3], color: "#e6e6e6" },
            { range: [3, 4], color: "#d9d9d9" },
            { range: [4, 5], color: "#cccccc" },
            { range: [5, 6], color: "#bfbfbf" },
            { range: [6, 7], color: "#b3b3b3" },
            { range: [7, 8], color: "#a6a6a6" },
            { range: [8, 9], color: "#999999" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: washFrequency
          }
        }
      }
    ];

    let gaugeLayout = {
      width: 500,
      height: 400,
      margin: { t: 0, b: 0 },
      title: { text: "Belly Button Washing Frequency", font: { size: 16 } }
    };

    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  }

  // Event handler for the dropdown selection
  function optionChanged(selectedSample) {
    updatePlots(selectedSample);
  }

  // Set the initial plot
  updatePlots(sampleNames[0]);

  // Event listener for the dropdown change
  dropdown.on("change", optionChanged);
});
