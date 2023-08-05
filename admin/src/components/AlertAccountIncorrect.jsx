import React, { useEffect } from "react";
import { notification } from "antd";

function AlertAccountIncorrect({
  isAlertAccountIncorrect,
  setIsAlertAccountIncorrect,
}) {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithSuccess = (type) => {
    api[type]({
      message: "Account Incorrect",
    });
  };
  useEffect(() => {
    isAlertAccountIncorrect && openNotificationWithSuccess("warning");
    setIsAlertAccountIncorrect(false);
  }, [isAlertAccountIncorrect]);
  return <div>{contextHolder}</div>;
}

export default AlertAccountIncorrect;
