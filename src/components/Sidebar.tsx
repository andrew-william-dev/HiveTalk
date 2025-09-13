import { Home, Users, ChevronDown, ChevronUp, ChartColumn, ClockFading } from "lucide-react";
import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const generalItems = [
    { label: "Home", icon: <Home />, url:'/home'},
    { label: "Popular", icon: <ChartColumn /> , url:'/'},
  ];

  const recentItems = [
    { label: "HiveTalk News", icon: <ClockFading /> , url:'/'},
    { label: "Trending", icon: <ClockFading /> , url:'/'},
  ];

  const communityItems = [
    { label: "Tech Talk", icon: <Users /> , url:'/'},
    { label: "Gaming", icon: <Users /> , url:'/'},
    { label: "Music", icon: <Users /> , url:'/'},
  ];

  const [generalOpen, setGeneralOpen] = useState(true);
  const [recentOpen, setRecentOpen] = useState(true);
  const [communityOpen, setCommunityOpen] = useState(true);
  const navigate = useNavigate()

  const SidebarItem = ({ icon, label, url }: { icon: JSX.Element; label: string, url: string }) => (
    <li className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-700 rounded-md transition-colors duration-200" onClick={() => navigate(url)}>
      {icon}
      <span>{label}</span>
    </li>
  );

  const SidebarSection = ({
    title,
    items,
    isOpen,
    setIsOpen,
  }: {
    title: string;
    items: { label: string; icon: JSX.Element, url: string }[];
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
  }) => (
    <div className="mb-4">
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-700 rounded-md transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{title}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && (
        <ul className="mt-2 flex flex-col gap-1">
          {items.map((item) => (
            <SidebarItem key={item.label} icon={item.icon} label={item.label} url={item.url} />
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white h-screen p-4 border-r-2 border-gray-700 overflow-y-auto">
      <SidebarSection
        title="General"
        items={generalItems}
        isOpen={generalOpen}
        setIsOpen={setGeneralOpen}
      />
      <SidebarSection
        title="Recent"
        items={recentItems}
        isOpen={recentOpen}
        setIsOpen={setRecentOpen}
      />
      <SidebarSection
        title="Communities"
        items={communityItems}
        isOpen={communityOpen}
        setIsOpen={setCommunityOpen}
      />
    </aside>
  );
}
