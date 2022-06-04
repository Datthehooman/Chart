// set the dimensions and margins of the chart
const margin = { top: 10, right: 50, bottom: 90, left: 50 },
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the data
d3.csv("data.csv").then(function(data) {

    // X axis
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.Number));
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll()
        .attr("transform", "translate(3,2)")
        .style("text-anchor", "end");

    // Y axis
    const y = d3.scaleLinear()
        .domain([0, 15])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll()
        .data(data)
        .join("rect")
        .attr("x", d => x(d.Number))
        .attr("width", x.bandwidth())
        .attr("fill", "#00d969")
        .attr("height", d => height - y(0))
        .attr("y", d => y(0))

    // Animation
    svg.selectAll("rect")
        .transition()
        .duration(1500)
        .attr("y", d => y(d.Number))
        .attr("height", d => height - y(d.Number))
        .delay((d, i) => { console.log(i); return i * 500 })

})