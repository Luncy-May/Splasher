import { Navbar } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Community, About, Calendar, Dashboard, Home, MyPlans, Profile, Setting, Support, Team } from './pages';
import { Login, Register, Delete } from './pages/AuthPages';
import { Clubs, Families, Friends } from './pages/PersonalPages';
import NotFoundPage from './pages/NotFoundPage';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<Home />} />
        <Route path="/about/*" element={<About />} />
        <Route path="/calendar/:userid" element={<Calendar />} /> 
        <Route path="/dashboard/:userid" element={<Dashboard />} /> 
        <Route path="/myplans/:userid" element={<MyPlans />} /> 
        <Route path="/profile/:userid" element={<Profile />} /> 
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/community/*" element={<Community />} />
        {/* <Route path="/team/:userid" element={<Team />} />  */}
        {/* <Route path="/personal/clubs/:userid" element={<Clubs />} />
        <Route path="/personal/families/:userid" element={<Families />} />
        <Route path="/personal/friends/:userid" element={<Friends />} /> */}
        {/* <Route path="/setting/*" element={<Setting />} />
        <Route path="/support/*" element={<Support />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;



// npm install @mui/material @emotion/react @emotion/styled react-router-dom @mui/x-charts react-draggable openmeteo @react-google-maps/api react-icons 
// npm install  gsap
// npm install  @gsap/react
// npm install -D tailwindcss postcss
// npx tailwindcss init