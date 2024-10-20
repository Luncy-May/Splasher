import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import NotAuthorizedPage from '../NotAuthorizedPage'
export default function RegisterFamily() {
    const [error, setError] = useState(null)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [sessionUsername, setSessionUsername] = useState("")
    const [sessionuserid, setSessionuserid] = useState("")
    const [createdAt, setCreatedAt] = useState(null) // timestamp
    const [subscription, setSubscription] = useState(false)
    const username = localStorage.getItem("username");
    const userid = localStorage.getItem("userid");


    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState((userid !== null && userid !== undefined && userid !== ""));
    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts
        const time = new Date()
        setCreatedAt(time)
        try {
            const response = await fetch('http://localhost:8080/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    createdAt: time, //timestamp 
                    lastLogin: time, //timestamp
                    subscription: subscription // boolean
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            // Handle response if necessary
            const data = await response.json()
            setError(data.message)
            localStorage.setItem("userid", data.userid)
            localStorage.setItem("username", data.username)
            // ...
        } catch (error) {
            // Capture the error message to display to the user
            setError(error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <div>
            {isLoggedIn ? (
                <div className="mspace-y-10 p-3 mt-[5vh] flex flex-col items-center justify-center overflow-hidden">
                    <div className='pt-5 space-y-10 text-3xl font-bold p-20'>
                        <Link className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' to="/">Return to Home</Link>
                        <h1>Register an account below. We are excited to see you!</h1>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <form className='space-y-5' onSubmit={onSubmit}>
                            <h2>What is your username?</h2>
                            <input className='border border-gray-200 shadow-md hover:shadow-2xl' type="text" name="username" placeholder='username here' onChange={handleChangeUsername} required />
                            <h2>What is your password?</h2>
                            <input className='border border-gray-200 shadow-md hover:shadow-2xl' type="password" name="password" placeholder='password here' onChange={handleChangePassword} required />
                            <h2>What is your email?</h2>
                            <input className='border border-gray-200 shadow-md hover:shadow-2xl' type="email" name="email" placeholder='email here' onChange={handleChangeEmail} required />
                            <br></br><button className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' type="submit" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            ) : (<div>
                <NotAuthorizedPage />
            </div>)}
        </div>
    )
}
