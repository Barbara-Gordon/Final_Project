// <!-- Chart code -->
am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_kelly);
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  var chart = am4core.create("chartdiv", am4charts.XYChart);
  
  chart.data = [
    {'Decade': '1780', 'Fear': 16.25, 'Anger': 19.11, 'Sadness': 26.31, 'Joy': 30.03, 'Surprise': 8.3},
    {'Decade': '1790', 'Fear': 17.27, 'Anger': 22.62, 'Sadness': 29.64, 'Joy': 21.71, 'Surprise': 8.76}, 
    {'Decade': '1800', 'Fear': 16.65, 'Anger': 20.16, 'Sadness': 32.82, 'Joy': 21.09, 'Surprise': 9.27}, 
    {'Decade': '1810', 'Fear': 18.83, 'Anger': 18.91, 'Sadness': 29.6, 'Joy': 21.46, 'Surprise': 11.21}, 
    {'Decade': '1820', 'Fear': 17.28, 'Anger': 19.88, 'Sadness': 28.24, 'Joy': 26.72, 'Surprise': 7.88}, 
    {'Decade': '1830', 'Fear': 15.61, 'Anger': 20.84, 'Sadness': 32.44, 'Joy': 21.58, 'Surprise': 9.53}, 
    {'Decade': '1840', 'Fear': 17.8, 'Anger': 20.95, 'Sadness': 28.48, 'Joy': 23.7, 'Surprise': 9.06}, 
    {'Decade': '1850', 'Fear': 19.59, 'Anger': 20.68, 'Sadness': 32.33, 'Joy': 18.85, 'Surprise': 8.55}, 
    {'Decade': '1860', 'Fear': 20.09, 'Anger': 20.02, 'Sadness': 29.45, 'Joy': 21.19, 'Surprise': 9.25}, 
    {'Decade': '1870', 'Fear': 19.75, 'Anger': 22.56, 'Sadness': 32.97, 'Joy': 18.3, 'Surprise': 6.41}, 
    {'Decade': '1880', 'Fear': 18.07, 'Anger': 23.51, 'Sadness': 26.59, 'Joy': 23.14, 'Surprise': 8.69}, 
    {'Decade': '1890', 'Fear': 19.63, 'Anger': 19.64, 'Sadness': 29.28, 'Joy': 21.69, 'Surprise': 9.75}, 
    {'Decade': '1900', 'Fear': 21.09, 'Anger': 20.9, 'Sadness': 28.28, 'Joy': 22.4, 'Surprise': 7.32}, 
    {'Decade': '1910', 'Fear': 21.28, 'Anger': 22.01, 'Sadness': 31.41, 'Joy': 17.55, 'Surprise': 7.75}, 
    {'Decade': '1920', 'Fear': 20.45, 'Anger': 19.4, 'Sadness': 31.51, 'Joy': 20.56, 'Surprise': 8.08}, 
    {'Decade': '1930', 'Fear': 18.42, 'Anger': 22.89, 'Sadness': 32.94, 'Joy': 18.7, 'Surprise': 7.04}, 
    {'Decade': '1940', 'Fear': 17.31, 'Anger': 15.42, 'Sadness': 33.61, 'Joy': 27.11, 'Surprise': 6.55}, 
    {'Decade': '1950', 'Fear': 23.61, 'Anger': 15.74, 'Sadness': 22.7, 'Joy': 28.8, 'Surprise': 9.15}, 
    {'Decade': '1960', 'Fear': 18.73, 'Anger': 15.7, 'Sadness': 28.49, 'Joy': 25.37, 'Surprise': 11.71}, 
    {'Decade': '1970', 'Fear': 19.11, 'Anger': 13.59, 'Sadness': 27.15, 'Joy': 28.98, 'Surprise': 11.17}, 
    {'Decade': '1980', 'Fear': 17.85, 'Anger': 16.49, 'Sadness': 30.98, 'Joy': 23.74, 'Surprise': 10.93}, 
    {'Decade': '1990', 'Fear': 18.46, 'Anger': 14.61, 'Sadness': 25.37, 'Joy': 30.03, 'Surprise': 11.53}, 
    {'Decade': '2000', 'Fear': 17.3, 'Anger': 17.54, 'Sadness': 29.55, 'Joy': 27.69, 'Surprise': 7.91}, 
    {'Decade': '2010', 'Fear': 18.11, 'Anger': 15.43, 'Sadness': 27.5, 'Joy': 30.72, 'Surprise': 8.24}
  ];
  
  chart.dateFormatter.inputDateFormat = "yyyy";
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 60;
  dateAxis.startLocation = 0.5;
  dateAxis.endLocation = 0.5;
  dateAxis.baseInterval = {
    timeUnit: "year",
    count: 1
  }
  
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.dateX = "Decade";
  series.name = "Fear";
  series.dataFields.valueY = "Fear";
  series.tooltipHTML = "<img src= 'static/js/Images/Fear.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:28px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
  series.tooltipText = "[#000]{valueY.value}[/]";
  series.tooltip.background.fill = am4core.color("#FFF");
  series.tooltip.getStrokeFromObject = true;
  series.tooltip.background.strokeWidth = 3;
  series.tooltip.getFillFromObject = false;
  series.fillOpacity = 0.6;
  series.strokeWidth = 2;
  series.stacked = true;
  
  var series2 = chart.series.push(new am4charts.LineSeries());
  series2.name = "Anger";
  series2.dataFields.dateX = "Decade";
  series2.dataFields.valueY = "Anger";
  series2.tooltipHTML = "<img src='static/js/Images/Anger.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:28px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
  series2.tooltipText = "[#000]{valueY.value}[/]";
  series2.tooltip.background.fill = am4core.color("#FFF");
  series2.tooltip.getFillFromObject = false;
  series2.tooltip.getStrokeFromObject = true;
  series2.tooltip.background.strokeWidth = 3;
  series2.sequencedInterpolation = true;
  series2.fillOpacity = 0.6;
  series2.stacked = true;
  series2.strokeWidth = 2;
  
  var series3 = chart.series.push(new am4charts.LineSeries());
  series3.name = "Sadness";
  series3.dataFields.dateX = "Decade";
  series3.dataFields.valueY = "Sadness";
  series3.tooltipHTML = "<img src='static/js/Images/Sadness.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:28px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
  series3.tooltipText = "[#000]{valueY.value}[/]";
  series3.tooltip.background.fill = am4core.color("#FFF");
  series3.tooltip.getFillFromObject = false;
  series3.tooltip.getStrokeFromObject = true;
  series3.tooltip.background.strokeWidth = 3;
  series3.sequencedInterpolation = true;
  series3.fillOpacity = 0.6;
  series3.defaultState.transitionDuration = 1000;
  series3.stacked = true;
  series3.strokeWidth = 2;

  var series4 = chart.series.push(new am4charts.LineSeries());
  series4.name = "Joy";
  series4.dataFields.dateX = "Decade";
  series4.dataFields.valueY = "Joy";
  series4.tooltipHTML = "<img src=''static/js/Images/Joy.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:28px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
  series4.tooltipText = "[#000]{valueY.value}[/]";
  series4.tooltip.background.fill = am4core.color("#FFF");
  series4.tooltip.getFillFromObject = false;
  series4.tooltip.getStrokeFromObject = true;
  series4.tooltip.background.strokeWidth = 3;
  series4.sequencedInterpolation = true;
  series4.fillOpacity = 0.6;
  series4.defaultState.transitionDuration = 1000;
  series4.stacked = true;
  series4.strokeWidth = 2;

  var series5 = chart.series.push(new am4charts.LineSeries());
  series5.name = "Surprise";
  series5.dataFields.dateX = "Decade";
  series5.dataFields.valueY = "Surprise";
  series5.tooltipHTML = "<img src='static/js/Images/Surprise.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:28px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
  series5.tooltipText = "[#000]{valueY.value}[/]";
  series5.tooltip.background.fill = am4core.color("#FFF");
  series5.tooltip.getFillFromObject = false;
  series5.tooltip.getStrokeFromObject = true;
  series5.tooltip.background.strokeWidth = 3;
  series5.sequencedInterpolation = true;
  series5.fillOpacity = 0.6;
  series5.defaultState.transitionDuration = 1000;
  series5.stacked = true;
  series5.strokeWidth = 2;
  
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.xAxis = dateAxis;
  chart.scrollbarX = new am4core.Scrollbar();
  
  // Add a legend
  chart.legend = new am4charts.Legend();
  chart.legend.position = "top";
  
  // // axis ranges
  // var range = dateAxis.axisRanges.create();
  // range.date = new Date(1770, 1, 1);
  // range.endDate = new Date(2020, 1, 1);
  // range.axisFill.fill = chart.colors.getIndex(7);
  // range.axisFill.fillOpacity = 0.2;
  
  // range.label.text = "Fines for speeding increased";
  // range.label.inside = true;
  // range.label.rotation = 90;
  // range.label.horizontalCenter = "right";
  // range.label.verticalCenter = "bottom";
  
  // var range2 = dateAxis.axisRanges.create();
  // range2.date = new Date(2007, 1, 1);
  // range2.grid.stroke = chart.colors.getIndex(7);
  // range2.grid.strokeOpacity = 0.6;
  // range2.grid.strokeDasharray = "5,2";
  
  
  // range2.label.text = "Motorcycle fee introduced";
  // range2.label.inside = true;
  // range2.label.rotation = 90;
  // range2.label.horizontalCenter = "right";
  // range2.label.verticalCenter = "bottom";
  
  }); // end am4core.ready()