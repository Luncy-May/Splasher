import React, {useState, useEffect, useRef} from 'react'
import NotAuthorizedPage from '../NotAuthorizedPage';

const Clubs = () => {
    const username = localStorage.getItem("username");
    const userid = localStorage.getItem("userid");
    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const [isLoading,setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState((userid !== null && userid !== undefined && userid !== ""));
    useEffect(() => {
        const getClubs = async () => {
            try {
                const response = await fetch(`http://ec2-3-128-87-197.us-east-2.compute.amazonaws.com:8080/DeleteUser/${userid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        lastLogin: time,
                    }),
                })
                if (!response.ok) {
                    throw new Error('Failed to submit the data. Please try again.')
                }
                // Handle response if necessary
                const data = await response.json()
                setError(data.message)
                
            } catch (error) {
                // Capture the error message to display to the user
                setError(error.message)
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        getClubs()
    })
    return (
        <div>
            {isLoggedIn ? (
        <div>

        </div>
    ) : (<div>
<NotAuthorizedPage />
</div>)}
</div>
)
}

export default Clubs
