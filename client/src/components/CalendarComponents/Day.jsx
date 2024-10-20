import React, { useState } from 'react'

const Day = ({ dayIndex, day, month, position }) => {
    return (
        <div className='text-2xl'>
            {month}/{day}
        </div>
    )
}

export default Day
