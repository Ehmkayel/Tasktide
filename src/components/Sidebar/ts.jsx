import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaBell, FaCommentDots, FaSearch, FaSignOutAlt, FaFileAlt, FaStar } from 'react-icons/fa';
import { FaUsersRectangle } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import LogoutModal from '../../pages/Auth/Logout';

export const SideBarData = [
  { title: 'Explore Events', icon: <FaSearch />, href: '/dashboard/explore-events' },
  { title: 'Community', icon: <FaUsersRectangle />, href: '/dashboard/community' },
  { title: 'Feedback & Review', icon: <FaCommentDots />, href: '/dashboard/feedback' },
  { title: 'Recommendation', icon: <FaStar />, href: '/dashboard/recommendation' },
  { title: 'Safety Form', icon: <FaFileAlt />, href: '/dashboard/safety-form' },
  { title: 'Notifications', icon: <FaBell />, href: '/dashboard/notifications' },
  { title: 'Logout', icon: <FaSignOutAlt />, action: 'logout' }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false); 
  
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const findUser = await getDoc(docRef);
        if (findUser.exists()) {
          setUserDetails(findUser.data());
        }
      }
    });
  };
  

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogoutClick = () => {
    setLogoutModalOpen(true)
  };

  const handleConfirmLogout = async () => {
    try {
      await auth.signOut();
      toast.info("You have logged out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    } finally {
      setLogoutModalOpen(false); 
    }
  };

  return (
    <section className="sidebar bg-gray-800 text-white h-screen w-20 lg:w-60 p-4">
      <div className='text-center'>
        <a href="/" className="heading font-bold text-primary text-2xl cursor-pointer mb-2">Fun<span className="text-secondary">Nest</span></a>
        <h2 className="text-2xl font-bold mb-6">Hi, {userDetails?.firstName || "Guest"}</h2>

      </div>
    
      <nav className="space-y-2 flex-grow flex flex-col">
        {SideBarData.map((menu) => {
          const isActive = location.pathname === menu.href;
          return menu.action === 'logout' ? (
            <div
              key={menu.title}
              onClick={handleLogoutClick} 
              className="flex items-center space-x-2 cursor-pointer p-2 rounded transition-colors lg:space-x-3 py-2 px-4 mb-4 hover:bg-secondary"
            >
              <span>{menu.icon}</span>
              <AnimatePresence>
                <motion.span
                  className="hidden lg:block whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                >
                  {menu.title}
                </motion.span>
              </AnimatePresence>
            </div>
          ) : (
            <Link key={menu.href} to={menu.href}>
              <motion.div
                className={`flex items-center space-x-2 cursor-pointer p-2 rounded transition-colors lg:space-x-3 py-2 px-4 mb-4 
                  ${isActive ? '' : 'hover:bg-secondary '}`}
              >
                <span>{menu.icon}</span>
                <AnimatePresence>
                  <motion.span
                    className="hidden lg:block whitespace-nowrap"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                  >
                    {menu.title}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout} 
      />
    </section>
  );
}

export default Sidebar;