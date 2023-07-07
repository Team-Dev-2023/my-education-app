import React, { useEffect } from "react";
import { notification } from "antd";

function AlertSaveInfoCourseSuccess({
  isAlertSaveInfoCourseSuccess,
  setIsAlertSaveInfoCourseSuccess,
}) {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithSuccess = (type) => {
    api[type]({
      message: "Saved data course",
    });
  };
  useEffect(() => {
    isAlertSaveInfoCourseSuccess && openNotificationWithSuccess("success");
    setIsAlertSaveInfoCourseSuccess(false);
  }, [isAlertSaveInfoCourseSuccess]);
  return <div>{contextHolder}</div>;
}

export default AlertSaveInfoCourseSuccess;
