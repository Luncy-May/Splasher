import { pool } from "../database/index.js";
import { CiteTask } from "../ManageTasks/CiteTask.js";

export async function CitePlan(request, res) {
    const {
        startdate,
        enddate,
        planname,
        creatorid,
        creatorname,
        createdat,
        clubname,
        familyname,
        userid,
        publicity,
        tasks
    } = request.body;
    
    const client = await pool.connect();
    
    try {
        // Insert the cited plan into the `plans` table
        const insertPlanQuery = {
            text: 'INSERT INTO plans (startdate,enddate,planname,creatorid,creatorname,createdat,clubname,familyname,userid,publicity,plandone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING planid',
            values: [
                startdate,
                enddate,
                planname,
                creatorid,
                creatorname,
                createdat,
                clubname,
                familyname,
                userid, // The citing user's ID
                publicity,
                false // New plan, so plandone is set to false by default
            ],
        };

        const result = await client.query(insertPlanQuery);
        const newPlanID = result.rows[0].planid; // Get the new plan's ID
        const updateUserTaskQuery = `UPDATE users SET plansinprogress = plansinprogress + 1 WHERE userid = $1`;
        await client.query(updateUserTaskQuery, [userid]);

        // Iterate through the tasks and insert them using the AddTask logic
        for (const task of tasks) {
            const taskData = {
                planID: newPlanID, 
                creatorID: task.creatorid, 
                creatorName: task.creatorname,
                taskName: task.taskname, 
                startDate: task.startdate, 
                endDate: task.enddate, 
                createdAt: task.createdat, 
                clubName: task.clubname, 
                familyName: task.familyname, 
                userid: userid, // The citing user's ID
                publicity: task.publicity, 
                taskDone: false
            };

            // Call AddTask and handle success/failure
            const taskResult = await CiteTask(taskData);

            if (!taskResult.success) {
                throw new Error(taskResult.error);
            }
        }
    
        // Send a response after the loop completes
        return res.json({ success: true, message: "Plan and tasks added successfully." });

    } catch (error) {
        console.error('Error citing plan:', error);
        return res.status(500).json({
            success: false,
            message: "System Error! Please try refreshing the page.",
        });
    } finally {
        client.release();
    }
}
