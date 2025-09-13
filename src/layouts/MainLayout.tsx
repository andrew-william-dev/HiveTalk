import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <NavBar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-none z-10">
          <SideBar />
        </div>

        <main className="flex-1 flex p-6 ml-[-400px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 justify-center overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
