import React, { Component } from "react";
import "./List.css";

class App extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="to">
        {data.map(r => {
          return (
            <div key={r.dst} className="item">
              {r.dst}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
