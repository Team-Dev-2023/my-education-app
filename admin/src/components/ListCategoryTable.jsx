import React from "react";
import { Table } from "antd";
import ColumnsCategories from "./columns/ColumnsCategories";

const ListCategoryTable = ({ categories, showModal, setItemApproval }) => {
  return (
    <div className="w-full">
      <Table
        columns={ColumnsCategories(showModal, setItemApproval)}
        pagination={{
          position: "bottomCenter",
        }}
        dataSource={categories}
        rowKey="uuid"
      />
    </div>
  );
};

export default ListCategoryTable;
