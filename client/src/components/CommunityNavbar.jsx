import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

const CommunityNavbar = () => {
    const userid = localStorage.getItem('userid')
    const [session, setSession] = useState(false)
    const [filter, setFilter] = useState(false)
    const handleFilter = () => {
        setFilter(!filter ? true : false)
    }
    const [listView, setListView] = useState(false)
    const handleListView = () => {
        setListView(!filter ? true : false)
    }
    const [gridView, setGridView] = useState(false)
    const handleGridView = () => {
        setGridView(!filter ? true : false)
    }
    // check if the user currently signs in
    return (
        <div>
            <nav className="flex space-x-4  font-bold text-gray-900 p-3 relative">
                <div>
                    <Link to={`/community/${userid}`}>Reel</Link>
                </div>
                <div>
                    <Link to={`/community/gallery/${userid}`}>Gallery</Link>
                </div>
            </nav>
        </div>
    )
}

export default CommunityNavbar;
