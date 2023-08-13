//https://codesandbox.io/s/customized-filter-panel-ant-design-demo-7wns7?file=/index.js:2642-2656
import SearchColumnTable from "components/columns/SearchColumnTable";

const ColumnsAccount = () => {
  const columns = [
    {
      title: "firstName",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      // onCell: (text) => <a>{text}</a>,
      ...SearchColumnTable("firstName"),
    },
    {
      title: "createdBy",
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
      // onCell: (text) => <a>{text}</a>,
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
