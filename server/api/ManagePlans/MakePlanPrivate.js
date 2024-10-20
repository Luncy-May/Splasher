import { pool } from "../database/index.js";

export async function MakePlanPrivate(request, res) {
    const { planID } = request.body;
    const client = await pool.connect();

    try {
        // Check the current publicity status of the plan
        const closeQuery = {
            text: 'SELECT publicity FROM plans WHERE planID = $1',
            values: [planID],
        };

        const closeResult = await client.query(closeQuery);

        // If the plan is already private, return an error
        if (!closeResult.rows[0].publicity) {
            return res.send({
                success: false,
                message: "This plan is already private",
            });
        }

        // Update the plan to make it private
        const updateQuery = {
            text: 'UPDATE plans SET publicity = $1 WHERE planID = $2',
            values: [false, planID],
        };

        await client.query(updateQuery);

        return res.send({
            success: true,
            message: "Successfully made the plan private!",
        });

    } catch (error) {
        console.error('Error in MakePlanPrivate:', error);
        return res.send({
            success: false,
            message: "An error occurred. Please try again later.",
        });
    } finally {
        client.release();
    }
}
