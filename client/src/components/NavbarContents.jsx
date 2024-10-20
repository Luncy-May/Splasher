import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Home, Community, MyPlans, Profile, Setting, Support, About, Dashboard, Team, Calendar } from "../pages";

// Modify the function to accept userid as a parameter
const NavbarContents = (userid) => [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    element: <Home />
  },
  {
    title: "About",
    path: "/about",
    icon: <FaIcons.FaInfoCircle />,
    cName: "nav-text",
    element: <About />
  },
  {
    title: "Calendar",
    path: `/calendar/${userid}`, // Dynamic Calendar route
    icon: <FaIcons.FaCalendar />,
    cName: "nav-text",
    element: <Calendar />
  },
  {
    title: "My Plans",
    path: `/myPlans/${userid}`, // Dynamic MyPlans route
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
    element: <MyPlans />
  },
  {
    title: "Dashboard",
    path: `/dashboard/${userid}`, // Dynamic Dashboard route
    icon: <FaIcons.FaChartBar />,
    cName: "nav-text",
    element: <Dashboard />
  },
  {
    title: "Community",
    path: `/community/${userid}`,
    icon: <FaIcons.FaPeopleArrows />,
    cName: "nav-text",
    element: <Community />
  },
  // {
  //   title: "Team",
  //   path: `/team/${userid}`, // Dynamic Team route
  //   icon: <IoIcons.IoMdPeople />,
  //   cName: "nav-text",
  //   element: <Team />
  // },
  {
    title: "Profile",
    path: `/profile/${userid}`, // Dynamic Profile route
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
    element: <Profile />
  },
  // {
  //   title: "Setting",
  //   path: "/setting",
  //   icon: <FaIcons.FaCogs />,
  //   cName: "nav-text",
  //   element: <Setting />
  // },
  // {
  //   title: "Support",
  //   path: "/support",
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: "nav-text",
  //   element: <Support />
  // },
];

export default NavbarContents;
