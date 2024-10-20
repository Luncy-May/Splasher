import { pool } from "../database/index.js";

export async function PlanPublicity(request, res) {
    const { planID, creatorID, userid } = request.body;
    const client = await pool.connect();
    if (creatorID !== userid) {
        return res.send({
            success: false,
            message: "Action Not Authorized",
        });
    }
    try {
        // Check the current publicity status of the plan
        const closeQuery = {
            text: 'SELECT publicity FROM plans WHERE planid = $1',
            values: [planID],
        };

        const closeResult = await client.query(closeQuery);


        const reverse = !closeResult.rows[0].publicity

        // Update the plan to make it private
        const updateQuery = {
            text: 'UPDATE plans SET publicity = $1 WHERE planid = $2',
            values: [reverse, planID],
        };

        await client.query(updateQuery);

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
