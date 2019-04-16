import React, { Component } from "react";
import { Button, Spinner } from "reactstrap";
import Fingerprint2 from "fingerprintjs2";

import "./App.css";
import KeyValueTable from "./components/KeyValueTable";

class App extends Component {
  state = {
    components: null,
    rows: [],
    fingerprint: null,
    loading: false
  };

  handleDumpClick = () => {
    const { components } = this.state;

    console.dir(components);

    console.log(JSON.stringify(components));
  };

  handleAnalyseClick = async () => {
    await this.setState({ loading: true });

    const self = this;

    // Never run it always after delay!
    Fingerprint2.get(function(components) {
      const rows = components.map(({ key, value }) => {
        let v = value;

        if (Array.isArray(value)) {
          v = value.map(JSON.stringify).join("\n");
        } else if (typeof value === "boolean") {
          v = JSON.stringify(value);
        }

        return {
          key,
          value: v
        };
      });

      self.setState({ loading: false, rows, components });
    });
  };

  render() {
    const { components, rows, loading } = this.state;
    return (
      <div className="App">
        <div className="App__Actions">
          <div className="App__Action">
            <Button color="primary" onClick={this.handleAnalyseClick}>
              Analyse
            </Button>
          </div>
          {!!components && (
            <div className="App__Action">
              <Button onClick={this.handleDumpClick}>Dump to console</Button>
            </div>
          )}
        </div>

        {loading ? <Spinner>a</Spinner> : <KeyValueTable rows={rows} />}
      </div>
    );
  }
}

export default App;
