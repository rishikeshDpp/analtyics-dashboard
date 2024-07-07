import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Barchart = () => {
  
  const dataObj = [
    { category: "<15", value: Math.floor(Math.random() * 10000)},
    { category: "15-20", value: Math.floor(Math.random() * 10000)},
    { category: "20-25", value: Math.floor(Math.random() * 10000)},
    { category: "25-30", value: Math.floor(Math.random() * 10000)},
    { category: "30-35", value: Math.floor(Math.random() * 10000)},
    { category: "35-40", value: Math.floor(Math.random() * 10000)},
    { category: "40-45", value: Math.floor(Math.random() * 10000)}
  ]
  const ref = useRef();

  const createGraph = async () => {
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select(ref.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(dataObj.map((d) => d.category))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 10000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(dataObj)
      .join("rect")
      .attr("x", (d) => x(d.category))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", "#5f0f40");
  }

  useEffect(() => {
    createGraph();
  }, []);

  return <svg width={460} height={400} style={{color: "#000"}} id="barchart" ref={ref} />;
};

export default Barchart;