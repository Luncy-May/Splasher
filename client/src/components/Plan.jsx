import React, { useState } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import { FaPlusCircle } from 'react-icons/fa';

const Plan = ({
    creatorID,
    creatorName,
    userid,
    planID,
    createdat,
    startdate,
    enddate,
    favorite,
    plandone,
    planname,
    publicity,
    tasksdone,
    tasksinprogress,
    tasks,
}) => {
    const [isExpanded, setIsExpanded] = useState(false); // Controls the dropdown
    const [addTask, setAddTask] = useState(false); // Toggle task form
    const loggedInuserid = Number(localStorage.getItem("userid")); // Fetch loggedInuserid from localStorage

    // Toggle dropdown for tasks
    const toggleDropdown = () => {
        setIsExpanded(!isExpanded);
    };

    // Toggle task form
    const handleAddTask = () => setAddTask(!addTask);

    // Mark plan as favorite
    const onFavorite = async (e) => {
        e.preventDefault();
        let data;
        try {
            const response = await fetch('http://localhost:8080/plan-favorite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planID, creatorID, userid }),
            });

            data = await response.json();
            if (!response.ok) throw new Error('Failed to update favorite status');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            alert(data?.message || "Action completed.");
            window.location.reload();
        }
    };

    // Mark plan as done
    const onDone = async (e) => {
        e.preventDefault();
        let data;
        try {
            const response = await fetch('http://localhost:8080/plan-done', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planID, creatorID, userid }),
            });
            data = await response.json();
            if (!response.ok) throw new Error('Failed to update done status');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            alert(data?.message || "Action completed.");
            window.location.reload();
        }
    };

    // Update plan publicity
    const onPublicity = async (e) => {
        e.preventDefault();
        let data;
        try {
            const response = await fetch('http://localhost:8080/plan-publicity', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planID, creatorID, userid }),
            });
            data = await response.json();
            if (!response.ok) throw new Error('Failed to update publicity status');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            alert(data?.message || "Action completed.");
            window.location.reload();
        }
    };

    return (
        <div className='items-center justify-center'>
            {/* Plan Header */}
            <div className='flex items-center justify-between p-2.5 w-[90vw] mt-2p border border-black transition-colors duration-300'>
                <div className='flex items-center space-x-2'>
                    <p className='text-2xl pr-2 overflow-x-auto whitespace-nowrap w-[200px]'>{planname}</p>

                    {/* Conditionally render "Add a Task" button only if loggedInuserid is the creator */}
                    {creatorID === userid && (
                        <>
                            <FaPlusCircle onClick={handleAddTask} className='scale-150 cursor-pointer' />
                            <span>Add a task</span>
                        </>
                    )}

                    {/* Plan Info */}
                    <div className="text-sm text-gray-500">
                        <p><strong>Created At:</strong> {new Date(createdat).toLocaleDateString()}</p>
                        <p><strong>Start Date:</strong> {new Date(startdate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(enddate).toLocaleDateString()}</p>
                    </div>

                    {/* Favorite Status */}
                    <p className="text-gray-600 cursor-pointer" onClick={onFavorite}>
                        {favorite ? "★ Favorite Plan" : "☆ Not a Favorite"}
                    </p>

                    {/* Plan Done Status */}
                    <span onClick={onDone} className="relative animate-pulse opacity-75 duration-300 border border-gray-300 p-1 cursor-pointer">
                        {plandone ? (<p>done</p>) : (<p>in progress</p>)}
                    </span>

                    {/* Task Statistics */}
                    <span className="relative border border-gray-300 p-1">
                        <p>tasks done: {tasksdone}</p>
                    </span>
                    <span className="relative border border-gray-300 p-1">
                        <p>tasks in progress: {tasksinprogress}</p>
                    </span>

                    {/* Publicity Status */}
                    <span onClick={onPublicity} className="relative border border-gray-300 p-1 cursor-pointer">
                        {publicity ? (<p>public</p>) : (<p>private</p>)}
                    </span>
                </div>

                {/* Toggle Dropdown */}
                <div className='pr-2 cursor-pointer' onClick={toggleDropdown}>
                    <div
                        className={`w-4 h-4 border-solid border-l-2 border-b-2 transform transition-transform duration-300 ${isExpanded ? '-rotate-45' : 'rotate-45'}`}
                        style={{ borderColor: 'black' }}
                    ></div>
                </div>
            </div>

            {/* Add Task Form */}
            {addTask && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-70 z-40"></div>
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                        <div className="relative w-[100%] h-[100%] p-5 rounded-lg shadow-lg">
                            <TaskForm creatorID={creatorID} creatorName={creatorName} userid={userid} planID={planID} />
                            <button className="absolute top-4 right-6 text-black text-3xl" onClick={handleAddTask}>
                                &#10005;
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Task List Dropdown */}
            <div className={`overflow-hidden transition-max-height duration-300 ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <div className='flex'>
                    <div className="min-h-[300px] max-h-[500px] overflow-y-auto overflow-x-hidden p-5 w-[90vw] border border-black shadow-xl">
                        <div className='flex flex-col items-center justify-center'>
                            {tasks.length > 0 ? (
                                tasks.map((task, index) => (
                                    <Task key={index}
                                        taskid={task.taskid}
                                        creatorID={task.creatorid}
                                        creatorName={task.creatorname}
                                        userid={task.userid}
                                        planID={task.planid}
                                        createdat={task.createdat}
                                        startdate={task.startdate}
                                        enddate={task.enddate}
                                        favorite={task.favorite}
                                        taskdone={task.taskdone}
                                        taskname={task.taskname}
                                        publicity={task.publicity}
                                    />
                                ))
                            ) : (
                                <p className='pb-5 text-4xl font-bold'>No tasks available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plan;
