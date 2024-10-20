import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Activities, Feed, FindClubs, FindFriends, Gallery, Reel } from './CommunityPages';
import { CommunityNavbar } from '../components';

const Community = ({ Darkmode }) => {
    const { userid } = useParams(); // Fetch userid from route params
    const loggedInuserid = localStorage.getItem("userid");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(loggedInuserid === userid || loggedInuserid !== null);
    }, [userid, loggedInuserid]);

    return (
        <div>
            <div className="space-y-10 p-3 overflow-hidden">
                <div className="flex flex-col items-center justify-center">
                    <div className="pt-5 space-y-5 text-4xl font-bold">Welcome to the Splasher Community</div>
                    <CommunityNavbar />
                </div>
                
                <Routes>
                    {/* Make the Reel page accessible to all */}
                    <Route path="/" element={<Reel userid={userid} />} /> 
                    {/* Make these pages require a logged-in user */}
                    {isLoggedIn ? (
                        <>
                            <Route path="gallery/:userid" element={<Gallery />} />
                        </>
                    ) : (
                        <Route path="/" element={<Reel />} />
                    )}
                </Routes>
            </div>
        </div>
    );
}

export default Community;
