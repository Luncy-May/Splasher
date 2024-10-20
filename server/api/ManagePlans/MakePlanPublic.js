import { pool } from "../database/index.js";

export async function MakePlanPublic(request, res) {
    const { planID } = request.body;
    const client = await pool.connect();

    try {
        // Check the current publicity status of the plan
        const openQuery = {
            text: 'SELECT publicity FROM plans WHERE planID = $1',
            values: [planID],
        };

        const openResult = await client.query(openQuery);

        // If the plan is already public, return an error
        if (openResult.rows[0].publicity) {
            return res.send({
                success: false,
                message: "This plan is already public",
            });
        }

        // Update the plan to make it public
        const updateQuery = {
            text: 'UPDATE plans SET publicity = $1 WHERE planID = $2',
            values: [true, planID],
        };

        await client.query(updateQuery);

        return res.send({
            success: true,
            message: "Successfully made the plan public!",
        });

    } catch (error) {
        console.error('Error in MakePlanPublic:', error);
        return res.send({
            success: false,
            message: "An error occurred. Please try again later.",
        });
    } finally {
        client.release();
    }
}
