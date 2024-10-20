import React, { useState, useEffect, useRef } from 'react'
import NotAuthorizedPage from './NotAuthorizedPage';

const Setting = ({ Darkmode }) => {
  
  const username = localStorage.getItem("username");
  const userid = localStorage.getItem("userid");

  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState((userid !== null && userid !== undefined && userid !== ""));
  return (
    <div>
      <div className='pt-5 space-y-5 text-4xl font-bold flex flex-col items-center justify-center'>Setting</div>
      {isLoggedIn ? (
        <div>
          <div className='flex flex-col items-center justify-center'>
          </div>
        </div>
      ) : (<div>
        <NotAuthorizedPage />
      </div>)}
    </div>
  )
}

export default Setting
