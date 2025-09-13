import { Home, Users, ChevronDown, ChevronUp, ChartColumn, ClockFading } from "lucide-react";
import { useState, type JSX } from "react";

export default function SideBar() {
  const generalItems = [
    { label: "Home", icon: <Home /> },
    { label: "Popular", icon: <ChartColumn /> },
  ];

  const recentItems = [
    { label: "HiveTalk News", icon: <ClockFading /> },
    { label: "Trending", icon: <ClockFading /> },
  ];

  const communityItems = [
    { label: "Tech Talk", icon: <Users /> },
    { label: "Gaming", icon: <Users /> },
    { label: "Music", icon: <Users /> },
  ];

  const [generalOpen, setGeneralOpen] = useState(true);
  const [recentOpen, setRecentOpen] = useState(true);
  const [communityOpen, setCommunityOpen] = useState(true);

  const SidebarItem = ({ icon, label }: { icon: JSX.Element; label: string }) => (
    <li className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-700 rounded-md transition-colors duration-200">
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
    items: { label: string; icon: JSX.Element }[];
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
            <SidebarItem key={item.label} icon={item.icon} label={item.label} />
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
