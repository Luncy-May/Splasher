import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotAuthorizedPage from './NotAuthorizedPage';
import { ProgressPie, Histogram, ShortCut, LineGraph } from '../components';

const Dashboard = () => {
    const { userid } = useParams(); // Fetch userid from the route parameters
    const loggedInuserid = localStorage.getItem("userid");
    const username = localStorage.getItem("username");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dashboardData, setDashboardData] = useState(null); // Add state to store the dashboard data
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if the logged-in user's ID matches the route's userid
        if (loggedInuserid && loggedInuserid === userid) {
            setIsLoggedIn(true);
            fetchDashboardData();
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
        }
    }, [userid, loggedInuserid]);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/get-dashboard/${userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data. Please try again.');
            }

            const data = await response.json();
            console.log(data.data)
            setDashboardData(data.data); 
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <NotAuthorizedPage />;
    }

    return (
        <div className='pl-[10vw] space-y-10 p-3 mt-[5vh] overflow-hidden'>
            <div className='pt-5 space-y-5 text-4xl font-bold'>{username}'s Dashboard</div>

            {/* Ensure dashboardData is available before rendering */}
            {dashboardData ? (
                <>
                    <div className='flex justify-between items-center w-[1400px]'>
                        <div className='flex-shrink-0 w-1/2 h-[200px]'>
                            <ProgressPie data={dashboardData} /> {/* Pass the data to the components */}
                        </div>
                        <div className='flex-shrink-0 w-1/2 h-[200px]'>
                            <ShortCut data={dashboardData} /> {/* Pass the data to the components */}
                        </div>
                    </div>

                    <div>
                        <Histogram data={dashboardData} /> {/* Pass the data to the components */}
                    </div>
                </>
            ) : (
                <div>No dashboard data available</div>
            )}

            {error && <div className="text-red-500">Error: {error}</div>}
        </div>
    );
};

export default Dashboard;
