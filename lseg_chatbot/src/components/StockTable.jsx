import React from "react";
import { Space, Table, Tag } from "antd";

//reusable Table to display Stock details
const StockTable = ({ columns, data, handleRowClick = () => {} }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="small"
      onRow={(record) => ({
        onClick: () => handleRowClick(record), // Handling row click
      })}
    />
  );
};

export default StockTable;
