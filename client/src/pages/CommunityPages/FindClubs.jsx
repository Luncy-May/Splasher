import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
const FindClubs = () => { // where people can find and join a club (or even create a new one)
  const { userid } = useParams(); // Fetch userid from route parameters
  const loggedInuserid = localStorage.getItem("userid");
  const username = localStorage.getItem("username");
 
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [clubList, setClubList] = useState([]);
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
        {clubList.length > 0 ? (
          clubList.map((club, index) => (
            <div className={isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"}>
              <club
                key={index}
                creatorID={userid}
                creatorName={username}
                userid={userid}
                clubID={club.clubid}
                createdat={club.createdat}
                startdate={club.startdate}
                enddate={club.enddate}
                favorite={club.favorite}
                clubdone={club.clubdone}
                clubname={club.clubname}
                publicity={club.publicity}
                tasksdone={club.tasksdone}
                tasksinprogress={club.tasksinprogress}
                tasks={tasksInThisclub(club.clubid)} // Pass filtered tasks to club
              />
            </div>
          ))
        ) : (
          <p className='pb-5 text-2xl font-bold'>No clubs available</p>
        )}
      </div>
    </div>
  )
}

export default FindClubs
