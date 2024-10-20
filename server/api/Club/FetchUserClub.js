import { pool } from "../database/index.js";

export async function FetchUserClubs(req, res) {
    const userid = req.params.userid;
    const client = await pool.connect();

    try {
        const query = {
            text: 'SELECT * FROM clubs where userid = $1',  // Query to select all columns from the clubs table
            values: [userid]
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
