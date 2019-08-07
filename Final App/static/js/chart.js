var series;
am4core.ready(function () {
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("wordcloud", am4plugins_wordCloud.WordCloud);
    series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    series.accuracy = 4;
    series.step = 15;
    series.rotationThreshold = 0.7;
    series.maxCount = 200;
    series.minWordLength = 2;
    series.labels.template.margin(4, 4, 4, 4);
    series.maxFontSize = am4core.percent(30);

    series.dataFields.word = "tag";
    series.dataFields.value = "weight";
    series.colors = new am4core.ColorSet();
    series.colors.passOptions = {}; // makes it loop

    //series.labelsContainer.rotation = 45;
    series.angles = [0, -90];
    series.fontWeight = "700"

    setInterval(function () {
        series.dataItems.getIndex(Math.round(Math.random() * (series.dataItems.length - 1))).setValue("value", Math.round(Math.random() * 10));
    }, 10000)

});

var slider = document.getElementById("myRange");
var output = document.getElementById("outRange")
slider.value = 23;
var initialDecade = 1780 + 23 * 10;
output.innerHTML = initialDecade;
handleDecadeUpdate(initialDecade);

slider.oninput = function () {
    var decade = 1780 + this.value * 10;
    output.innerHTML = decade;
    handleDecadeUpdate(decade);
}

function handleDecadeUpdate(decade) {
    var url = `/static/data/${decade}.json`
    d3.json(url).then(function (data) {
        console.log(data);
        am4core.ready(function () {
            series.data = data.words;
        })
    });
}
