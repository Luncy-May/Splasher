import { pool } from "../database/index.js";

export async function TaskDone(request, res) {
    const { taskid, creatorID, userid, planID } = request.body;
    const client = await pool.connect();
    console.log(taskid, creatorID, userid, planID)
    if (creatorID !== userid) {
        return res.send({
            success: false,
            message: "Action Not Authorized",
        });
    }
    try {
        // Check the current Done status of the task
        const closeQuery = {
            text: 'SELECT taskdone FROM tasks WHERE taskid = $1',
            values: [taskid],
        };

        const closeResult = await client.query(closeQuery);

        const reverse = !closeResult.rows[0].taskdone

        // Update the task to make it private
        const updateQuery = {
            text: 'UPDATE tasks SET taskdone = $1 WHERE taskid = $2',
            values: [reverse, taskid],
        };

        await client.query(updateQuery);
        if (reverse) { // tasksDone += 1, tasksInProgress -=1
            const fetchUserQuery = {
                text: 'SELECT tasksDone FROM users WHERE userid = $1',
                values: [creatorID],
            };
            const userResult = await client.query(fetchUserQuery);
            let tasksDone = userResult.rows[0].tasksdone;
            tasksDone += 1;
            const updateUserPlanQuery = {
                text: 'UPDATE users SET tasksdone = $1 WHERE userid = $2',
                values: [tasksDone, creatorID],
            };
            await client.query(updateUserPlanQuery);
            const fetchUserQueryTwo = {
                text: 'SELECT tasksInProgress FROM users WHERE userid = $1',
                values: [creatorID],
            };
            const userResultTwo = await client.query(fetchUserQueryTwo);
            let tasksInProgress = userResultTwo.rows[0].tasksinprogress;
            tasksInProgress -= 1;
            const updateUserPlanQueryTwo = {
                text: 'UPDATE users SET tasksInProgress = $1 WHERE userid = $2',
                values: [tasksInProgress, creatorID],
            };
            await client.query(updateUserPlanQueryTwo);

            const fetchPlanQuery = {
                text: 'SELECT tasksDone FROM plans WHERE planid = $1',
                values: [planID],
            };
            const planResult = await client.query(fetchPlanQuery);
            let planTasksDone = planResult.rows[0].tasksdone;
            planTasksDone += 1;
            const updatePlanQuery = {
                text: 'UPDATE plans SET tasksdone = $1 WHERE planid = $2',
                values: [planTasksDone, planID],
            };
            await client.query(updatePlanQuery);
            const fetchPlanQueryTwo = {
                text: 'SELECT tasksInProgress FROM plans WHERE planid = $1',
                values: [planID],
            };
            const planResultTwo = await client.query(fetchPlanQueryTwo);
            let planTasksInProgress = planResultTwo.rows[0].tasksinprogress;
            planTasksInProgress -= 1;
            const updatePlanQueryTwo = {
                text: 'UPDATE plans SET tasksInProgress = $1 WHERE planid = $2',
                values: [planTasksInProgress, planID],
            };
            await client.query(updatePlanQueryTwo);

        } else { 
            // tasksDone -= 1, tasksInProgress += 1
            const fetchUserQuery = {
                text: 'SELECT tasksDone FROM users WHERE userid = $1',
                values: [creatorID],
            };
            const userResult = await client.query(fetchUserQuery);
            let tasksDone = userResult.rows[0].tasksdone;
            tasksDone -= 1; // Decrease tasksDone
            const updateUserPlanQuery = {
                text: 'UPDATE users SET tasksdone = $1 WHERE userid = $2',
                values: [tasksDone, creatorID],
            };
            await client.query(updateUserPlanQuery);
        
            const fetchUserQueryTwo = {
                text: 'SELECT tasksInProgress FROM users WHERE userid = $1',
                values: [creatorID],
            };
            const userResultTwo = await client.query(fetchUserQueryTwo);
            let tasksInProgress = userResultTwo.rows[0].tasksinprogress;
            tasksInProgress += 1; // Increase tasksInProgress
            const updateUserPlanQueryTwo = {
                text: 'UPDATE users SET tasksinprogress = $1 WHERE userid = $2',
                values: [tasksInProgress, creatorID],
            };
            await client.query(updateUserPlanQueryTwo);
        
            const fetchPlanQuery = {
                text: 'SELECT tasksDone FROM plans WHERE planid = $1',
                values: [planID],
            };
            const planResult = await client.query(fetchPlanQuery);
            let planTasksDone = planResult.rows[0].tasksdone;
            planTasksDone -= 1; // Decrease planTasksDone
            const updatePlanQuery = {
                text: 'UPDATE plans SET tasksdone = $1 WHERE planid = $2',
                values: [planTasksDone, planID],
            };
            await client.query(updatePlanQuery);
        
            const fetchPlanQueryTwo = {
                text: 'SELECT tasksInProgress FROM plans WHERE planid = $1',
                values: [planID],
            };
            const planResultTwo = await client.query(fetchPlanQueryTwo);
            let planTasksInProgress = planResultTwo.rows[0].tasksinprogress;
            planTasksInProgress += 1; // Increase planTasksInProgress
            const updatePlanQueryTwo = {
                text: 'UPDATE plans SET tasksinprogress = $1 WHERE planid = $2',
                values: [planTasksInProgress, planID],
            };
            await client.query(updatePlanQueryTwo);
        }
        return res.send({
            success: true,
            message: "Updated Successfully!",
        });

    } catch (error) {
        console.error('Error in MaketaskPrivate:', error);
        return res.send({
            success: false,
            message: "An error occurred. Please try again later.",
        });
    } finally {
        client.release();
    }
}
