import React, { useEffect, useState } from "react";
import ListAccountAdmin from "components/ListAccountAdmin";
import { getListAccount } from "utils/helpers/workWithApi";
import { CircularProgress } from "@mui/material";

function ListAccountPage() {
  const [isLoad, setIsLoad] = useState(true);
  const [listAccount, setListAccount] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    getListAccount(accessToken, setListAccount, setIsLoad);
  }, []);
  return (
    <div className="bg-[#bbb5b633] py-2 px-4 w-full">
      <h4 className="mb-4 font-[600] text-[20px]">List Account</h4>
      {isLoad ? (
        <div className="container mx-auto h-32 flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <ListAccountAdmin listAccount={listAccount} />
      )}
    </div>
  );
}

export default ListAccountPage;
