$(function () {
    "use strict";
    // Bar chart


    // New chart
    //new Chart(document.getElementById("pie-chart"), {
    //	type: 'pie',
    //	data: {
    //	  labels: ["Africa", "Asia", "Europe", "Latin America"],
    //	  datasets: [{
    //		label: "Population (millions)",
    //		backgroundColor: ["#5e73da", "#b1bdfa","#5f76e8","#8fa0f3"],
    //		data: [2478,5267,3734,2784]
    //	  }]
    //	},
    //	options: {
    //	  title: {
    //		display: true,
    //		text: 'Predicted world population (millions) in 2050'
    //	  }
    //	}
    //});

    // Horizental Bar Chart
    //new Chart(document.getElementById("bar-chart-horizontal"), {
    //	type: 'horizontalBar',
    //	data: {
    //	  labels: ["Africa"+ "8478", "Asia", "Europe", "Latin America", "North America",],
    //	  datasets: [
    //		{
    //		  //label: "Population (millions)",
    //		  backgroundColor: ["#6174d5", "#5f76e8", "#768bf4", "#7385df", "#b1bdfa"],
    //		  data: [8478,6267,5534,4784,3433]
    //		}
    //	  ]
    //	},
    //	options: {
    //	  legend: { display: false },
    //	  title: {
    //		display: true,
    //		text: 'Predicted world population (millions) in 2050'
    //	  }
    //	}
    //});


    $(document).ready(function () {
        //'use strict';

        //var axisY = ["Apple", "Orange", "Banana", "Tomato", "Milk", "Potato"];
        //var axisX = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];
        //var barsValue = [50, 61, 93, 76, 5, 13];

        //// Data to charts
        //var data = {
        //    "axisY": axisY,         // Data for axis Y labels
        //    "axisX": axisX,         // Data for axis X labels
        //    "bars": barsValue       // Data for bars value
        //};

        //// My options
        //var options = {
        //    data: data,
        //    showValues: true,
        //    showHorizontalLines: true,
        //    animation: true,
        //    animationOffset: 0,
        //    labelsAboveBars: true
        //};

        //var options2 = {
        //    data: data,
        //    showValues: true,
        //    showHorizontalLines: true,
        //    animation: true,
        //    animationOffset: 0,
        //    animationRepeat: false,
        //    showArrows: false,
        //    labelsAboveBars: false
        //};

        //var chart = $('#chart-1').rumcaJS(options2);
        //var chart2 = $('#chart-2').rumcaJS(options);

        //chart2.sortByValue();

        console.log('%c Hello RumcaJS ', 'font-size:24px; background: #000; color: #fff');
        //*************************************************************************
        //  Methods
        /**************************************************************************
        $myChart.horizontalChart(options);                          // Initialization horizontal chart.
    
        $myChart.resetAll();                                        // Remove all data.
        $myChart.resetBars();                                       // Remove all bars.
        $myChart.resetAxisY();                                      // Remove all data from axis Y.
        $myChart.resetAxisX();                                      // Remove all data from axis X.
    
        $myChart.removeItem(4);                                     // Remove single item. Parameter: int value (from the top, starting on 1).
    
        $myChart.appendAll(data);                                   // Insert all data. Parameter: object with data.
        $myChart.appendItem('new item', 33);                        // Insert an element to the end. Parameters: string value (for axis Y label), int value (for bar).
        $myChart.appendBars(barsValue);                             // Insert a bars to the end. Parameter: array with int value.
        $myChart.appendAxisY(axisY);                                // Insert an axis Y value to the end. Parameter: array with string value.
        $myChart.appendAxisX(axisX);                                // Insert an axis X value to the ending. Parameter: array with string value.
    
        $myChart.prependAll(data);                                  // Insert all data. Parameter: object with data.
        $myChart.prependItem('new item', 76);                       // Insert an element to the beginning. Parameters: string value (for axis Y label), int value (for bar).
        $myChart.prependBars(barsValue);                            // Insert a bars on the beginning. Parameter: array with int value.
        $myChart.prependAxisY(axisY);                               // Insert an axis Y value to the beginning. Parameter: array with string value.
        $myChart.prependAxisX(axisX);                               // Insert an axis X value to the beginning. Parameter: array with string value.
    
        $myChart.updateAll(data);                                   // Update chart with new data. Parameter: object with new data.
        $myChart.updateBars(barsValue);                             // Update a bars. Parameter: array with int value.
        $myChart.updateAxisY(axisY);                                // Update an axis Y. Parameter: array with string value.
        $myChart.updateAxisX(axisX);                                // Update an axis X. Parameter: array with string value.
    
        $myChart.sortByName(true);                                  // Sort by name. Parameter: boolean value (true - descending, false - ascending).
        $myChart.sortByValue(false);                                // Sort by value. Parameter: boolean value (true - descending, false - ascending).
    
        $myChart.selectMax();                                       // Select bar with maxiumum value.
        $myChart.selectMin();                                       // Select bar with minimum value.
    
        $myChart.runAnimation();                                    // Animation trigger.
        **************************************************************************/
    });



    //Polar Chart
    //new Chart(document.getElementById("polar-chart"), {
    //	type: 'polarArea',
    //	data: {
    //	  labels: ["Africa", "Asia", "Europe", "Latin America"],
    //	  datasets: [
    //		{
    //		  label: "Population (millions)",
    //		  backgroundColor: ["#5e73da", "#b1bdfa","#5f76e8","#8fa0f3"],
    //		  data: [2478,5267,5734,3784]
    //		}
    //	  ]
    //	},
    //	options: {
    //	  title: {
    //		display: true,
    //		text: 'Predicted world population (millions) in 2050'
    //	  }
    //	}
    //});

    //Radar chart
    //new Chart(document.getElementById("radar-chart"), {
    //	type: 'radar',
    //	data: {
    //	  labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    //	  datasets: [
    //		{
    //		  label: "250",
    //		  fill: true,
    //		  backgroundColor: "rgba(1, 202, 241,0.2)",
    //		  borderColor: "rgba(1, 202, 241,1)",
    //		  pointBorderColor: "#fff",
    //		  pointBackgroundColor: "rgba(1, 202, 241,1)",
    //		  data: [8.77,55.61,21.69,6.62,6.82]
    //		}, {
    //		  label: "4050",
    //		  fill: true,
    //		  backgroundColor: "rgba(95, 118, 232,0.2)",
    //		  borderColor: "rgba(95, 118, 232,1)",
    //		  pointBorderColor: "#fff",
    //		  pointBackgroundColor: "rgba(95, 118, 232,1)",
    //		  pointBorderColor: "#fff",
    //		  data: [25.48,54.16,7.61,8.06,4.45]
    //		}
    //	  ]
    //	},
    //	options: {
    //	  title: {
    //		display: true,
    //		text: 'Distribution in % of world population'
    //	  }
    //	}
    //});

    //Line Chart

    //new Chart(document.getElementById("line-chart"), {
    //  type: 'line',
    //  data: {
    //	labels: [4500,3500,3200,3050,2700,2450,2200,1750,1499,2050],
    //	datasets: [{ 
    //		data: [86,114,106,106,107,111,133,221,783,2478],
    //		label: "Africa",
    //		borderColor: "#5f76e8",
    //		fill: false
    //	  }, { 
    //		data: [282,350,411,502,635,809,947,1402,3700,5267],
    //		label: "Asia",
    //		borderColor: "#768bf4",
    //		fill: false
    //	  }, { 
    //		data: [168,170,178,190,203,276,408,547,675,734],
    //		label: "Europe",
    //		borderColor: "#7385df",
    //		fill: false
    //	  }, { 
    //		data: [40,20,10,16,24,38,74,167,508,784],
    //		label: "Latin America",
    //		borderColor: "#b1bdfa",
    //		fill: false
    //	  }, { 
    //		data: [6,3,2,2,7,26,82,172,312,433],
    //		label: "North America",
    //		borderColor: "#8fa0f3", 
    //		fill: false
    //	  }
    //	]
    //  },
    //  options: {
    //	title: {
    //	  display: true,
    //	  text: 'World population per region (in millions)'
    //	}
    //  }
    //});

    // line second
}); 