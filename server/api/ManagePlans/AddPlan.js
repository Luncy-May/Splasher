import { pool } from "../database/index.js";

export async function AddPlan(request, res) {
    const {
        startDate,
        endDate,
        planName,
        creatorID,
        creatorName,
        createdAt,
        clubName,
        familyName,
        userid,
        publicity,
        planDone
    } = request.body;
    console.log(startDate, endDate, planName, creatorID, createdAt, creatorName, clubName, familyName, userid, publicity, planDone)
    const client = await pool.connect();
    try {
        const insertQuery = {
            text: 'INSERT INTO plans (startdate,enddate,planname,creatorid,creatorname,createdat,clubname,familyname,userid,publicity, plandone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            values: [
                startDate,
                endDate,
                planName,
                creatorID,
                creatorName,
                createdAt,
                clubName,
                familyName,
                userid,
                publicity,
                planDone
            ],
        };

        await client.query(insertQuery);
        if (planDone) {
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
        } else {
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
        }


        return res.send({
            success: true,
            message: "Plan is added successfully",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: "System Error! Please try refreshing the page",
        });
    } finally {
        client.release();
    }
}
