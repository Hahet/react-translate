import React, { Component } from "react";
import "./index.css";
import List from "./List";
const post = (url, data) => {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    headers: {
      "content-type": "application/json"
    },
    method: "POST" // *GET, POST, PUT, DELETE, etc.
  }).then(response => response.json()); // parses response to JSON
};

const languages = {
  en: "英文",
  zh: "中文"
};

class Translate extends Component {
  state = {
    from: "en",
    to: "zh",
    query: "",
    results: []
  };

  apiTranslate = () => {
    const { from, to, query } = this.state;
    let data = {
      from,
      to,
      q: query
    };

    // let data = {
    //   from: from,
    //   to:to,
    //   q: query
    // };
    post("/translate", data).then(data => {
      this.setState({
        results: data.trans_result
      });
    });
  };

  handleSwapClick = () => {
    const { from, to } = this.state;
    this.setState(
      {
        from: to,
        to: from
      },
      () => {
        this.apiTranslate();
      }
    );
  };

  handleChange = e => {
    let query = e.target.value;
    console.log("query", query);
    this.setState({
      // query: query
      query
    });
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.apiTranslate();
    }
  };

  render() {
    const { query, from, to, results } = this.state;
    // const query = this.state.query
    return (
      <div className="App">
        <div className="title">
          <i className="material-icons">g_translate</i>
          <div className="name">My Translate</div>
        </div>
        <div className="header">
          <div className="from-language">{languages[from]}</div>

          <div onClick={this.handleSwapClick} className="swap">
            <i className="material-icons">swap_horiz</i>
          </div>
          <div className="to-language">{languages[to]}</div>
        </div>
        <div className="from">
          <textarea
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            placeholder="输入要翻译的文本"
            value={query}
            className="source"
            name="source"
            id="textarea"
            cols="30"
            rows="5"
          />
        </div>
        <List data={results} />
      </div>
    );
  }
}

export default Translate;
