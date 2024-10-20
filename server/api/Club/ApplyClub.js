import { pool } from "../database/index.js";

export async function ApplyClub(request, res) {
    const req = request.body;
    const client = await pool.connect();

    try {
        const appjob = req.planID;
        const appuser = req.userid;
        const publisherQuery = {
            text: 'SELECT * FROM plans WHERE planID = $1 AND publisherid = $2',
            values: [appjob, appuser],
        };

        const publisherResult = await client.query(publisherQuery);

        if (publisherResult.rows.length > 0) { // the user is the publisher of that job
            return res.send({
                success: false,
                message: "Cannot apply to plans that you published!",
            });
        }
        // Check if the job application already exists
        const checkQuery = {
            text: 'SELECT * FROM applications WHERE appjob = $1 AND appuser = $2',
            values: [appjob, appuser],
        };

        const checkResult = await client.query(checkQuery);

        if (checkResult.rows.length > 0) { // the user already applies the job
            return res.send({
                success: false,
                message: "Job application already exists",
            });
        }
        const closeQuery = {
            text: 'SELECT status FROM plans WHERE planID = $1',
            values: [appjob],
        };

        const closeResult = await client.query(closeQuery);

        if (!closeResult.rows[0].status) { // the job is closed 
            return res.send({
                success: false,
                message: "This job is no longer accepting applications!",
            });
        }
        // Insert the job application
        const insertQuery = {
            text: 'INSERT INTO applications (appjob, appuser) VALUES ($1, $2)',
            values: [appjob, appuser],
        };

        await client.query(insertQuery);

        return res.send({
            success: true,
            message: "Job application submitted successfully",
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
