import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Tab from "../../components/tab/Tab";
import UniversityTab from "../../components/tab/adminEditTabs/UniversityTab";
import UserTab from "../../components/tab/adminEditTabs/UserTab";

const Edit = () => {
  const tabs = [
    {
      id: 1,
      label: "Üniversiteler",
      content: <UniversityTab />,
    },
    {
      id: 2,
      label: "Kullanıcılar",
      content: <UserTab />,
    },
  ];
  return (
    <div className="mt-5 p-2">
      <Tab tabs={tabs} />
    </div>
  );
};

export default Edit;
