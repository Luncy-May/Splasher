import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom';
const FindFriends = () => { // where people add friends by account searching
  const { userid } = useParams(); // Fetch userid from route parameters
  const loggedInuserid = localStorage.getItem("userid");
  const username = localStorage.getItem("username");

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [friendList, setfriendList] = useState([]);
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
        {friendList.length > 0 ? (
          friendList.map((friend, index) => (
            <div className={isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"}>
              <friend
                key={index}
                creatorID={userid}
                creatorName={username}
                userid={userid}
                friendID={friend.friendid}
                createdat={friend.createdat}
                startdate={friend.startdate}
                enddate={friend.enddate}
                favorite={friend.favorite}
                frienddone={friend.frienddone}
                friendname={friend.friendname}
                publicity={friend.publicity}
                tasksdone={friend.tasksdone}
                tasksinprogress={friend.tasksinprogress}
                tasks={tasksInThisfriend(friend.friendid)} // Pass filtered tasks to friend
              />
            </div>
          ))
        ) : (
          <p className='pb-5 text-2xl font-bold'>No friends available</p>
        )}
      </div>
      </div>
  )
}

export default FindFriends
