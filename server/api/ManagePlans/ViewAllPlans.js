
import { pool } from "../database/index.js";
export async function ViewAllPlans(request, res) {
    const userid = request.params.userid;
    const client = await pool.connect()
    console.log("manage plans Process: Database is connected!")
    const query = {
        text: 'SELECT startDate, endDate, planID, planName, creatorName, createdAt, clubName, familyName, citedAt, likesNum, tasksDone, tasksInProgress, publicity, planDone, planDoneBy, favorite, favoriteByNum, citedNum FROM plans WHERE userid = $1',
        values: [userid]
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