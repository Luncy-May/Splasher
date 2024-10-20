import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Delete = () => {
    const navigate = useNavigate();
    const userid = localStorage.getItem("userid"); // Get the logged-in user's ID
    const username = localStorage.getItem("username");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(userid !== null && userid !== undefined && userid !== "");

    useEffect(() => {
        // Enable the button after 5 seconds to give the user time to reconsider
        const timeoutId = setTimeout(() => {
            setButtonDisabled(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    async function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/DeleteUser/${userid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userid,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete the account. Please try again.');
            }

            const data = await response.json();
            if (data.success) {
                localStorage.removeItem("userid");
                localStorage.removeItem("username");
                alert("Your account has been deleted successfully.");
                navigate("/"); // Redirect to the home page after deletion
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="mspace-y-10 p-3 mt-[5vh] flex flex-col items-center justify-center overflow-hidden">
            {isLoggedIn ? (
                <div className='pt-5 space-y-10 text-3xl font-bold p-20'>
                    <Link className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' to="/">Return to Home</Link>
                    <h1>Are you sure you want to delete your account?</h1>
                    <h1>You have 5 seconds to reconsider</h1>
                    <form className='space-y-5' onSubmit={onSubmit}>
                        <button className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' type="submit" disabled={buttonDisabled || isLoading}>
                            {isLoading ? 'Loading...' : 'Confirm Account Deletion'}
                        </button>
                    </form>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>
            ) : (
                <div>
                    <Link className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' to="/">Return to Home</Link>
                    <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}>You are not authorized to view this page.</h1>
                </div>
            )}
        </div>
    );
};

export default Delete;
