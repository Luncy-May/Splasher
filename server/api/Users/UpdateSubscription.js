import { pool } from "../../api/database/index.js";

export async function UpdateSubscription(request, res) {
    const req = request.body;
    const client = await pool.connect();
    console.log("Update subScription: Database is connected!");
    const username = req.username;
    const oldsubScription = req.oldsubScription;
    const newsubScription = req.newsubScription;

    // Check if the user exists and the old subScription is correct
    const checkQuery = {
        text: 'SELECT subScription FROM users WHERE username = $1 AND subScription = $2',
        values: [username, oldsubScription],
    };

    try {
        const checkResult = await client.query(checkQuery);
        if (checkResult.rows.length === 1) { // User and old subScription are correct
            const updateQuery = {
                text: 'UPDATE users SET subScription = $1 WHERE username = $2',
                values: [newsubScription, username],
            };

            try {
                await client.query(updateQuery);
                client.release();

                return res.send({
                    success: true,
                    message: "Updating subScription successfully",
                });
            } catch (error) {
                client.release();

                return res.send({
                    success: false,
                    message: "System error updating subScription",
                });
            }
        } else {
            client.release();
            return res.send({
                success: false,
                message: "Invalid username or old subScription",
            });
        }
    } catch (error) {
        client.release();
        return res.send({
            success: false,
            message: "System error updating subScription",
        });
    }
}
