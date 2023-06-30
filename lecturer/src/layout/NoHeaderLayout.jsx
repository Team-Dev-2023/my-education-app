import { Outlet } from "react-router-dom";

import Footer from "components/Footer";

function NoHeaderLayout() {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default NoHeaderLayout;
