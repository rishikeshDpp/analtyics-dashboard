import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Linechart = (dataObj) => {
  const ref = useRef();

  const createGraph = async () => {

    function randomNumber(minimum, maximum){
        return Math.round( Math.random() * (maximum - minimum) + minimum);
    }
    
    //dat and value object array generator
    const objectGenerator = () => {
        let arr = [];
        const today = new Date()
        const days = Math.floor(Math.random() * 100)

        var y;
        
        for (let i = 0; i < days; i++) {
            y = randomNumber(0, i)
            arr.push({date: new Date(new Date().setDate(today.getDate() - (days-i))), value: y})
        }
        return arr
    }
    
    const data = objectGenerator();

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

       // Add X axis and Y axis
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    x.domain(d3.extent(data, (d) => { return d.date; }));
    y.domain([0, d3.max(data, (d) => { return d.value; })]);
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));
    svg.append("g")
    .call(d3.axisLeft(y));

    // add the Line
    const valueLine = d3.line()
    .x((d) => { return x(d.date); })
    .y((d) => { return y(d.value); });
    svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", valueLine)
  }

  useEffect(() => {
    createGraph();
  }, []);

    return <svg width={460} height={400} style={{color: "#000"}} id="linechart" ref={ref} />;
};

export default Linechart;