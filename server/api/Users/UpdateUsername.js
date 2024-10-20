

import { pool } from "../../api/database/index.js";

export async function UpdateUsername(request, res) {
    const req = request.body
    const client = await pool.connect();
    console.log("Update Username: Database is connected!");
    const oldusername = req.oldusername;
    const newusername = req.newusername;
    const userid = req.userid;
    console.log(req)
    // Check if the user already exists
    const checkQuery = {
        text: 'SELECT COUNT(*) FROM users WHERE username = $1',
        values: [newusername],
    };
    try {
        const checkResult = await client.query(checkQuery);
        const userCount = checkResult.rows[0].count; // check if the new username is taken by counting 
        console.log("This is the user count: ", userCount, typeof(userCount))
        if (userCount === '0') { // the new username does not exist
            const updateJobQuery = {
                text: 'UPDATE plans SET publishername = $1 where publisherid = $2',
                values: [newusername, userid],
            };

            try {
                await client.query(updateJobQuery);
            } catch (error) {
                client.release();
                return res.send({
                    success: false,
                    message: "System error updating the new username",
                });
            }
            const updateQuery = {
                text: 'UPDATE users SET username = $1 where userid = $2',
                values: [newusername, userid],
            };

            try {
                await client.query(updateQuery);
                client.release();
                return res.send({
                    success: true,
                    message: "Updating username successfully",
                    newusername: newusername,
                });
            } catch (error) {
                client.release();
                return res.send({
                    success: false,
                    message: "System error updating the new username",
                });
            }
        } else { // the new username does exist
            client.release();
            return res.send({
                success: false,
                message: "The new username is already taken by somebody else!",
            });
        }
    } catch (error) {
        client.release();
        return res.send({
            success: false,
            message: "System error finding the availablility of the new username",
        });
    }
}
