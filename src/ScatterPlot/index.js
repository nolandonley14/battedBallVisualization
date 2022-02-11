import React, { useState, useEffect } from 'react';
import { AxisBottom } from '../AxisBottom';
import { AxisLeft } from '../AxisLeft';
import { Marks } from '../Marks';
import { scaleLinear, max, format, extent } from 'd3';
import './index.css';

const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;

export function ScatterPlot({data, filter, type, height, width, margin, x, y, size, colors}) {

  function filterByArray(val) {
    if (type === 0) {
      for (const f in filter) {
        if (filter[f].value === val[filter[f].label]) {
          return true;
        }
      }
      return false;
    } else {
      if (filter[0].value === val[filter[0].label] && filter[1].value === val[filter[1].label]) {
        return true;
      }
    }
    return false;
  }

  const filteredData = filter.length > 0 ? data.filter(filterByArray) : data;

  const innerHeight = height - margin.top - margin.bottom - yAxisLabelOffset;
  const innerWidth = width - margin.left - margin.right - xAxisLabelOffset;

  const xValue = d => d[x];
  const xAxisLabel = x;

  const yValue = d => d[y];
  const yAxisLabel = y;

  // const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => tickValue;

  const xScale = scaleLinear()
    .domain(extent(filteredData, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(filteredData, yValue))
    .range([innerHeight, 0]);


  return (
    <div>
      {filteredData.length > 0 ? (
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
              tickOffset={5}
            />
            <text
              className="axis-label"
              textAnchor="middle"
              transform={`translate(${-yAxisLabelOffset},${innerHeight /
                2}) rotate(-90)`}
            >
              {yAxisLabel}
            </text>
            <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
            <text
              className="axis-label"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle"
            >
              {xAxisLabel}
            </text>
            <Marks
              data={filteredData}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              tooltipFormat={xAxisTickFormat}
              circleRadius={size}
              colors={colors}
            />
          </g>
        </svg>
      ) : (
        <div>
          Sorry, No data for that combination.
        </div>
      )}
    </div>
  );
}
