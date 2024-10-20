import React, { useState, useEffect } from 'react';

const ClubForm = ({ creatorID, creatorName, userid }) => {
    const [timestamp, setTimestamp] = useState(new Date()); // Initialize timestamp as Date object

    // Update timestamp every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimestamp(new Date()); // Update with current Date object
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    // Function to calculate the endDate as 7 days after startDate
    const calculateEndDate = (startDate) => {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7); // Add 7 days
        return endDate; // Return Date object
    };

    // Initialize formData with Date objects
    const [formData, setFormData] = useState({
        startDate: timestamp, // Current Date object
        endDate: calculateEndDate(timestamp), // 7 days from the current date
        clubName: null,
        creatorID: creatorID,
        creatorName: creatorName,
        createdAt: timestamp, // Date object for createdAt
        joinedAt: timestamp, // Date object for joinedAt
        userid: userid,
        favorite: false,
        userRole: '',
        publicity: true,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle date input changes (convert to Date object)
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: new Date(value), // Convert to Date object from the input value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Convert Date objects to ISO strings before sending to the backend
        const clubData = {
            ...formData,
            startDate: formData.startDate.toISOString(), // Convert to ISO 8601 format
            endDate: formData.endDate.toISOString(),
            createdAt: formData.createdAt.toISOString(),
            joinedAt: formData.joinedAt.toISOString(),
            creatorID,
            creatorName,
            userid,
        };

        try {
            const response = await fetch('http://ec2-3-128-87-197.us-east-2.compute.amazonaws.com:8080/clubs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clubData),
            });

            if (!response.ok) {
                throw new Error('Failed to create the club');
            }

            const data = await response.json();
            alert('Club created successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error creating the club.');
        } finally {
            setIsSubmitting(false);
            window.location.reload();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4">Create a New Club</h2>

                {/* Club Name */}
                <div className="mb-4">
                    <label htmlFor="clubName" className="block text-sm font-medium text-gray-700">
                        Club Name
                    </label>
                    <input
                        type="text"
                        id="clubName"
                        name="clubName"
                        value={formData.clubName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Start Date */}
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate.toISOString().slice(0, 10)} // Format to YYYY-MM-DD
                        onChange={handleDateChange} // Handle date change
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* End Date */}
                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate.toISOString().slice(0, 10)} // Format to YYYY-MM-DD
                        onChange={handleDateChange} // Handle date change
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* User Role */}
                <div className="mb-4">
                    <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">
                        User Role
                    </label>
                    <input
                        type="text"
                        id="userRole"
                        name="userRole"
                        value={formData.userRole}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Publicity */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Publicity</label>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="publicity"
                            name="publicity"
                            checked={formData.publicity}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <label htmlFor="publicity" className="text-sm">
                            Make this club public
                        </label>
                    </div>
                </div>

                {/* Favorite */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Favorite</label>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="favorite"
                            name="favorite"
                            checked={formData.favorite}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <label htmlFor="favorite" className="text-sm">
                            Mark as favorite
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Create Club'}
                </button>
            </form>
        </div>
    );
};

export default ClubForm;
