import { pool } from "../database/index.js";

export async function FetchAllClubs(req, res) {
    const client = await pool.connect();

    try {
        const query = {
            text: 'SELECT * FROM clubs where publicity = $1',  // Query to select all columns from the clubs table
            values: [true]
        };

        const result = await client.query(query);
        const data = result.rows;

        return res.send({
            success: true,
            message: "Successfully fetched all clubs",
            data: data
        });
    } catch (error) {
        return res.send({
            success: false,
            message: "Error fetching clubs from the database",
        });
    } finally {
        client.release(); // Ensure the client is released even in case of error
    }
}
