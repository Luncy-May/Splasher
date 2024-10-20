import { pool } from "../database/index.js";

export async function FetchAllFamilies(req, res) {
    const client = await pool.connect();
    
    try {
        const query = {
            text: 'SELECT * FROM families where publicity = $1',
            values: [true]
        };

        const result = await client.query(query);
        const data = result.rows;

        return res.send({
            success: true,
            message: "Successfully fetched all families",
            data: data
        });
    } catch (error) {
        return res.send({
            success: false,
            message: "Error fetching families from the database",
        });
    } finally {
        client.release(); // Ensure the client is released even in case of error
    }
}
