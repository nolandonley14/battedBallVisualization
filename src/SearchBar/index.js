import React, { useState, useEffect } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './index.css';

export function SearchBar({data, updateFunc}) {
  // the value of the search field
  const [name, setName] = useState('');
  const options = ["General (Select All)", "Multiple Select (Cumulative)", "Versus (PITCHER v BATTER)"]
  let players = [];

  for (const d in data) {
    if (players[data[d].BATTER_ID] === undefined) {
      players[data[d].BATTER_ID] = {'name':data[d].BATTER, 'type': 0, 'active': false, 'opponents': [data[d].PITCHER]};
    } else {
      players[data[d].BATTER_ID].opponents.push(data[d].PITCHER);
    }
    if (players[data[d].PITCHER_ID] === undefined) {
      players[data[d].PITCHER_ID] = {'name':data[d].PITCHER, 'type': 1, 'active': false, 'opponents': [data[d].BATTER]};
    } else {
      players[data[d].PITCHER_ID].opponents.push(data[d].BATTER);
    }
  }

  const [foundPlayers, setFoundPlayers] = useState(players);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [checkedOption, setCheckedOption] = useState("General (Select All)");
  const [pitcher, setPitcher] = useState(null);
  const [batter, setBatter] = useState(null);

  const handleOnChange = event => {
    setPitcher(null);
    setBatter(null);
    setSelectedPlayers([]);
    setFoundPlayers(players);
    setCheckedOption(event.target.value);
  };


  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = players.filter((user) => {
        return user['name'].toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundPlayers(results.slice(0, 10));
    } else {
      setFoundPlayers(players);
    }

    setName(keyword);
  };

  const handleSubmit = event => {
    event.preventDefault();

  }

  useEffect(() => {
    updateFunc(selectedPlayers, checkedOption);
  }, [selectedPlayers, foundPlayers, checkedOption])

  const select = (user, i) => {
    if (checkedOption !== options[2]) {
      if (selectedPlayers.filter(p => p.name === players[i].name).length == 0) {
        setSelectedPlayers([...selectedPlayers, players[i]]);
      }
    }
    if (checkedOption === options[2]) {
      if (user.type === 0) {
        setBatter(user);
      } else {
        setPitcher(user);
      }
      let fp = players.filter(p => user.opponents.includes(p.name))
      setFoundPlayers(fp);
    }
  }

  const deselect = (user) => {
    if (checkedOption !== options[2]) {
      let sp = selectedPlayers.filter(item => item !== user)
      setSelectedPlayers(sp);
    } else {
      if (user.type === 0) {
        setBatter(null);
      } else {
        setPitcher(null);
      }
    }
  }

  const showVersus = () => {
    if (batter && pitcher) {
      updateFunc([pitcher, batter], checkedOption);
    }
  }

  return (
    <div className="container">
    {checkedOption !== "General (Select All)" &&
      <div>
        <input
          type="search"
          value={name}
          onChange={filter}
          className="input"
          placeholder="Filter"
        />
        <div className="user-list">
            {foundPlayers && foundPlayers.length > 0 ? (
              foundPlayers.map((user, i) =>
                selectedPlayers.filter(p => p.name === players[i].name).length > 0 ? (
                  <li key={i} className="user">
                    <a className={"user-name"} onClick={() => select(user, i)}>{user.name}</a>
                    <AiOutlineCheckCircle />
                  </li>
                ) : (
                <li key={i} className="user ">
                  <a className={"user-name"} onClick={() => select(user, i)}>{user.name}</a>
                </li>
              ))
            ) : (
              <div>No results found!</div>
            )}
        </div>
      </div>
    }
    <div className="modeContainer">
    {checkedOption === "Versus (PITCHER v BATTER)" &&
      <div className="versus">
        <div className="pitcher">Pitcher
          {pitcher && pitcher !== null ? (
              <li key={pitcher.name} className="user">
                <a className="user-name" onClick={() => deselect(pitcher)}>{pitcher.name}</a>
              </li>
            ) : (
              <div className="altText">Please select a pitcher</div>
            )}
        </div>
        <div className="batter">Batter
          {batter && batter !== null ? (
              <li key={batter.name} className="user">
                <a className="user-name" onClick={() => deselect(batter)}>{batter.name}</a>
              </li>
            ):(
              <div className="altText">Please select a batter</div>
            )}
        </div>
        <button className='versusButton' onClick={() => showVersus()}>See Comp</button>
      </div>
    }
      <form onSubmit={handleSubmit} className="formOptions">
      {checkedOption === "Multiple Select (Cumulative)" &&
        <div className="selected-user-list">
              {selectedPlayers && selectedPlayers.length > 0 ? (
                selectedPlayers.map((user, i) => (
                  <li key={i} className="user">
                    <a className="user-name" onClick={() => deselect(user)}>{user.name}</a>
                  </li>
                ))
              ) : (
                <div className="altText">Please select a player</div>
              )}
        </div>
      }
        <div className="formXContainer">
          <div className="formX">
            Modes
          </div>
          {options.map((f, index) => {
            return (
              <div className="formCheck" key={index}>
                <label>
                  <input
                    type="radio"
                    value={f}
                    checked={checkedOption === f}
                    onChange={handleOnChange}
                    className="formCheckInput"
                  />
                  {f}
                </label>
              </div>
          );
        })}
      </div>
      </form>
      </div>
    </div>
  );
}
