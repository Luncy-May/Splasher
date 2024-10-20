import { pool } from "../database/index.js";

export async function GetDashboard(request, res) {
    const userid = request.params.userid; // Access the userid from the URL parameter
    const client = await pool.connect();
    console.log("get dashboard's Process: Database is connected!");

    const query = {
        text: 'SELECT likesnum, tasksdone, tasksinprogress, plansdone, plansinprogress FROM users WHERE userid = $1',
        values: [userid],
    };

    try {
        const result = await client.query(query);
        
        const data = result.rows[0]; // Retrieve the first row of the result
        console.log('Getting data:', data);

        return res.send({
            success: true,
            message: "Congrats! Successfully fetched user profile from database",
            data: data
        });
    } catch (error) {
        console.error("Error during query execution:", error); // Log the error
        return res.send({
            success: false,
            message: "System error fetching user profile",
        });
    } finally {
        client.release();
    }
}
