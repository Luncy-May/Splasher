import { pool } from "../database/index.js";

export async function WithDrawClub(request, res) {
    const req = request.body;
    const client = await pool.connect();

    try {
        const appjob = req.planID;
        const appuser = req.userid;

        // Check if the job application already exists
        const checkQuery = {
            text: 'SELECT * FROM applications WHERE appjob = $1 AND appuser = $2',
            values: [appjob, appuser],
        };

        const checkResult = await client.query(checkQuery);

        if (checkResult.rows.length === 0) {
            return res.send({
                success: false,
                message: "Job application does not exist",
            });
        }

        // Insert the job application
        const insertQuery = {
            text: 'DELETE FROM applications where appjob = $1 and appuser = $2',
            values: [appjob, appuser],
        };

        await client.query(insertQuery);

        return res.send({
            success: true,
            message: "Job is withdrawed successfully",
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
