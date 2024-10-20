import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotAuthorizedPage from '../NotAuthorizedPage';

const Families = () => {
    const { userid } = useParams(); // Fetch userid from the route parameters
    const loggedInuserid = localStorage.getItem("userid");
    const username = localStorage.getItem("username");

    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (loggedInuserid && loggedInuserid === userid) {
            setIsLoggedIn(true);
            getProfile();
        } else {
            setIsLoggedIn(false);
        }
    }, [userid, loggedInuserid]);

    const getProfile = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://ec2-3-128-87-197.us-east-2.compute.amazonaws.com:8080/GetProfile/${userid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    userid: userid,
                    lastLogin: new Date(),
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.');
            }
            const data = await response.json();
            setError(data.message);
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <NotAuthorizedPage />
            ) : (
                <div className='pt-5 space-y-10 text-3xl font-bold p-20 flex flex-col justify-center items-center'>
                    <Link className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' to="/">Return to Home</Link>
                    <Link className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' to={`/team/${userid}`}>Return to Team</Link>
                    <h1>Hello, You can see your Family here</h1>
                </div>
            )}
        </div>
    );
};

export default Families;
