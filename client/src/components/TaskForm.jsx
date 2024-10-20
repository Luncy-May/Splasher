import React, { useState, useEffect } from 'react';

const TaskForm = ({ creatorID, creatorName, userid, planID }) => {
  const [timestamp, setTimestamp] = useState(new Date());

  // Effect to update timestamp every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimestamp(new Date());
    }, 1000); // Update every second

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
    startDate: timestamp, // Current Date
    endDate: calculateEndDate(timestamp), // 7 days from current date
    taskName: '',
    creatorID: creatorID,
    creatorName: creatorName,
    createdAt: timestamp,
    planID: planID,
    clubName: null, // Changed to accept clubName
    familyName: null, // Changed to accept familyName
    userid: userid,
    publicity: false,
    taskDone: false,
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
      [name]: new Date(value), // Convert to Date object
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Convert the Date objects to ISO strings before sending to the backend
    const taskData = {
      ...formData,
      startDate: formData.startDate.toISOString(), // Convert to ISO 8601 format
      endDate: formData.endDate.toISOString(),
      createdAt: formData.createdAt.toISOString(),
      creatorID, // The user who created the task
      creatorName, // Name of the creator
      userid, // The current user using this task
      planID, // The ID of the plan this task belongs to
    };
    console.log(taskData)
    try {
      const response = await fetch('http://ec2-3-128-87-197.us-east-2.compute.amazonaws.com:8080/add-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to create the task');
      }

      const data = await response.json();
      alert('Task created successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error creating the task.');
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
        <h2 className="text-2xl font-bold mb-4">Create a New Task</h2>

        {/* Task Name */}
        <div className="mb-4">
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={formData.taskName}
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
            value={formData.startDate.toISOString().slice(0, 10)} // Convert to YYYY-MM-DD
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
            value={formData.endDate.toISOString().slice(0, 10)} // Convert to YYYY-MM-DD
            onChange={handleDateChange} // Handle date change
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Club Name */}
        <div className="mb-4">
          <label htmlFor="clubName" className="block text-sm font-medium text-gray-700">
            Club Name (Optional)
          </label>
          <input
            type="text"
            id="clubName"
            name="clubName"
            value={formData.clubName}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Family Name */}
        <div className="mb-4">
          <label htmlFor="familyName" className="block text-sm font-medium text-gray-700">
            Family Name (Optional)
          </label>
          <input
            type="text"
            id="familyName"
            name="familyName"
            value={formData.familyName}
            onChange={handleInputChange}
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
              Make this task public
            </label>
          </div>
        </div>

        {/* Task Done */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Is Task Done?</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="taskDone"
              name="taskDone"
              checked={formData.taskDone}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="taskDone" className="text-sm">
              Mark this task as complete
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
          {isSubmitting ? 'Submitting...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
