import express from 'express';
import * as dotenv from "dotenv";
import cors from 'cors';
import axios from 'axios';
import {
    // From Club.js
    ApplyClub,
    ClubDelete,
    ClubInvitations,
    ClubSuggestion,
    FetchAllClubs,
    SearchClub,
    WithDrawClub,
    AddClub,

    // From ManagePlans.js
    AddPlan,
    MakePlanPrivate,
    MakePlanPublic,
    ViewAllPlans,
    ViewFavoritePlans,
    ViewAllPublicPlans,
    CitePlan,
    PlanDone,
    PlanFavorite,
    PlanPublicity,
    // From ManageTasks.js
    AddTask,
    ViewAllTasks,
    ViewFavoriteTasks,
    ViewAllPublicTasks,
    CiteTask,
    TaskDone,
    TaskFavorite,
    TaskPublicity,

    // From Users.js
    DeleteUser,
    FetchAllUsers,
    GetProfile,
    InviteUserAsFriend,
    LoginUser,
    RegisterUser,
    UpdateEmail,
    UpdatePassword,
    UpdateSubscription,
    UpdateUsername,
    GetDashboard
} from './api/index.js'; // Add the .js extension explicitly
import bodyParser from 'body-parser';
dotenv.config()

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());

// Basic Route
app.get('/', (req, res) => {
    res.send("Hello World From Splasher");
});

// Define API routes
app.post('/login', LoginUser);
app.post('/register', RegisterUser);
app.post('/add-plan', AddPlan);
app.get('/get-profile/:userid', GetProfile)
app.post('/add-task', AddTask);
app.post('/cite-task', CiteTask);
app.post('/cite-plan', CitePlan);
app.post('/apply-club', ApplyClub);
app.post('/add-club', AddClub);
app.delete('/delete-user/:userid', DeleteUser);
app.delete('/club-delete', ClubDelete);
app.get('/club-invitations/:userid', ClubInvitations);
app.get('/club-suggestion/:userid', ClubSuggestion);
app.get('/fetch-all-clubs/:userid', FetchAllClubs);
app.get('/fetch-all-users/:userid', FetchAllUsers);
app.post('/invite-user-as-friend', InviteUserAsFriend);
app.patch('/make-plan-private', MakePlanPrivate);
app.patch('/make-plan-public', MakePlanPublic);
app.get('/view-all-plans/:userid', ViewAllPlans);
app.get('/view-favorite-plans/:userid', ViewFavoritePlans);
app.get('/view-all-public-plans', ViewAllPublicPlans)
app.get('/view-all-public-tasks', ViewAllPublicTasks)
app.get('/search-club/:userid', SearchClub);
app.patch('/update-email', UpdateEmail);
app.patch('/update-password', UpdatePassword);
app.patch('/update-username', UpdateUsername);
app.get('/view-all-tasks/:userid', ViewAllTasks);
app.get('/view-favorite-tasks/:userid', ViewFavoriteTasks);
app.post('/withdraw-club', WithDrawClub);
app.post('/update-subscription', UpdateSubscription);
app.get("/get-dashboard/:userid", GetDashboard)
app.post("/plan-done", PlanDone)
app.post('/plan-favorite', PlanFavorite)
app.post("/plan-publicity", PlanPublicity)
app.post("/task-done", TaskDone)
app.post("/task-favorite", TaskFavorite)
app.post("/task-publicity", TaskPublicity)
app.post('/ask-ai', async (req, res) => {
    const { prompt } = req.body; // question from backend 
    console.log("this is the prompt",prompt)
    try {
        const response = await axios.post(
            'https://api.sambanova.ai/v1/chat/completions',
            {
                model: 'Meta-Llama-3.1-405B-Instruct',
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SAMBANOVA_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        // get response from AI
        const aiResponse = response.data.choices.map((choice) => choice.message.content).join('');
        console.log("ai response", aiResponse)
        res.json({ response: aiResponse });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.get('/api/location', async (req, res) => {
    const { latitude, longitude } = req.query;
    console.log(latitude,longitude)
    // Input validation
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const APIkey = process.env.OPENCAGE_API_KEY; //  OpenCage API key from .env
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Location Data")
        console.log(data)
        if (data.status.code === 200) {
            res.json({ location: data.results[0].formatted });
        } else {
            res.status(500).json({ error: 'Failed to get location info' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while sending location data' });
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
