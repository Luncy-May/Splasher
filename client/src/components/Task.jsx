import React, { useState } from 'react';

const Task = ({
    taskid,
    creatorID,
    creatorName,
    userid,
    planID,
    createdat,
    startdate,
    enddate,
    favorite,
    taskdone,
    taskname,
    publicity,
}) => {
    const [checked, setChecked] = useState(false);
    const [edit, setEdit] = useState(false);

    const onFavorite = async (e) => {
        e.preventDefault();
        let data
        try {
            const response = await fetch('http://localhost:8080/task-favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ taskid, creatorID: userid, userid }),
            });

            if (!response.ok) {
                throw new Error('Failed to update the favorite status');
            }
            data = await response.json();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            alert(data?.message || "Action completed.");
            window.location.reload();
        }
    };

    const onDone = async (e) => {
        e.preventDefault();
        let data
        try {
            const response = await fetch('http://localhost:8080/task-done', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ taskid, creatorID: userid, userid, planID}),
            });

            if (!response.ok) {
                throw new Error('Failed to update the task done status');
            }
            data = await response.json();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            alert(data?.message || "Action completed.");
            window.location.reload();
        }
    };

    const onPublicity = async (e) => {
        e.preventDefault();
        let data
        try {
            const response = await fetch('http://localhost:8080/task-publicity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ taskid, creatorID: userid, userid }),
            });

            if (!response.ok) {
                throw new Error('Failed to update the publicity status');
            }
            data = await response.json();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            alert(data?.message || "Action completed.");
            window.location.reload();
        }
    };

    return (
        <div className='flex gap-1.5 p-2.5 m-2.5 border border-gray-300 border-dashed hover:border-solid'>
            <div className='flex items-center space-x-2'>
                <div className='flex items-center justify-center space-x-2 w-[50vw]'>
                    <p className='text-2xl pr-2 overflow-x-auto whitespace-nowrap'>created by {creatorName}: {taskname}</p>
                </div>
                <div className="text-sm text-gray-500">
                    <p><strong>Created At:</strong> {new Date(createdat).toLocaleDateString()}</p>
                    <p><strong>Start Date:</strong> {new Date(startdate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(enddate).toLocaleDateString()}</p>
                </div>

                {/* Favorite status */}
                <div className="flex items-center space-x-1">
                    <p className="text-gray-600 cursor-pointer" onClick={onFavorite}>
                        {favorite ? "★ Favorite Plan" : "☆ Not a Favorite"}
                    </p>
                </div>

                {/* Done status */}
                <span
                    onClick={onDone}
                    className="relative animate-pulse opacity-75 duration-300 border border-gray-300 p-1 cursor-pointer"
                >
                    {taskdone ? (<p>done</p>) : (<p>in progress</p>)}
                </span>

                {/* Publicity status */}
                <span
                    onClick={onPublicity}
                    className="relative border border-gray-300 p-1 cursor-pointer"
                >
                    {publicity ? (<p>public</p>) : (<p>private</p>)}
                </span>
            </div>
        </div>
    );
};

export default Task;
