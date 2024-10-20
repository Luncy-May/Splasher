
import { pool } from "../database/index.js";
export async function FetchAllUsers() {
    const client = await pool.connect()
    console.log("Fetch Users Process: Database is connected!")
    const query = {
        text: 'SELECT (username, email, tasksDone, plansDone) from users',
    };
    try {
        const result = await client.query(query)
        const data = result.rows
        client.release()
        return res.send({
            success: true,
            message: "Congrats! Successfully fetch users from database",
            data: data
        });
    } catch (error) {
        client.release()
        return res.send({
            success: false,
            message: "System error fetching users",
        });
    }
}