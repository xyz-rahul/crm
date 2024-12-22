import { useAuthStore } from "@/lib/authStore"
import { Calendar, Home, Inbox, LogOut } from "lucide-react"

import { Link, useNavigate } from 'react-router'
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Leads",
        url: "/leads",
        icon: Inbox,
    },
    {
        title: "User",
        url: "/users",
        icon: Calendar,
    },
]


export default function AppSidebar() {
    const navigate = useNavigate();
    return (
        <div className="px-3 py-4  bg-gray-50 dark:bg-gray-800 w-[250px] h-screen">
            <ul className="space-y-2 font-medium">
                {items.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.url}
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <item.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            <span className="ms-3">{item.title}</span>
                        </Link>
                    </li>
                ))}


                <li>
                    <button
                        className="flex items-center p-2 text-gray-900 cursor-pointer rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        onClick={() => {
                            useAuthStore.logout();
                            navigate('/login');

                        }}
                    >
                        <LogOut />
                        <span className="ms-3">Logout</span>
                    </button>
                </li>

            </ul>
        </div>
    )
}

