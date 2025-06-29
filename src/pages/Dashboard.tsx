import DashHeader from "../components/ui/DashHeader";
import DashMain from "../components/ui/DashMain";
import DashSideNav from "../components/ui/DashSideNav";
import DashFooter from "../components/ui/DashFooter";

const Dashboard = () => {
  return (
    <div className="relative w-full grow flex flex-col lg:grid lg:grid-cols-[200px_1fr] lg:grid-rows-[80px_1fr_30px] rounded-lg p-2 shadow-md">
      <DashHeader />
      <DashMain />
      <DashSideNav />
      <DashFooter />
    </div>
  );
};

export default Dashboard;
