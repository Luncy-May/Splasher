import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plan } from '../../components';

const Gallery = () => {
  const { userid } = useParams(); // Fetch userid from route parameters
  const loggedInuserid = localStorage.getItem("userid");
  const username = localStorage.getItem("username");

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [planList, setPlanList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await fetch(`http://ec2-3-128-87-197.us-east-2.compute.amazonaws.com:8080/view-all-public-plans`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch plans.');
      }

      const data = await response.json();
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
      const response = await fetch(`http://ec2-3-128-87-197.us-east-2.compute.amazonaws.com:8080/view-all-public-tasks`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks.');
      }

      const data = await response.json();
      setTaskList(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const tasksInThisPlan = (planID) => {
    return taskList.filter(task => task.planid === planID);
  };

  const handleCite = async (e, plan, tasks) => {
    e.preventDefault();
    setIsSubmitting(true);

    const planData = {
      ...plan,
      userid,
      tasks
    };
    try {
      const response = await fetch('http://ec2-3-128-87-197.us-east-2.compute.amazonaws.com:8080/cite-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        throw new Error('Failed to cite the plan');
      }

      const data = await response.json();
      alert('Plan cited successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error citing the plan.');
    } finally {
      setIsSubmitting(false);
      window.location.reload();
    }
  };

  // Render loading state or error
  if (isLoading) {
    return <p className='text-2xl font-bold text-center'>Loading...</p>;
  }

  if (error) {
    return <p className='text-2xl font-bold text-center text-red-500'>{error}</p>;
  }

  // Render the main content: Only show plans where creatorid !== loggedInuserid
  return (
    <div>
      <div className='text-4xl font-bold flex items-center justify-center'>
        <p>Gallery</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        {planList.length > 0 ? (
          planList.map((plan, index) => (
            plan.userid !== Number(loggedInuserid) && ( // Conditionally render based on creatorID
              <div key={index}>
                <Plan
                  key={index}
                  creatorID={plan.creatorid}
                  creatorName={plan.creatorname}
                  userid={userid}
                  planID={plan.planid}
                  createdat={plan.createdat}
                  startdate={plan.startdate}
                  enddate={plan.enddate}
                  favorite={plan.favorite}
                  plandone={plan.plandone}
                  planname={plan.planname}
                  publicity={plan.publicity}
                  tasksdone={plan.tasksdone}
                  tasksinprogress={plan.tasksinprogress}
                  tasks={tasksInThisPlan(plan.planid)} // Pass filtered tasks to Plan
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={(e) => handleCite(e, plan, tasksInThisPlan(plan.planid))}
                  disabled={isSubmitting} // Disable button when submitting
                >
                  Cite Plan
                </button>
              </div>
            )
          ))
        ) : (
          <p className='pb-5 text-2xl font-bold'>No plans available</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
