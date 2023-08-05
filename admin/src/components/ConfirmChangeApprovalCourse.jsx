import { Modal } from "antd";
import React from "react";

function ConfirmChangeApprovalCourse({
  isModalOpen,
  handleCancel,
  handleOk,
  itemApproval,
}) {
  return (
    <Modal
      title="Confirm Remove course"
      okButtonProps={{ style: { backgroundColor: "red" } }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <span>
        You definitely want to approval {""}
        <i className="text-[#141414ed] font-[700]">{itemApproval.title}</i>
      </span>
    </Modal>
  );
}

export default ConfirmChangeApprovalCourse;
