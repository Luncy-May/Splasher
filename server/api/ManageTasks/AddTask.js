import { pool } from "../database/index.js";

// This function handles the creation of a new task in the database
export async function AddTask(req, res) {
    const {
        startDate,
        endDate,
        taskName,
        creatorID,
        creatorName,
        createdAt,
        planID,
        clubName,
        familyName,
        userid,
        publicity,
        taskDone
    } = req.body;
    console.log("add Task right now")
    console.log(req.body)
    const client = await pool.connect();  // Get a connection from the pool
    try {
        // Query to insert the new task data into the database
        const insertQuery = {
            text: 'INSERT INTO tasks (startdate, enddate, taskname, creatorid, creatorname, createdat, planid, clubname, familyname, userid, publicity, taskdone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
            values: [
                startDate,
                endDate,
                taskName,
                creatorID,
                creatorName,
                createdAt,
                planID,
                clubName,
                familyName,
                userid,
                publicity,
                taskDone
            ],
        };

        // Execute the query
        await client.query(insertQuery);
        if (taskDone) {
            const fetchUserQuery = {
                text: 'SELECT tasksDone FROM users WHERE userid = $1',
                values: [creatorID],
            };
            const userResult = await client.query(fetchUserQuery);
            let tasksDone = userResult.rows[0].tasksdone;
            tasksDone += 1;
            const updateUserTaskQuery = {
                text: 'UPDATE users SET tasksdone = $1 WHERE userid = $2',
                values: [tasksDone, creatorID],
            };
            await client.query(updateUserTaskQuery);
            const fetchPlanQuery = {
                text: 'SELECT tasksDone FROM plans WHERE planid = $1',
                values: [planID],
            };
            const planResult = await client.query(fetchPlanQuery);
            let tasksDoneInPlan = planResult.rows[0].tasksdone;
            tasksDoneInPlan += 1;
            const updatePlanTaskQuery = {
                text: 'UPDATE plans SET tasksdone = $1 WHERE planid = $2',
                values: [tasksDoneInPlan, planID],
            };
            await client.query(updatePlanTaskQuery);
        } else {
            const fetchUserQuery = {
                text: 'SELECT tasksInProgress FROM users WHERE userid = $1',
                values: [creatorID],
            };
            const userResult = await client.query(fetchUserQuery);
            let tasksInProgress = userResult.rows[0].tasksinprogress;
            tasksInProgress += 1;
            const updateUserTaskQuery = {
                text: 'UPDATE users SET tasksInProgress = $1 WHERE userid = $2',
                values: [tasksInProgress, creatorID],
            };
            await client.query(updateUserTaskQuery);
            const fetchPlanQuery = {
                text: 'SELECT tasksInProgress FROM plans WHERE planid = $1',
                values: [planID],
            };
            const planResult = await client.query(fetchPlanQuery);
            let tasksInProgressInPlan = planResult.rows[0].tasksinprogress;
            tasksInProgressInPlan += 1;
            const updatePlanTaskQuery = {
                text: 'UPDATE plans SET tasksInProgress = $1 WHERE planid = $2',
                values: [tasksInProgressInPlan, planID],
            };
            await client.query(updatePlanTaskQuery);
        }
        // Return a success response if the task is created
        return res.send({
            success: true,
            message: "Task is added successfully",
        });
    } catch (error) {
        console.error("Error adding task:", error);

        // Return an error response if something goes wrong
        return res.send({
            success: false,
            message: "System Error! Please try refreshing the page",
        });
    } finally {
        client.release();  // Release the database client
    }
}
