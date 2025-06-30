import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashHeader from "../components/ui/DashHeader";
import DashMain from "../components/ui/DashMain";
import DashSideNav from "../components/ui/DashSideNav";
import DashFooter from "../components/ui/DashFooter";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usersJoinDate, setUsersJoinDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const getUserData = async () => {
      const response = await fetch("http://localhost:3000/users/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        localStorage.clear();
        navigate("/");
        return;
      }

      const data = await response.json();
      if (!data.userData) {
        navigate("/");
        return;
      }

      localStorage.setItem("username", data.userData.username);
      setUsersJoinDate(data.userData.joined);
      setUsername(data.userData.username);
    };

    getUserData();
  });

  return (
    <div className="relative w-full grow flex flex-col lg:grid lg:grid-cols-[200px_1fr] lg:grid-rows-[80px_1fr_30px] rounded-lg p-2 shadow-md">
      <DashHeader username={username} joined={usersJoinDate} />
      <DashMain />
      <DashSideNav />
      <DashFooter />
    </div>
  );
};

export default Dashboard;
