import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import NavbarContents from './NavbarContents';
import { IconContext } from 'react-icons';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [userid, setUserid] = useState(localStorage.getItem("userid")); // Initialize from localStorage
    const showSidebar = () => setSidebar(!sidebar);
    useEffect(() => {
        const handleStorageChange = () => {
            setUserid(localStorage.getItem("userid")); // Update state when userid changes
        };

        // Listen for changes to localStorage
        window.addEventListener('storage', handleStorageChange);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                {/* Navbar */}
                <div className="bg-gray-800 h-20 flex items-center z-50 text-center text-white text-4xl justify-center">
                    <div className="flex-1 flex justify-start ml-8">
                        <Link to="#" className="text-2xl">
                            <FaIcons.FaBars onClick={showSidebar} className="text-white cursor-pointer" />
                        </Link>
                    </div>
                    <div className="flex-1 flex justify-center text-4xl font-bold font-serif text-white">
                        <span className="text-gradient">Splasher</span>
                    </div>
                    <div className="flex-1 flex justify-end mr-8"></div>
                </div>

                {/* Sidebar */}
                <nav className={`bg-gray-800 w-60 h-screen flex z-50 justify-center fixed top-0 transition-all duration-350 ${sidebar ? 'left-0' : '-left-full'}`}>
                    <ul className="w-full">
                        <li className="bg-gray-800 h-20 flex items-center justify-start">
                            <div className="ml-8 text-2xl cursor-pointer">
                                <AiIcons.AiOutlineClose className="text-white" onClick={showSidebar} />
                            </div>
                        </li>
                        {NavbarContents(userid).map((item, index) => (
                            <li key={index} className="flex items-center h-16 px-4">
                                <Link
                                    to={item.path}
                                    className="w-full h-full flex items-center text-white text-lg no-underline hover:bg-blue-600 transition-colors duration-200 rounded-md"
                                >
                                    {item.icon}
                                    <span className="ml-4">{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {NavbarContents(userid).map((item, index) => (
                    <Link key={index} to={item.path} />
                ))}
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
