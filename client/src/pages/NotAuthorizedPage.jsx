import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaUserPlus, FaSearch } from 'react-icons/fa';
const NotAuthorizedPage = () => {
    return (
        <div>
            <div className='flex flex-col items-center justify-center space-y-5'>
                <div className='pt-5 space-y-5 text-4xl font-bold'>Let's have your account ready to view more awesome contents!</div>
                <div className='flex justify-between pl-[1vw] mt-[5vh] overflow-hidden space-x-5'>

                    <div className='flex-shrink-0'>
                        <Link to="/login">
                            <div className='p-5 text-2xl font-bold border border-gray-200 shadow-md hover:shadow-2xl min-h-[300px] min-w-[300px] flex flex-col items-center justify-center break-words'>
                                <div className='mb-2'>
                                    <FaSignInAlt size={50} />
                                </div>
                                <div className='mt-2'>
                                    Already have an account? Login here!
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className='flex-shrink-0'>
                        <Link to="/register">
                            <div className='p-5 text-2xl font-bold border border-gray-200 shadow-md hover:shadow-2xl min-h-[300px] min-w-[300px] flex flex-col items-center justify-center break-words'>
                                <div className='mb-2'>
                                    <FaUserPlus size={50} />
                                </div>
                                <div className='mt-2'>
                                    Register an account. It is free!
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='flex-shrink-0'>
                    <Link to="/community">
                        <div className='pl-5 pr-5 text-2xl font-bold border border-gray-200 shadow-md hover:shadow-2xl min-h-[300px] min-w-[300px] flex flex-col items-center justify-center break-words'>
                            <div className='mb-2'>
                                <FaSearch size={50} />
                            </div>
                            <div className='mt-2'>
                                Check out what other amazing people are doing with Splasher here!
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotAuthorizedPage
