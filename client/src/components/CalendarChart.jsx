import React, { useState } from 'react';
import { Week } from './CalendarComponents'; 

const CalendarChart = ({ planList, taskList }) => {
    const username = localStorage.getItem("username");
    const userid = localStorage.getItem("userid");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(userid !== null && userid !== undefined && userid !== "");
    const [weekOffset, setWeekOffset] = useState(0); // State to track offset in weeks

    const currentDate = new Date();
    const firstDayOfCalendar = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - firstDayOfCalendar.getDay()); // Set to the previous Sunday

    // Helper function to add days to a date
    const addDays = (date, days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    };

    // Helper function to check if a plan or task is within the week
    const isInWeek = (startDate, endDate, weekStart, weekEnd) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Ensure that startDate or endDate falls within the weekStart and weekEnd (inclusive)
        return (start >= weekStart && start <= weekEnd) || (end >= weekStart && end <= weekEnd) || 
               (start <= weekStart && end >= weekEnd); // This line handles the case when the plan/task spans the entire week
    };

    // Function to generate weeks with a given offset (based on the current weekOffset)
    const generateWeeks = (offset) => {
        const weeksList = [];
        const firstWeekStart = addDays(firstDayOfCalendar, offset * 7); // Adjust the first week based on offset

        for (let random = 0; random < 6; random++) {
            let week = [];
            let weekStart, weekEnd;
            const startOfWeek = addDays(firstWeekStart, random * 7); // Start of the current week

            for (let day = 0; day < 7; day++) {
                const eachDay = addDays(startOfWeek, day);

                let position;
                if (day === 0) { position = "Sun"; }
                else if (day === 1) { position = "Mon"; }
                else if (day === 2) { position = "Tue"; }
                else if (day === 3) { position = "Wed"; }
                else if (day === 4) { position = "Thu"; }
                else if (day === 5) { position = "Fri"; }
                else { position = "Sat"; }

                week.push({
                    day: eachDay.getDate(),
                    month: eachDay.getMonth() + 1,
                    year: eachDay.getFullYear(),  // Added year here
                    position,
                    fullDate: eachDay
                });

                if (day === 0) weekStart = eachDay;
                if (day === 6) weekEnd = eachDay;
            }

            // Filter plans and tasks for the current week based on their start and end dates
            const filteredPlans = planList.filter(plan =>
                isInWeek(plan.startdate, plan.enddate, weekStart, weekEnd)
            );

            const filteredTasks = taskList.filter(task =>
                isInWeek(task.startdate, task.enddate, weekStart, weekEnd)
            );

            weeksList.push({ week, filteredPlans, filteredTasks });
        }
        return weeksList;
    };

    // Generate the weeks with the current week offset
    const weeksList = generateWeeks(weekOffset);

    // Handlers for moving to the next or previous weeks
    const handlePreviousWeek = () => {
        setWeekOffset(weekOffset - 1);
    };

    const handleNextWeek = () => {
        setWeekOffset(weekOffset + 1);
    };

    // Calculate the current year or year range based on the first day of the week
    const firstDayOfWeek = weeksList[0]?.week[0]?.fullDate;
    const lastDayOfWeek = weeksList[weeksList.length - 1]?.week[6]?.fullDate;
    const yearDisplay = firstDayOfWeek && lastDayOfWeek
        ? firstDayOfWeek.getFullYear() === lastDayOfWeek.getFullYear()
            ? `${firstDayOfWeek.getFullYear()}`  // Same year
            : `${firstDayOfWeek.getFullYear()}-${lastDayOfWeek.getFullYear()}`  // Year range
        : '';

    const positions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <div>
            {/* Navigation buttons to move between weeks */}
            <div className="flex justify-center items-center w-full p-4 space-x-10">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handlePreviousWeek}
                >
                    Previous Week
                </button>
                <p className="text-2xl font-bold">{yearDisplay}</p> {/* Display the year */}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleNextWeek}
                >
                    Next Week
                </button>
            </div>

            {/* Display the positions of the days */}
            <div className='flex flex-col items-center justify-center w-full'>
                <div className="items-center flex justify-center w-[90vw] pb-2">
                    {positions.map((position, index) => (
                        <div key={index} className="text-center w-full">
                            <h1 className='text-2xl'>{position}</h1>
                        </div>
                    ))}
                </div>

                {/* Render each week with plans and tasks */}
                {weeksList.map((weekData, index) => (
                    <Week
                        key={index}
                        index={index}
                        week={weekData.week}
                        plans={weekData.filteredPlans}
                        tasks={weekData.filteredTasks}
                        isExpanded={isExpanded}
                    />
                ))}
            </div>
        </div>
    );
};

export default CalendarChart;
