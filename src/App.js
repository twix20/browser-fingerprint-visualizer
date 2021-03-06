import React, { Component } from "react";
import { Button, Spinner } from "reactstrap";
import Fingerprint2 from "fingerprintjs2";
import md5 from "md5";

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

  handleDumpFingerpint = () => {
    const { components } = this.state;
    const paramKeys = [
      "userAgent",
      "language",
      "colorDepth",
      "timezone",
      "localStorage",
      "platform",
      "webglVendorAndRenderer"
    ];

    const values = components.filter(c => paramKeys.includes(c.key));

    const concatedValues = values.map(v => v.value).join(",");
    const hash = md5(concatedValues);

    const result = {
      values,
      hash
    };

    console.log(concatedValues + "," + hash);
    console.log(JSON.stringify(result));
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
            <React.Fragment>
              <div className="App__Action">
                <Button onClick={this.handleDumpClick}>Dump to console</Button>
              </div>
              <div className="App__Action">
                <Button onClick={this.handleDumpFingerpint}>Dump fingerpint</Button>
              </div>
            </React.Fragment>
          )}
        </div>

        {loading ? <Spinner>a</Spinner> : <KeyValueTable rows={rows} />}
      </div>
    );
  }
}

export default App;
