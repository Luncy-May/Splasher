
import { pool } from "../database/index.js";
export async function ViewAllPublicPlans(request, res) {
    const client = await pool.connect()
    console.log("public plans Process: Database is connected!")
    const query = {
        text: 'SELECT * FROM plans where publicity = $1',
        values: [true]
    };
    try {
        const result = await client.query(query)
        const data = result.rows
        client.release()
        return res.send({
            success: true,
            message: "Congrats! Successfully fetch all plans from database",
            data: data
        });
    } catch (error) {
        client.release()
        return res.send({
            success: false,
            message: "System error fetching all plans",
        });
    }
}