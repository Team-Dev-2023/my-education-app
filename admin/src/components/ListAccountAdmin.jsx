import React from "react";
import { Table } from "antd";
import ColumnsAccount from "./columns/ColumnsAccount";

const ListAccountAdmin = ({ listAccount }) => {
  return (
    <div className="w-full">
      <Table
        columns={ColumnsAccount()}
        pagination={{
          position: "bottomCenter",
        }}
        dataSource={listAccount}
        rowKey="uuid"
      />
    </div>
  );
};

export default ListAccountAdmin;
