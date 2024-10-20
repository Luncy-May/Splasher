import React, {useState, useEffect, useRef} from 'react'

const DeleteClub = () => {
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const username = localStorage.getItem("username");
    const userid = localStorage.getItem("userid");
    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const [isLoading,setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState((userid !== null && userid !== undefined && userid !== ""));
    useEffect(() => {
        // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {
          setButtonDisabled(false);
        }, 5000);
    
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
      }, []); // Empty dependency array ensures the effect runs only once
    
      useEffect(() => {
        if (isLoggedIn) {
        const time = new Date()
        const getProfile = async () => {
            try {
                const response = await fetch(`http://ec2-3-128-87-197.us-east-2.compute.amazonaws.com:8080/GetProfile/${userid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        userid: userid,
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
        getProfile()
    }}, [isLoggedIn, username, userid]);
  return (
    <div>
      <div className="mspace-y-10 p-3 mt-[5vh] flex flex-col items-center justify-center overflow-hidden">
            {isLoggedIn ? (<div>
                <Link className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' to="/">Return to Home</Link>
                <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}> Not authorized to view the page. </h1>
            </div>) : (<div className='pt-5 space-y-10 text-3xl font-bold p-20'>
                <Link className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' to="/">Return to Home</Link>
                
                <h1>Are you sure you want to delete the club?</h1>
                <h1>You have 5 seconds to reconsider</h1>
                <form className='space-y-5' onSubmit={onSubmit}>
                    <br></br><button className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' type="submit" disabled={buttonDisabled}>
                        {isLoading ? 'Loading...' : 'Confirm Club DELETION'}
                    </button>
                </form>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>)}

        </div>
    </div>
  )
}

export default DeleteClub
