import SearchColumnTable from "components/columns/SearchColumnTable";
import { Button } from "antd";

import React from "react";

const ColumnsAccount = () => {
  const columns = [
    {
      title: "firstName",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      onCell: (text) => <a>{text}</a>,
      ...SearchColumnTable("firstName"),
    },
    {
      title: "createdBy",
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
      onCell: (text) => <a>{text}</a>,
      ...SearchColumnTable("createdBy"),
    },
    {
      title: "role ",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role - b.role,
    },
  ];
  return columns;
};

export default ColumnsAccount;
