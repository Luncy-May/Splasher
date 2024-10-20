import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChalkboard, FaUsers, FaUserFriends } from 'react-icons/fa';
import NotAuthorizedPage from './NotAuthorizedPage';

const Team = () => {
    const { userid } = useParams(); // Fetch userid from the route parameters
    const loggedInuserid = localStorage.getItem("userid");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInuserid && loggedInuserid === userid) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [userid, loggedInuserid]);

    const navigateTo = (path) => {
        navigate(`/personal/${path}/${userid}`);
    };

    return (
        <div>
            <div className='pt-5 space-y-5 text-4xl font-bold flex flex-col items-center justify-center'>Team</div>
            {isLoggedIn ? (
                <div className='space-y-10 p-3 mt-[5vh] overflow-hidden'>
                    <div className='flex justify-between pl-[1vw] mt-[5vh] overflow-hidden'>
                        <div
                            onClick={() => navigateTo("clubs")}
                            className='text-4xl font-bold border min-h-[200px] min-w-[400px] flex items-center justify-center cursor-pointer'
                        >
                            <FaChalkboard size={50} /> <span className='ml-2'>Clubs</span>
                        </div>

                        <div
                            onClick={() => navigateTo("families")}
                            className='text-4xl font-bold border min-h-[200px] min-w-[400px] flex items-center justify-center cursor-pointer'
                        >
                            <FaUsers size={50} /> <span className='ml-2'>Families</span>
                        </div>

                        <div
                            onClick={() => navigateTo("friends")}
                            className='text-4xl font-bold border min-h-[200px] min-w-[400px] flex items-center justify-center cursor-pointer'
                        >
                            <FaUserFriends size={50} /> <span className='ml-2'>Friends</span>
                        </div>
                    </div>
                </div>
            ) : (
                <NotAuthorizedPage />
            )}
        </div>
    );
};

export default Team;
