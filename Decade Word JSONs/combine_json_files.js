'use strict';

// Before you write even a single line of actual code, write pseudo code in comments. 
// That will help you so much in the long run. 
// It might be uncomfortable at first but it'll get better. I promise.


const fs = require('fs');

let decadesYears = [1780, 1790, 1800, 1810, 1820, 1830, 1840, 1850, 1860, 1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010]
var data = {decades:[]}
var i;
for (i=0; i<decadesYears.length; i++){
	let rawdata = fs.readFileSync(decadesYears[i]+'.json');
	console.log(decadesYears[i]+'.json');
	let decadeData = JSON.parse(rawdata);
	data.decades.push(decadeData)

	
}
var dataStr = JSON.stringify(data)
fs.writeFileSync('decade.json', dataStr)
