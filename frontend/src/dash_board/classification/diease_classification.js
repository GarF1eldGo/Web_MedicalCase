import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function MyCirclePacking() {
  const data = [
    { name: 'A', value: 10 },
    { name: 'B', value: 20 },
    { name: 'C', value: 15 },
    { name: 'D', value: 5 },
    { name: 'E', value: 25 },
  ];

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svg.attr('width');
    const height = svg.attr('height');
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // create scales
    const x = d3
      .scaleBand()
      .range([0, chartWidth])
      .domain(data.map((d) => d.name))
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.max(data, (d) => d.value)]);

    // create axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(5);

    // create chart
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    chart
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis);

    chart.append('g').attr('class', 'y-axis').call(yAxis);

    // create bars
    const bars = chart.selectAll('.bar').data(data).enter().append('rect');
    bars
      .attr('class', 'bar')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => chartHeight - y(d.value))
      .attr('fill', 'steelblue');
  }, [data]);

  return <svg ref={svgRef} width="400" height="300"></svg>;
}
