import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
const Feed = () => { // like a duplicate of Linkedin Feed
  const { userid } = useParams(); // Fetch userid from route parameters
  const loggedInuserid = localStorage.getItem("userid");
  const username = localStorage.getItem("username");

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [feedList, setfeedList] = useState([]);
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
        {feedList.length > 0 ? (
          feedList.map((feed, index) => (
            <div className={isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"}>
              <feed
                key={index}
                creatorID={userid}
                creatorName={username}
                userid={userid}
                feedID={feed.feedid}
                createdat={feed.createdat}
                startdate={feed.startdate}
                enddate={feed.enddate}
                favorite={feed.favorite}
                feeddone={feed.feeddone}
                feedname={feed.feedname}
                publicity={feed.publicity}
                tasksdone={feed.tasksdone}
                tasksinprogress={feed.tasksinprogress}
                tasks={tasksInThisfeed(feed.feedid)} // Pass filtered tasks to feed
              />
            </div>
          ))
        ) : (
          <p className='pb-5 text-2xl font-bold'>No feeds available</p>
        )}
      </div>
    </div>
  )
}

export default Feed
