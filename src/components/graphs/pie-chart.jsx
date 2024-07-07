import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Piechart = () => {

    const data = [
        { category: "A", value: Math.floor(Math.random() * 100)},
        { category: "B", value: Math.floor(Math.random() * 100)},
        { category: "C", value: Math.floor(Math.random() * 100)},
        { category: "D", value: Math.floor(Math.random() * 100)},
        { category: "E", value: Math.floor(Math.random() * 100)}
      ]
    //   const data = [{ label: 'Apples', value: 10 }, { label: 'Oranges', value: 20 }];
      const innerRadius=0, outerRadius=200;
  const ref = useRef();
   
  const margin = {
    top: 50, right: 50, bottom: 50, left: 50,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = d3     
    .scaleSequential()      
    .interpolator(d3.interpolateCool)      
    .domain([0, data.length]);

  useEffect(() => {
    drawChart();
  }, []);

  function drawChart() {
    // Remove the old svg
    d3.select(ref.current)
      .select('svg')
      .remove();

    // Create new svg
    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg
      .selectAll()
      .data(pieGenerator(data))
      .enter();

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0);

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.category)
      .style('fill', (_, i) => colorScale(data.length - i))
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }

  return <svg width={460} height={460} id="piechart" ref={ref} />;
};

export default Piechart;