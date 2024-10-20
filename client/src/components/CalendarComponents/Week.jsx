import React, { useState } from 'react';
import Day from './Day';

const Week = ({ index, week, plans, tasks }) => {
    const [isExpanded, setIsExpanded] = useState(false); // Controls the dropdown
    const [edit, setEdit] = useState(false);

    // Toggle the dropdown
    const toggleDropdown = () => {
        setIsExpanded(!isExpanded);
    };

    // Toggle edit mode
    const handleEdit = () => {
        setEdit(!edit);
    };

    // Helper function to check if a plan or task is valid for the current day
    const isPlanOrTaskForDay = (day, month, startDate, endDate) => {
        const currentDay = new Date(new Date().getFullYear(), month - 1, day);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return currentDay >= start && currentDay <= end;
    };


    return (
        <div className='flex flex-col items-center justify-center w-[90vw] mb-4'>

            {/* Title section with icons and dropdown */}
            <div
                onClick={toggleDropdown}
                className='cursor-pointer bg-opacity-75 bg-gray-800 text-white z-0 flex items-center justify-between p-2 space-x-4 w-full border border-black border-solid transition-colors duration-300'
            >
                <div className='pl-2 flex items-center justify-between w-full'>
                    {/* Map over each day in the week */}
                    <div className="grid grid-cols-7 gap-2 w-full">
                        {week.map((day, index) => (
                            <div key={index} className="text-center w-full">
                                <Day
                                    dayIndex={index + 1}
                                    day={day.day}
                                    month={day.month}
                                    position={day.position}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dropdown body */}
            <div className={`overflow-hidden w-full transition-max-height duration-300 overflow-y-auto ${isExpanded ? 'max-h-[300px]' : 'max-h-0'}`}>
                <div
                    className='overflow-y-auto brightness-50 z-0 flex items-center justify-between p-2 space-x-4 w-full border border-black border-solid transition-colors duration-300'
                >
                    <div className='pl-2 flex items-center justify-between w-full'>
                        {/* Display relevant plans/tasks for each day */}
                        <div className="grid grid-cols-7 gap-2 w-full">
                            {week.map((day, index) => (
                                <div key={index} className="text-center w-full">
                                    {/* Display plan names for this day */}
                                    {plans.filter(plan =>
                                        isPlanOrTaskForDay(day.day, day.month, plan.startdate, plan.enddate)
                                    ).map((plan, idx) => (
                                        <p key={idx} className="text-sm text-blue-500 truncate">{plan.planname}</p> // Ensures text truncates
                                    ))}

                                    {/* Display task names for this day */}
                                    {tasks.filter(task =>
                                        isPlanOrTaskForDay(day.day, day.month, task.startdate, task.enddate)
                                    ).map((task, idx) => (
                                        <p key={idx} className="text-sm text-green-500 truncate">{task.taskname}</p> // Ensures text truncates
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Week;
