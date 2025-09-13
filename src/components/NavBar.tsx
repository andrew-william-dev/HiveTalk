import { Bell, Plus, Search, X, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { STATUS } from "../constants/objects/status";
import { useNavigate } from "react-router-dom";


export default function NavBar() {
    const [searchActive, setSearchActive] = useState<boolean>(false);
    const { status } = useAuth()
    const navigate = useNavigate();
    const { user } = useAuth() as {
        user: {
            profilePicUrl?: string;
        } | null;
    }

    const NavItem = ({ Icon, text, url }: { Icon: LucideIcon; text: string, url: string }) => (
        <li className="flex items-center gap-2 cursor-pointer"  onClick={() => navigate(url)} >
            {Icon && <Icon />}
            {text}
        </li>
    );

    return (
        <div className="flex top-0 p-4 bg-gradient-to-tr from-gray-700 via-gray-600 to-gray-500 border-b-2 border-b-gray-700 flex-row justify-between items-center">
            <p style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem' }}>
                HiveTalk
            </p>

            <div className="relative">
                <Search
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-white transition-opacity duration-300 ${searchActive ? "opacity-0" : "opacity-100"
                        }`}
                />

                <input
                    type="text"
                    className={`pr-4 py-2 w-[500px] text white rounded-full  bg-gray-500 transition-all duration-300 ${searchActive ? "pl-6" : "pl-12"
                        }`}
                    placeholder="Search HiveTalk"
                    onFocus={() => setSearchActive(true)}
                    onBlur={() => setSearchActive(false)}
                />

                <X
                    className={`absolute right-5 w-6 border-2 border-white rounded-full top-1/2 transform -translate-y-1/2 text-white cursor-pointer transition-opacity duration-300 ${searchActive ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setSearchActive(false)}
                />
            </div>

            <ul className="flex flex-row gap-12">
                <NavItem Icon={Plus} text="Create" url="/create"/>
                <NavItem Icon={Bell} text="" url="/home" />
                {status === STATUS.unauthorized ? <button className="w-[100px] py-2 bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold text-gray-900 transition" onClick={() => {
                    navigate('/login')
                }}>
                    Login
                </button> :
                    <div>
                        <img
                            src={
                                user?.profilePicUrl
                                    ? `${import.meta.env.VITE_APP_BACKEND_URL}${user?.profilePicUrl}`
                                    : "https://picsum.photos/150?random=2"
                            }
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover border border-gray-600"
                            onClick={() => navigate('/profile')}
                        />

                    </div>
                }
            </ul>
        </div>
    );
}
