import { Modal } from "antd";
import React from "react";

function ConfirmRemoveModal({
  isModalOpen,
  handleCancel,
  handleOk,
  itemDelete,
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
        You definitely want to remove{" "}
        <i className="text-[#141414ed] font-[700]">{itemDelete.title}</i> from
        the cart{" "}
      </span>
    </Modal>
  );
}

export default ConfirmRemoveModal;
