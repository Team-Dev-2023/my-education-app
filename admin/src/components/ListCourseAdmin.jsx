import React from "react";
import { Table } from "antd";
import ColumnsCourses from "./columns/ColumnsCourses";

const ListCourseAdmin = ({ dataCourses }) => {
  return (
    <div className="w-full">
      <Table
        columns={ColumnsCourses()}
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
