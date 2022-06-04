const NUMBER_LIST = [1, 9, 3, 5, 8, 1, 7, 12];

const xScale = d3.scaleBand().domain(NUMBER_LIST.map(dataPoint => dataPoint)).rangeRound([0, 250]);
const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);

const container = d3.select('svg').classed('container', true);

const bars = container
    .selectAll('.bar')
    .data(NUMBER_LIST)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', data => 200 - yScale(data))
    .attr('x', data => xScale(data))
    .attr('y', data => yScale(data));