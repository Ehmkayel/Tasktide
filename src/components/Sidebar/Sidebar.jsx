import React from "react";
import { FaSearch, FaUsers, FaCalendarAlt, FaCog, FaSignOutAlt } from "react-icons/fa"; // Import icons
import { motion, AnimatePresence } from "framer-motion";

export const SideBarData = [
  { title: "Dashboard", icon: <FaSearch />, href: "/dashboard" },
  { title: "Tasks", icon: <FaUsers />, href: "/tasks" },
  { title: "Calendar", icon: <FaCalendarAlt />, href: "/calendar" },
  { title: "Settings", icon: <FaCog />, href: "/settings" },
  { title: "Logout", icon: <FaSignOutAlt />, action: "logout" },
];

const Sidebar = () => {
  return (
    <motion.div
      className="h-screen w-64 bg-blue-900 text-white flex flex-col"
      initial={{ x: -300 }}
      animate={{ x: 0 }} 
      exit={{ x: -300 }}
      transition={{ duration: 0.5 }} 
    >
      {/* App Logo */}
      <div className="flex items-center justify-center h-16 bg-blue-800">
        <h1 className="text-2xl font-bold">Task Tide</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2 flex-grow flex flex-col px-4 py-6">
        <AnimatePresence>
          {SideBarData.map((menu, index) => (
            <motion.a
              key={index}
              href={menu.href}
              className="flex items-center p-2 rounded hover:bg-blue-700"
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -50 }} 
              transition={{ delay: index * 0.1, duration: 0.3 }} 
            >
              <span className="text-xl mr-3">{menu.icon}</span>
              {menu.title}
            </motion.a>
          ))}
        </AnimatePresence>
      </nav>

      {/* Footer */}
      <div className="h-16 bg-blue-800 flex items-center justify-center">
        <p className="text-sm">&copy; 2024 Task Tide</p>
      </div>
    </motion.div>
  );
};

export default Sidebar;
