import { pool } from "../database/index.js";

export async function PlanDone(request, res) {
    const { planID, creatorID, userid } = request.body;
    const client = await pool.connect();
    console.log(planID, creatorID, userid)
    if (creatorID !== userid) {
        return res.send({
            success: false,
            message: "Action Not Authorized",
        });
    }
    try {
        // Check the current Done status of the plan
        const closeQuery = {
            text: 'SELECT plandone FROM plans WHERE planid = $1',
            values: [planID],
        };

        const closeResult = await client.query(closeQuery);

        const reverse = !closeResult.rows[0].plandone
        console.log(reverse)
        // Update the plan to make it private
        const updateQuery = {
            text: 'UPDATE plans SET plandone = $1 WHERE planid = $2',
            values: [reverse, planID],
        };

        await client.query(updateQuery);
        if (reverse) { // plansDone += 1, plansInProgress -=1
            const fetchUserQuery = {
                text: 'SELECT plansDone FROM users WHERE userid = $1',
                values: [creatorID],
            };
            const userResult = await client.query(fetchUserQuery);
            let plansDone = userResult.rows[0].plansdone;
            plansDone += 1;
            const updateUserPlanQuery = {
                text: 'UPDATE users SET plansdone = $1 WHERE userid = $2',
                values: [plansDone, creatorID],
            };
            await client.query(updateUserPlanQuery);
            const fetchUserQueryTwo = {
                text: 'SELECT plansInProgress FROM users WHERE userid = $1',
                values: [creatorID],
            };
            const userResultTwo = await client.query(fetchUserQueryTwo);
            let plansInProgress = userResultTwo.rows[0].plansinprogress;
            plansInProgress -= 1;
            const updateUserPlanQueryTwo = {
                text: 'UPDATE users SET plansInProgress = $1 WHERE userid = $2',
                values: [plansInProgress, creatorID],
            };
            await client.query(updateUserPlanQueryTwo);
        } else { // plansDone -= 1, plansInProgress += 1
            const fetchUserQuery = {
                text: 'SELECT plansInProgress FROM users WHERE userid = $1',
                values: [creatorID],
            };
            const userResult = await client.query(fetchUserQuery);
            let plansInProgress = userResult.rows[0].plansinprogress;
            plansInProgress += 1;
            const updateUserPlanQuery = {
                text: 'UPDATE users SET plansInProgress = $1 WHERE userid = $2',
                values: [plansInProgress, creatorID],
            };
            await client.query(updateUserPlanQuery);
            const fetchUserQueryTwo = {
                text: 'SELECT plansDone FROM users WHERE userid = $1',
                values: [creatorID],
            };
            const userResultTwo = await client.query(fetchUserQueryTwo);
            let plansDone = userResultTwo.rows[0].plansdone;
            plansDone += 1;
            const updateUserPlanQueryTwo = {
                text: 'UPDATE users SET plansdone = $1 WHERE userid = $2',
                values: [plansDone, creatorID],
            };
            await client.query(updateUserPlanQueryTwo);
        }

        return res.send({
            success: true,
            message: "Update Successfully!",
        });

    } catch (error) {
        console.error('Error in MakeplanPrivate:', error);
        return res.send({
            success: false,
            message: "An error occurred. Please try again later.",
        });
    } finally {
        client.release();
    }
}
