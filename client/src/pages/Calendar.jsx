import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotAuthorizedPage from './NotAuthorizedPage';
import { CalendarChart } from '../components';

const Calendar = () => {
    const { userid } = useParams(); // Fetch userid from the route parameters
    const loggedInuserid = localStorage.getItem("userid");
    const username = localStorage.getItem("username");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [planList, setPlanList] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        if (loggedInuserid && loggedInuserid === userid) {
            setIsLoggedIn(true);
            fetchPlansData();
            fetchTasksData();
        } else {
            setIsLoggedIn(false);
        }
    }, [userid, loggedInuserid]);

    const fetchPlansData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/view-all-plans/${userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch plans. Please try again.');
            }

            const data = await response.json();
            console.log(data)
            setPlanList(data.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTasksData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/view-all-tasks/${userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch plans. Please try again.');
            }

            const data = await response.json();
            console.log(data)
            setTaskList(data.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return <p className='text-2xl font-bold text-center'>Loading...</p>;
    }
    return (
        <div>
            <div className='pt-5 space-y-5 text-4xl font-bold flex flex-col items-center justify-center'>Calendar</div>
            {isLoggedIn ? (
                <div>
                    <CalendarChart planList={planList} taskList={taskList} />
                </div>
            ) : (
                <NotAuthorizedPage />
            )}
        </div>
    );
};

export default Calendar;
