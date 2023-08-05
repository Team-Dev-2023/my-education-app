//https://codesandbox.io/s/customized-filter-panel-ant-design-demo-7wns7?file=/index.js:2642-2656

import React, { useState, useEffect, useRef } from "react";

import { getListCourse } from "utils/helpers/workWithApi";

import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import get from "lodash.get";

const ListCourseAdminPage = () => {
  const [dataCourses, setDataCourses] = useState([]);

  useEffect(() => {
    getListCourse(setDataCourses);
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters, confirm);
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
              close();
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      return get(record, dataIndex)
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) => {
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      );
    },
  });

  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      onCell: (text) => <a>{text}</a>,
      ...getColumnSearchProps("title"),
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
      ...getColumnSearchProps(["lecturer", "uuid"]),
    },
    {
      title: "topic",
      dataIndex: ["topic", "name"],
      key: "name",
      sorter: (a, b) => a.topic.name.localeCompare(b.topic.name),
      ...getColumnSearchProps(["topic", "name"]),
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <a> {record.name ? "Approval" : "!Approval"}</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Table
        columns={columns}
        pagination={{
          position: "bottomCenter",
        }}
        dataSource={dataCourses}
        rowKey="uuid"
      />
    </div>
  );
};

export default ListCourseAdminPage;
