import SearchColumnTable from "components/columns/SearchColumnTable";
import { Button } from "antd";

import React from "react";

const ColumnsCourses = () => {
  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      onCell: (text) => <a>{text}</a>,
      //use onCell will Warning: Invalid value for prop `$$typeof` on <td> tag
      ...SearchColumnTable("title"),
    },
    {
      title: "Price ",
      dataIndex: "price",
      key: "price 1",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Price Discount",
      dataIndex: "priceAfterDiscount",
      key: "priceAfterDiscount",
      sorter: (a, b) => a.priceAfterDiscount - b.priceAfterDiscount,
    },
    {
      title: "lecturer",
      dataIndex: ["lecturer", "uuid"],
      key: "uuid",
      ...SearchColumnTable(["lecturer", "uuid"]),
    },
    {
      title: "topic",
      dataIndex: ["topic", "name"],
      key: "name",
      sorter: (a, b) => a.topic.name.localeCompare(b.topic.name),
      ...SearchColumnTable(["topic", "name"]),
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <Button size="middle">
          <a> {record.name ? "Approval" : "!Approval"}</a>
        </Button>
      ),
    },
  ];
  return columns;
};

export default ColumnsCourses;
