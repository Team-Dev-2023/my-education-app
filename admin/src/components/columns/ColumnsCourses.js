//https://codesandbox.io/s/customized-filter-panel-ant-design-demo-7wns7?file=/index.js:2642-2656

import React from "react";
import SearchColumnTable from "components/columns/SearchColumnTable";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { generatePath } from "react-router-dom/dist";
import { ROUTES } from "constants/routes";

const ColumnsCourses = (showModal, setItemApproval) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            navigate(
              generatePath(ROUTES.ADMIN.PREVIEW_COURSE, {
                uuid: record.uuid,
              })
            );
          },
        };
      },
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
        <Button
          size="middle"
          onClick={() => {
            showModal();
            setItemApproval(record);
          }}
        >
          <a> {record.name ? "Approval" : "!Approval"}</a>
        </Button>
      ),
    },
  ];
  return columns;
};

export default ColumnsCourses;
