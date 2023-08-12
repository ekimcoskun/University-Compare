import React, { useEffect, useState } from "react";
import "./tabStyles.css";
import { useLocation } from "react-router-dom";

const Tab = ({ tabs }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const edit = params.get("editAnnouncement");
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    if (edit) {
      setActiveTab(2);
    }
  }, []);

  return (
    <div className="">
      <ul className="inline-flex w-full px-1 pt-2 mb-5">
        {tabs?.length > 0 &&
          tabs.map((tab) => (
            <li
              key={tab.id}
              className={`${
                activeTab === tab.id
                  ? "border-red-400 text-red-400  -mb-px border-b-2"
                  : " text-[#ffff] hover:text-red-400"
              } px-4 py-2 font-semibold cursor-pointer text-center w-full rounded-t `}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </li>
          ))}
      </ul>
      {tabs?.length > 0 &&
        tabs.map((tab) => (
          <div key={tab.id} className={`tab-content ${activeTab === tab.id ? "active" : ""}`}>
            {activeTab === tab.id && tab.content}
          </div>
        ))}
    </div>
  );
};

export default Tab;
