import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
const Activities = () => { // where people can have activities like a duplicate of kahoot, knowledge competition, quiz games
  const { userid } = useParams(); // Fetch userid from route parameters
  const loggedInuserid = localStorage.getItem("userid");
  const username = localStorage.getItem("username");

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [activityList, setactivityList] = useState([]);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (loggedInuserid && loggedInuserid === userid) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userid, loggedInuserid]);
  if (isLoading) {
    return <p className='text-2xl font-bold text-center'>Loading...</p>;
  }

  if (error) {
    return <p className='text-2xl font-bold text-center text-red-500'>{error}</p>;
  }
  return (
    <div>
      <div className='text-4xl font-bold flex items-center justify-center'>
        <p>Gallery</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        {activityList.length > 0 ? (
          activityList.map((activity, index) => (
            <div className={isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"}>
              <activity
                key={index}
                creatorID={userid}
                creatorName={username}
                userid={userid}
                activityID={activity.activityid}
                createdat={activity.createdat}
                startdate={activity.startdate}
                enddate={activity.enddate}
                favorite={activity.favorite}
                activitydone={activity.activitydone}
                activityname={activity.activityname}
                publicity={activity.publicity}
                tasksdone={activity.tasksdone}
                tasksinprogress={activity.tasksinprogress}
                tasks={tasksInThisactivity(activity.activityid)} // Pass filtered tasks to activity
              />
            </div>
          ))
        ) : (
          <p className='pb-5 text-2xl font-bold'>No activitys available</p>
        )}
      </div>
    </div>
  )
}

export default Activities
