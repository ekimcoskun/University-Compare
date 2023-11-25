import React, { useEffect } from "react";
import Wallpaper from "../assets/wallpaper.jpg";
import Card from "../components/shared/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getUniversityCount,
  getUserCount,
} from "../store/slice/dashboard/dashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const totalUniversities = useSelector(
    (state) => state.dashboardSlice.universityCount.count
  );
  const totalUsers = useSelector(
    (state) => state.dashboardSlice.userCount.count
  );

  useEffect(() => {
    console.log(totalUniversities, totalUsers);
  }, [totalUniversities, totalUsers]);

  useEffect(() => {
    dispatch(getUniversityCount());
    dispatch(getUserCount());
  }, []);

  return (
    <div
      className="bg-fixed"
      style={{
        backgroundImage: `url(${Wallpaper})`,
        backgroundSize: "cover",
        height: "81vh",
      }}
    >
      <p className="text-white pt-10 text-center text-3xl font-semibold">
        Hoşgeldiniz!
      </p>
      <div className="h-full flex justify-center items-center">
        <div className="bg-opacity-50 bg-white p-4 rounded-lg shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <Card
              title="Toplam Üniversite Sayısı"
              statistic={totalUniversities}
            />
            <Card title="Toplam Kullanıcı Sayısı" statistic={totalUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
