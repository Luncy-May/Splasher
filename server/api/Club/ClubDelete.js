

import { pool } from "../database/index.js";

export async function ClubDelete(request, res) { // { clubID: clubID }
    const req = request.body
    const client = await pool.connect()
    console.log("Delete Process: Database is connected!")
    const clubID = req.clubID;
    const query1 = {
        text: 'DELETE FROM tasks WHERE clubID = $1',
        values: [clubID],
    };
    try {
        const result1 = await client.query(query1)
        const query2 = {
            text: 'DELETE FROM plans WHERE clubID = $1',
            values: [clubID],
        };
        try {
            const result2 = await client.query(query2)
            const query3 = {
                text: 'DELETE FROM plans WHERE clubID = $1',
                values: [clubID],
            };
            try {
                const result3 = await client.query(query3)
                client.release();

                return res.send({
                    success: true,
                    message: "Club is deleted successfully",
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