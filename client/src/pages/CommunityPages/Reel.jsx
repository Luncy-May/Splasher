import React, { useState, useEffect, useRef } from 'react'
import DisplayGrid from '../../components/DisplayGrid'
import { StateImages } from '../../components'
const Reel = ({userid}) => {
    
    const loggedInuserid = localStorage.getItem("userid");
    const username = localStorage.getItem("username");

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (loggedInuserid && loggedInuserid === userid) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [userid, loggedInuserid]);

    if (error) {
        return <p className='text-2xl font-bold text-center text-red-500'>{error}</p>;
    }
    return (
        <div className='flex justify-center w-full'>
            <DisplayGrid listOfItems={StateImages} />
        </div>
    )
}

export default Reel
