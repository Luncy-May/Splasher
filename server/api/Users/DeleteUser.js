

import { pool } from "../database/index.js";

export async function DeleteUser(request, res) { // { userid: userid }
    const userid = request.params.userid; // Access the userid from the URL parameter
    const client = await pool.connect()
    console.log("Delete Process: Database is connected!")

    const query1 = {
        text: 'DELETE FROM tasks WHERE userid = $1',
        values: [userid],
    };
    // check the entered password and hashed password 
    try {
        const result1 = await client.query(query1)
        const query2 = {
            text: 'DELETE FROM plans WHERE uesrID = $1',
            values: [userid],
        };
        // check the entered password and hashed password 
        try {
            const result2 = await client.query(query2)
            const query3 = {
                text: 'DELETE FROM users WHERE userid = $1',
                values: [userid],
            };
            // check the entered password and hashed password 
            try {
                const result3 = await client.query(query3)
                client.release();
                return res.send({
                    success: true,
                    message: "User is deleted successfully",
                });
            } catch (error) {
                client.release()
                return res.send({
                    success: false,
                    message: "System Error! Maybe try refreshing the page?",
                });
            }
        } catch (error) {
            client.release()
            return res.send({
                success: false,
                message: "System Error! Maybe try refreshing the page?",
            });
        }
    } catch (error) {
        client.release()
        return res.send({
            success: false,
            message: "System Error! Maybe try refreshing the page?",
        });
    }
}