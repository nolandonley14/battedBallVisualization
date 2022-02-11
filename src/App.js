import React, { useEffect, useState } from 'react';
import { useData } from './useData';
import { ScatterPlot } from './ScatterPlot';
import { SearchBar } from './SearchBar';
import { ColorPickerList } from './ColorPickerList';
import './App.css';

const margin = {top: 10, right: 30, bottom: 30, left: 60};
const width = window.innerWidth/2;
const height = window.innerHeight/2;

const filters = ["LAUNCH_ANGLE", "EXIT_SPEED","EXIT_DIRECTION","HIT_DISTANCE","HANG_TIME","HIT_SPIN_RATE"]
const outcomes = ['Single', 'Double', 'Triple', 'HomeRun', "Out", "Error", "Sacrifice", "FieldersChoice", "Undefined"];
function App() {

  const data = useData();
  const [chartTitle, setChartTitle] = useState("")

  const [checkedStateX, setCheckedStateX] = useState("LAUNCH_ANGLE");
  const [checkedStateY, setCheckedStateY] = useState("HANG_TIME");

  const [xVar, setxVar] = useState('LAUNCH_ANGLE');
  const [yVar, setyVar] = useState('HANG_TIME');

  const [personFilter, setPersonFilter] = useState([]);
  const [type, setType] = useState(0);

  const [colors, setColors] = useState({'Single':'#F5CB39', 'Double':'#FF9900', 'Triple':'#0085C3', 'HomeRun':'#25D366', "Out":'#ED1C16', "Error":'#ED1C16', "Sacrifice":'#ED1C16', "FieldersChoice":'#ED1C16', "Undefined":'#ED1C16'})


  const handleOnChangeX = event => {
    setCheckedStateX(event.target.value);
  };

  const handleOnChangeY = event => {
    setCheckedStateY(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    setxVar(checkedStateX);
    setyVar(checkedStateY);
  }

  useEffect(() => {
    changeChartTitle()
  }, [personFilter, xVar, yVar]);


  const changeChartTitle = () => {
    let title = checkedStateX + ' v ' + checkedStateY
    switch (personFilter.length) {
      case 0:
        title = title + ' (General)';
        break;
      case 1:
        title = title + ' (' + personFilter[0].label + ': ' + personFilter[0].value + ')';
        break;
      default:
        if (type === 0) {
          title = title + ' (Multiple)';
        } else {
          title = title + ' (' + personFilter[0].value + ' v ' + personFilter[1].value + ')';
        }
        break;
    }
    setChartTitle(title);
  }


  const handleFilter = (u, c) => {


    if (c !== "Versus (PITCHER v BATTER)") {
      setType(0);
    } else {
      setType(1);
    }
    let filtersTmp = []
    for (const player in u) {
      let tmp = {}
      if (u[player].type === 0) {
        tmp = {'label':'BATTER', 'value':u[player].name}
      } else {
        tmp = {'label':'PITCHER', 'value':u[player].name}
      }
      filtersTmp.push(tmp);
    }
    setPersonFilter(filtersTmp);
  };

  const handleColorChange = (color, index) => {
    const c = Object.assign({}, colors);
    c[outcomes[index]] = color;
    setColors(c);
   }

  if(!data) {
    return <pre>Loading...</pre>
  }

  return (
    <div className="bgContainer">
      <div className="leftSide">
        <h1 className="title">Batted Ball Visualization</h1>
      <form onSubmit={handleSubmit} className="formFilters">
        <div className="axisCheckBoxes">
        <div className="formXContainer">
          <div className="formX">
            X-Axis
          </div>
        {filters.map((f, index) => {
          return (
            <div className="formCheck" key={index}>
              <label>
                <input
                  type="radio"
                  value={f}
                  checked={checkedStateX === f}
                  onChange={handleOnChangeX}
                  className="formCheckInput"
                />
                {f}
              </label>
            </div>
          );
        })}
      </div>
        <div className="formYContainer">
          <div className="formY">
            Y-Axis
          </div>
        {filters.map((f, index) => {
          return (
            <div className="formCheck" key={index}>
              <label>
                <input
                  type="radio"
                  value={f}
                  checked={checkedStateY === f}
                  onChange={handleOnChangeY}
                  className="formCheckInput"
                />
                {f}
              </label>
            </div>
          );
        })}
      </div>
    </div>
        <div className="submitButton">
          <button className="submitText" type="submit">
            Change Axes
          </button>
        </div>
      </form>
      <div className="chartTitle">
        {chartTitle}
      </div>
      <div className="charts">
      <ScatterPlot
        data={data}
        filter={personFilter}
        type={type}
        height={height}
        width={width}
        margin={margin}
        x={xVar}
        y={yVar}
        size={4}
        colors={colors}
      />
      </div>
      </div>
      <div className="rightSide">
        <SearchBar data={data} updateFunc={handleFilter}/>
        <ColorPickerList colors={colors} setColors={handleColorChange}/>
      </div>
  </div>
  )
}

export default App
