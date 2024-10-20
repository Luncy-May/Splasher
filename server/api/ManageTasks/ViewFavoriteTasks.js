
import { pool } from "../database/index.js";
export async function ViewFavoriteTasks(request, res) {
    const { userid } = request.body
    const client = await pool.connect()
    console.log("manage tasks Process: Database is connected!")
    const query = {
        text: 'SELECT (startDate, endDate, taskID, taskName, planID, creatorName, createdAt, clubName, familyName, citedAt, likesNum, tasksDone, tasksDoneBy, publicity, favorite, favoriteByNum, citedNum) from plans where userid = $1 and favorite = $2',
        values: [userid, true]
    };
    try {
        const result = await client.query(query)
        const data = result.rows
        client.release()
        return res.send({
            success: true,
            message: "Congrats! Successfully fetch all favorite tasks from database",
            data: data
        });
    } catch (error) {
        client.release()
        return res.send({
            success: false,
            message: "System error fetching favorite tasks",
        });
    }
}