
import { pool } from "../database/index.js";
export async function ClubInvitations(request, res) {
    const req = request.body
    const client = await pool.connect()
    console.log("Invitation Process: Database is connected!")
    const userid = req.userid
    const query = {
        text: 'SELECT * from clubs join invitations on (invitations.planID = clubs.planID) where invitations.invitee = $1',
        values: [userid]
    };
    try {
        const result = await client.query(query)
        const data = result.rows
        console.log("this is the data of invited clubs fetched from database")
        console.log(data) // [{}, {}, {}, ..., {}]
        client.release()
        return res.send({
            success: true,
            message: "Congrats! Successfully fetch invited clubs from database",
            data: data
        });
    } catch (error) {
        client.release()
        return res.send({
            success: false,
            message: "System error fetching clubs",
        });
    }
}