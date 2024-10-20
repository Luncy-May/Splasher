import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plan, PlanForm } from '../components';
import NotAuthorizedPage from './NotAuthorizedPage';
import { FaPlusCircle, FaStar } from 'react-icons/fa';

const MyPlans = () => {
  const { userid } = useParams(); // Fetch userid from the route parameters
  const loggedInuserid = localStorage.getItem("userid");
  const username = localStorage.getItem("username");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [planList, setPlanList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [addPlan, setAddPlan] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false); // Track whether we are showing favorite plans

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
      console.log(data);
      setPlanList(data.data); // Update the planList state with the fetched data
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
        throw new Error('Failed to fetch tasks. Please try again.');
      }

      const data = await response.json();
      console.log(data);
      setTaskList(data.data); // Update the taskList state with the fetched data
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPlan = () => setAddPlan(!addPlan);

  const handleFavoriteToggle = () => {
    setShowFavorites(!showFavorites); // Toggle between showing all plans and favorite plans
  };

  const tasksInThisPlan = (planID) => {
    return taskList.filter((task) => task.planid === planID);
  };

  // Conditionally filter plans based on whether the user wants to see only favorites
  const displayedPlans = showFavorites
    ? planList.filter((plan) => plan.favorite === true)
    : planList;
  if (isLoading) {
    return <p className='text-4xl text-center pt-5'>Loading...</p>
  }
  return (
    <div>
      {isLoggedIn ? (
        <div className='pt-5'>
          <div className='pb-5 text-4xl font-bold flex items-center justify-center space-x-4'>
            <p>My Plans</p>
            <FaPlusCircle onClick={handleAddPlan} className='cursor-pointer' />
            <FaStar onClick={handleFavoriteToggle} className={`cursor-pointer ${showFavorites ? 'text-yellow-500' : ''}`} />
          </div>

          {addPlan && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
              <div className="relative w-[100%] h-[100%] p-5 rounded-lg shadow-lg">
                <PlanForm creatorID={userid} creatorName={username} userid={userid} />
                <button className="absolute top-4 right-6 text-black text-3xl" onClick={handleAddPlan}>
                  &#10005;
                </button>
              </div>
            </div>
          )}

          {/* Plan List */}
          <div className='flex flex-col items-center justify-center'>
            {displayedPlans.length > 0 ? (
              displayedPlans.map((plan, index) => (
                <Plan key={index}
                  creatorID={userid}
                  creatorName={username}
                  userid={userid}
                  planID={plan.planid}
                  createdat={plan.createdat} // "2024-10-18T08:56:30.545Z"
                  startdate={plan.startdate} // "2024-10-18T08:56:30.545Z"
                  enddate={plan.enddate} // "2024-10-25T08:56:30.545Z"
                  favorite={plan.favorite} // false
                  plandone={plan.plandone} // false
                  planname={plan.planname} // "First"
                  publicity={plan.publicity} // true
                  tasksdone={plan.tasksdone} // 0
                  tasksinprogress={plan.tasksinprogress} // 0
                  tasks={tasksInThisPlan(plan.planid)} // Pass the filtered tasks to the Plan component
                />
              ))
            ) : (
              <p className='pb-5 text-4xl font-bold'>No plans available</p>
            )}
          </div>
        </div>
      ) : (
        <NotAuthorizedPage />
      )}
    </div>
  );
};

export default MyPlans;
