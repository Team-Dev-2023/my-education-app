import React, { useEffect } from "react";
import { notification } from "antd";

function AlertSaveInfoProfileSuccess({
  isAlertSaveInfoProfileSuccess,
  setIsAlertSaveInfoProfileSuccess,
}) {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithSuccess = (type) => {
    api[type]({
      message: "Saved profile",
    });
  };
  useEffect(() => {
    isAlertSaveInfoProfileSuccess && openNotificationWithSuccess("success");
    setIsAlertSaveInfoProfileSuccess(false);
  }, [isAlertSaveInfoProfileSuccess]);
  return <div>{contextHolder}</div>;
}

export default AlertSaveInfoProfileSuccess;
