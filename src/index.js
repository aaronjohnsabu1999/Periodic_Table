import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import PeriodicTableJSON from "./PeriodicTableJSON";

function Cell(props) {
  return (
    <div
      key={props.number}
      className="cell"
      data-category={props.category}
      style={{
        gridRowStart: props.ypos,
        gridColumnStart: props.xpos,
        visibility: props.visible ? "visible" : "hidden"
      }}
    >
      <span className="number">{props.number}</span>
      <span className="symbol">{props.symbol}</span>
      <span className="name">{props.name}</span>
    </div>
  );
}

function PeriodicTable(props) {
  const [state, setState] = useState(
    props.elements.reduce(
      (state, { category }) => Object.assign(state, { [category]: true }),
      {}
    )
  );
  return (
    <div className="table">
      <div className="cells">
        {props.elements.map(e =>
          Cell({
            ...e,
            visible: state[e.category]
          })
        )}
      </div>
      <div className="categories">
        {Object.keys(state).map(category => (
          <span key={category}>
            <input
              key={category}
              type="checkbox"
              name={category}
              checked={state[category]}
              onChange={event =>
                setState({
                  ...state,
                  ...{ [category]: event.target.checked }
                })
              }
            />
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}

function App(props) {
  return <PeriodicTable elements={props.elements} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(App(PeriodicTableJSON), rootElement);
