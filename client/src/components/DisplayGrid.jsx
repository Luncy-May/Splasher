import React, { useState, useEffect } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

const DisplayGrid = ({ listOfItems }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLargeView, setIsLargeView] = useState(false);

    // Function to go to the next item
    const nextItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listOfItems.length);
    };

    // Function to go to the previous item
    const prevItem = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? listOfItems.length - 1 : prevIndex - 1
        );
    };

    // Function to open large view
    const openLargeView = () => {
        setIsLargeView(true);
    };

    // Function to close large view
    const closeLargeView = () => {
        setIsLargeView(false);
    };

    // Determine the type of the current item (image, video, text)
    const renderContent = (item) => {
        if (typeof item === 'string') {
            const lowerItem = item.toLowerCase();
            if (lowerItem.endsWith('.jpg') || lowerItem.endsWith('.jpeg') || lowerItem.endsWith('.webp') || lowerItem.endsWith('.png') || lowerItem.endsWith('.gif')) {
                // Image content
                return <img src={item} alt="content" className="w-full h-full object-contain" />;
            } else if (lowerItem.endsWith('.mp4') || lowerItem.endsWith('.webm') || lowerItem.endsWith('.ogg')) {
                // Video content
                return (
                    <video controls className="w-full h-full object-contain">
                        <source src={item} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            } else {
                // Text content
                return <p className="text-4xl text-center">{item}</p>;
            }
        } else {
            return <p>{item}</p>;
        }
    };

    // Add keypress event listeners for left/right arrow keys
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                nextItem();
            } else if (event.key === 'ArrowLeft') {
                prevItem();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex]);

    return (
        <div className="flex p-5 items-stretch">
            {/* Left Arrow */}
            <div className="flex items-center border-gray-300 border shadow-sm hover:shadow-md">
                <GoChevronLeft onClick={prevItem} className="cursor-pointer text-3xl" />
            </div>

            {/* Main Display Grid */}
            <div className="border-t border-b border-gray-300 p-5 w-[800px] h-[600px] cursor-pointer flex items-center justify-center" onClick={openLargeView}>
                {renderContent(listOfItems[currentIndex])}
            </div>

            {/* Right Arrow */}
            <div className="flex items-center border-gray-300 border shadow-sm hover:shadow-md">
                <GoChevronRight onClick={nextItem} className="cursor-pointer text-3xl" />
            </div>

            {/* Large View Mode */}
            {isLargeView && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="relative w-[90%] h-[90%]">
                        {renderContent(listOfItems[currentIndex])}
                    </div>
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-6 text-white text-3xl"
                        onClick={closeLargeView}
                    >
                        &#10005;
                    </button>
                </div>
            )}
        </div>
    );
};

export default DisplayGrid;
