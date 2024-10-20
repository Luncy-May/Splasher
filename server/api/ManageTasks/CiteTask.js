import { pool } from "../database/index.js";

export async function CiteTask(taskData) {
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
    } = taskData;
    
    const client = await pool.connect(); 
    try {
        const insertQuery = {
            text: 'INSERT INTO tasks (startdate, enddate, taskname, creatorid, creatorname, createdat, planid, clubname, familyname, userid, publicity, taskdone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
            values: [startDate, endDate, taskName, creatorID, creatorName, createdAt, planID, clubName, familyName, userid, publicity, taskDone],
        };

        await client.query(insertQuery);

        if (taskDone) {
            // Update tasksDone for the user and plan
            const updateUserTaskQuery = `UPDATE users SET tasksdone = tasksdone + 1 WHERE userid = $1`;
            await client.query(updateUserTaskQuery, [userid]);

            const updatePlanTaskQuery = `UPDATE plans SET tasksdone = tasksdone + 1 WHERE planid = $1`;
            await client.query(updatePlanTaskQuery, [planID]);
        } else {
            // Update tasksInProgress for the user and plan
            const updateUserTaskQuery = `UPDATE users SET tasksinprogress = tasksinprogress + 1 WHERE userid = $1`;
            await client.query(updateUserTaskQuery, [userid]);

            const updatePlanTaskQuery = `UPDATE plans SET tasksinprogress = tasksinprogress + 1 WHERE planid = $1`;
            await client.query(updatePlanTaskQuery, [planID]);
        }

        // Return success
        return { success: true };

    } catch (error) {
        console.error("Error adding task:", error);
        return { success: false, error: "System Error! Please try refreshing the page" };
    } finally {
        client.release();
    }
}
