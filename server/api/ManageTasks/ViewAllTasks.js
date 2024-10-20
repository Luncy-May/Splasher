
import { pool } from "../database/index.js";
export async function ViewAllTasks(request, res) {
    const userid = request.params.userid;
    const client = await pool.connect()
    console.log("manage tasks Process: Database is connected!")
    const query = {
        text: 'SELECT * from tasks where userid = $1',
        values: [userid]
    };
    try {
        const result = await client.query(query)
        const data = result.rows
        client.release()
        return res.send({
            success: true,
            message: "Congrats! Successfully fetch all tasks from database",
            data: data
        });
    } catch (error) {
        client.release()
        return res.send({
            success: false,
            message: "System error fetching tasks",
        });
    }
}