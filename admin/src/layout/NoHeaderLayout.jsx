import { Outlet } from "react-router-dom";

function NoHeaderLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default NoHeaderLayout;
