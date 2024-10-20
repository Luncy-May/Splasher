import { pool } from "../database/index.js";

export async function InviteUserAsFriend(request, res) {
    const req = request.body;
    const client = await pool.connect();

    try {
        const planID = req.planID;
        const inviter = req.userid;
        const friendID = req.friendID;
        const friendIDQuery = {
            text: 'SELECT username, userid FROM users WHERE username = $1',
            values: [friendID],
        };

        const friendIDResult = await client.query(friendIDQuery);

        if (friendIDResult.rows.length === 0) { // the user does not exist
            return res.send({
                success: false,
                message: "The user you are inviting does not exist!",
            });
        } else {
            const friendIDID = friendIDResult.rows[0].userid
            // Check if the job application already exists
            // const checkQuery = {
            //     text: 'SELECT * FROM applications WHERE planID = $1 AND appuser = $2',
            //     values: [planID, friendID],
            // };

            // const checkResult = await client.query(checkQuery);

            // if (checkResult.rows.length > 0) { // the user already applies the job
            //     return res.send({
            //         success: false,
            //         message: "Job application already exists",
            //     });
            // }
            const closeQuery = {
                text: 'SELECT publicity FROM plans WHERE planID = $1',
                values: [planID],
            };

            const closeResult = await client.query(closeQuery);

            if (!closeResult.rows[0].status) { // the job is closed 
                return res.send({
                    success: false,
                    message: "You've closed this plan! Please open it if you want to invite another user",
                });
            }
            // Insert the job application
            const insertQuery = {
                text: 'INSERT INTO invitations (planID, inviter, friendID) VALUES ($1, $2, $3)',
                values: [planID, inviter, friendIDID],
            };

            await client.query(insertQuery);

            return res.send({
                success: true,
                message: "Invitation sent successfully",
            });
        }
    } catch (error) {
        return res.send({
            success: false,
            message: "System Error! Please try refreshing the page",
        });
    } finally {
        client.release();
    }
}
