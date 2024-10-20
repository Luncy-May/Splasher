import React, { useState, useEffect } from 'react';

const About = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const introText = 'Introducing Splasher, the ultimate productivity companion that revolutionizes the way you manage your to-do lists. With Splasher, you can schedule tasks with lightning speed and convenience, and customize your plans to fit your unique needs. Stay on track with our built-in time clock that sends you timely reminders, and effortlessly incorporate tasks into your calendar with our intuitive interface. But that\'s not all - Splasher also allows you to share your to-do lists with the community, making it easy to collaborate and get feedback from others. Choose to make your lists public, and watch as others like, share, and use your creations. As your lists gain traction, you\'ll earn account experience that helps you level up and unlock exciting new features. See how your lists are performing in real-time, and get notified every time someone interacts with your content. With Splasher, you\'ll be more productive, connected, and motivated than ever before. Join the community today and start splashing your way to success!';

  const username = localStorage.getItem("username");
  const userid = localStorage.getItem("userid");

  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState((userid !== null && userid !== undefined && userid !== ""));
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index < introText.length) {
        setText(text + introText[index]);
        setIndex(index + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [index, text, introText]);
  if (isLoading) {
    return <p className='text-2xl font-bold text-center'>Loading...</p>;
  }
  return (
    <div className="text-4xl font-serif text-white pl-[10vw] space-y-10 p-3 mt-[5vh] overflow-hidden">
    <div className='pt-5 space-y-5 text-4xl flex flex-col items-center justify-center'>About</div>
      <span className="text-gray-800">{text}</span>
    </div>
  );
};

export default About;