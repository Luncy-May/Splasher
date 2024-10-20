import { pool } from "../database/index.js";

export async function GetProfile(request, res) {
    const userid = request.params.userid; // Access the userid from the URL parameter
    const client = await pool.connect();
    console.log("get profile Process: Database is connected!");

    // Explicitly select columns excluding userid
    const query = {
        text: 'SELECT * FROM users WHERE userid = $1',
        values: [userid]
    };

    try {
        const result = await client.query(query);
        const data = result.rows;
        return res.send({
            success: true,
            message: "Congrats! Successfully fetched user profile from database",
            data: data
        });
    } catch (error) {
        return res.send({
            success: false,
            message: "System error fetching user profile",
        });
    } finally {
        client.release();
    }
}
