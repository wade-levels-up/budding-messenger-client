import { useEffect, useState, useCallback } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DashHeader from "../components/ui/DashHeader";
import DashMain from "../components/ui/DashMain";
import DashSideNav from "../components/ui/DashSideNav";
import DashFooter from "../components/ui/DashFooter";
import LoadingSpinner from "../components/ui/LoadingSpinner";

type Friend = {
  username: string;
  profile_picture_path: string;
  joined: string;
  bio: string;
};

type UserData = {
  username: string;
  bio: string;
  joined: string;
  profile_picture_path: string;
  friendsOf: Friend[];
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [recipient, setRecipient] = useState({});

  const getUserData = useCallback(async () => {
    setUserData(null);
    try {
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
      setUserData(data.userData);
    } catch {
      // To-do display error
      navigate("/error");
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    getUserData();
  }, [navigate, getUserData]);

  if (!userData) return <LoadingSpinner />;

  return (
    <>
      <div className="relative min-h-full w-full grow flex flex-col lg:grid lg:grid-cols-[250px_1fr] lg:grid-rows-[80px_1fr_30px] rounded-xl p-2 shadow-md">
        <DashHeader username={userData.username} />
        <DashMain>
          <Outlet
            context={{
              userData,
              getUserData,
              recipient,
              setRecipient,
            }}
          />
        </DashMain>
        <DashSideNav />
        <DashFooter />
      </div>
    </>
  );
};

export default Dashboard;
