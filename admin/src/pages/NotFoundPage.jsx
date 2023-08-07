import React from "react";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";

function NotFoundPage() {
  return (
    <div className="container mx-auto h-screen text-[80px] flex flex-col justify-center items-center">
      <DoNotDisturbOffIcon fontSize="inherit" color="error" />
      <h2 className="text-[50px] font-bold leading-[1.5] underline">
        Not Found
      </h2>
    </div>
  );
}

export default NotFoundPage;
