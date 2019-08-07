function JD_bar(){
    
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv2", am4charts.XYChart);
    var url = '/jdbar'
    console.log(url);
    // Add data
    d3.json(url).then(function(response){
        console.log(response);
        var politicaldata = [];
        for (var index = 0; index < response.length; index++) {
            politicaldata.push({
                "decade": response[index].decade,
                "liberal": response[index].liberal,
                "conservative": response[index].conservative
            });
        }
        console.log(politicaldata);
        chart.data = politicaldata;
    });
    
    
   // Use only absolute numbers
    chart.numberFormatter.numberFormat = "#.#s";
    
    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "decade";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;
    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.extraMin = 0.1; //used to be 0.1 
    valueAxis.extraMax = 0.1; //used to be 0.1
    valueAxis.renderer.minGridDistance = 20;
    valueAxis.renderer.ticks.template.length = 5;
    valueAxis.renderer.ticks.template.disabled = false;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
    valueAxis.renderer.labels.template.adapter.add("text", function(text) {
        return text == "Liberal" || text == "Conservative" ? text : text;
    });
    // Create series
    var liberal = chart.series.push(new am4charts.ColumnSeries());
    liberal.dataFields.valueX = "liberal";
    liberal.dataFields.categoryY = "decade";
    liberal.clustered = false;
    var liberalLabel = liberal.bullets.push(new am4charts.LabelBullet());
    liberalLabel.label.text = `{valueX}`;
    liberalLabel.label.hideOversized = false;
    liberalLabel.label.truncate = false;
    liberalLabel.label.horizontalCenter = "right";
    liberalLabel.label.dx = -10;
    
    var Conservative = chart.series.push(new am4charts.ColumnSeries());
    Conservative.dataFields.valueX = "conservative";
    Conservative.dataFields.categoryY = "decade";
    Conservative.clustered = false;
    
    var ConservativeLabel = Conservative.bullets.push(new am4charts.LabelBullet());
    ConservativeLabel.label.text = "{valueX}";
    ConservativeLabel.label.hideOversized = false;
    ConservativeLabel.label.truncate = false;
    ConservativeLabel.label.horizontalCenter = "left";
    ConservativeLabel.label.dx = 10;
    
    var liberalRange = valueAxis.axisRanges.create();
    liberalRange.value = -1;
    liberalRange.endValue = 0;
    liberalRange.label.text = "Liberal";
    liberalRange.label.fill = chart.colors.list[0];
    liberalRange.label.dy = 20;
    liberalRange.label.fontWeight = '600';
    liberalRange.grid.strokeOpacity = 1;
    liberalRange.grid.stroke = liberal.stroke;
    
    var ConservativeRange = valueAxis.axisRanges.create();
    ConservativeRange.value = 0;
    ConservativeRange.endValue = 1;
    ConservativeRange.label.text = "Conservative";
    ConservativeRange.label.fill = chart.colors.list[1];
    ConservativeRange.label.dy = 20;
    ConservativeRange.label.fontWeight = '600';
    ConservativeRange.grid.strokeOpacity = 1;
    ConservativeRange.grid.stroke = Conservative.stroke;

    
}; // end am4core.ready()


// console.log("start")
JD_bar();

