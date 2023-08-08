import { Modal } from "antd";
import React from "react";

function ConfirmRemovingCategory({
  isModalOpen,
  handleCancel,
  handleOk,
  itemRemoved,
}) {
  return (
    <Modal
      title="Confirm Remove Category"
      okButtonProps={{ style: { backgroundColor: "red" } }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <span>
        Confirm removing this category? {""}
        <i className="text-[#141414ed] font-[700]">{itemRemoved.title}</i>
      </span>
    </Modal>
  );
}

export default ConfirmRemovingCategory;
