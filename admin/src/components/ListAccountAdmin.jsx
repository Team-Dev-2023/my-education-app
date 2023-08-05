//https://codesandbox.io/s/customized-filter-panel-ant-design-demo-7wns7?file=/index.js:2642-2656

import React, { useState, useEffect, useRef } from "react";
import { getListAccount } from "utils/helpers/workWithApi";
import { Table } from "antd";
import ColumnsAccount from "./columns/ColumnsAccount";
import { CircularProgress } from "@mui/material";

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
