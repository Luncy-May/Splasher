
import React, { useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

const Histogram = ({ data }) => {
    console.log(data);
    return (
        <div className='border border-gray-200 shadow-md hover:shadow-2xl flex overflow-hidden max-w-[1400px]'>
            <div className='border border-gray-200 shadow-md hover:shadow-2xl'>
                <BarChart
                    xAxis={[{ data: ['Tasks Done', 'Tasks In Progress', 'Plans Done', 'Plans In Progress'], scaleType: 'band' }]}
                    series={[
                        { data: [data.tasksdone, data.tasksinprogress, data.plansdone, data.plansinprogress] },
                    ]}
                    width={800}
                    height={300}
                />
            </div>
            <div className='items-center justify-center space-y-5 p-5'>
                <h1 className='text-3xl'>Progress History</h1>
                <h1 className='text-2xl'>Plans Completed: {data.plansdone}</h1>
                <h1 className='text-2xl'>Plans In Progress: {data.plansinprogress}</h1>
                <h1 className='text-2xl'>Tasks Completed: {data.tasksdone}</h1>
                <h1 className='text-2xl'>Tasks In Progress: {data.tasksinprogress}</h1>
            </div>
        </div>
    )
}

export default Histogram;
