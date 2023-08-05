import React from "react";
import { Table } from "antd";
import ColumnsCourses from "./columns/ColumnsCourses";

const ListCourseAdmin = ({ dataCourses, showModal, setItemApproval }) => {
  return (
    <div className="w-full">
      <Table
        columns={ColumnsCourses(showModal, setItemApproval)}
        pagination={{
          position: "bottomCenter",
        }}
        dataSource={dataCourses}
        rowKey="uuid"
      />
    </div>
  );
};

export default ListCourseAdmin;
