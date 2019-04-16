import React, { Component } from "react";

import { Table } from "reactstrap";

const KeyValueTable = ({ rows = [] }) => {
  return (
    <Table dark striped className="KeyValueTable">
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ key, value }) => (
          <tr key={key} className="KeyValueTable__Row">
            <th
              scope="row"
              className="KeyValueTable__RowItem KeyValueTable__RowItemKey"
            >
              {key}
            </th>
            <td className="KeyValueTable__RowItem">{value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default KeyValueTable;
