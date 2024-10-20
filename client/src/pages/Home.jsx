import React, { useState } from 'react';
import DisplayGrid from '../components/DisplayGrid';
import { StateImages } from '../components';
import NotAuthorizedPage from './NotAuthorizedPage';

const Home = ({ Darkmode }) => {
    const username = localStorage.getItem("username");
    const userid = localStorage.getItem("userid");

    const [isLoggedIn, setIsLoggedIn] = useState((userid !== null && userid !== undefined && userid !== ""));

    return (
        <div className="flex flex-col min-h-[80vh]">
            {/* Header Section */}
            <header className="p-5 text-4xl font-bold text-center">
                Welcome to Splasher
            </header>

            {/* Main Content */}
            {isLoggedIn ? (
                <div className="flex-grow flex justify-center items-center overflow-x-auto">
                    {/* Ensure DisplayGrid is constrained horizontally */}
                        <DisplayGrid listOfItems={StateImages} />
                </div>
            ) : (
                <div className="flex-grow flex flex-col items-center justify-center">
                    <NotAuthorizedPage />
                </div>
            )}
        </div>
    );
}

export default Home;
