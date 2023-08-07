import SearchColumnTable from "components/columns/SearchColumnTable";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { generatePath } from "react-router-dom/dist";
import { ROUTES } from "constants/routes";

const ColumnsCategories = (showModal, setItemApproval) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      ...SearchColumnTable("name"),
    },
    {
      title: "uuid",
      dataIndex: "uuid",
      key: "uuid",
      sorter: (a, b) => a.uuid - b.uuid,
    },
    {
      title: "createdBy ",
      dataIndex: "createdBy",
      key: "createdBy",
      //   sorter: (a, b) => a.createdBy - b.createdBy,
    },
    {
      title: "createdAt ",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => {
        const dateStringA = a.createdAt;
        const dateStringB = b.createdAt;
        const dateObjectA = new Date(dateStringA);
        const dateObjectB = new Date(dateStringB);
        const unixTimestampA = dateObjectA.getTime() / 1000; // Convert milliseconds to seconds
        const unixTimestampB = dateObjectB.getTime() / 1000; // Convert milliseconds to seconds

        if (unixTimestampA !== unixTimestampB) {
          return unixTimestampA > unixTimestampB ? 1 : -1;
        }
        return 0;
      },
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

export default ColumnsCategories;
