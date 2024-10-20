import { pool } from "../database/index.js";

export async function TaskPublicity(request, res) {
    const { taskid, creatorID, userid } = request.body;
    const client = await pool.connect();
    if (creatorID !== userid) {
        return res.send({
            success: false,
            message: "Action Not Authorized",
        });
    }
    try {
        // Check the current publicity status of the task
        const closeQuery = {
            text: 'SELECT publicity FROM tasks WHERE taskid = $1',
            values: [taskid],
        };

        const closeResult = await client.query(closeQuery);


        const reverse = !closeResult.rows[0].publicity

        // Update the task to make it private
        const updateQuery = {
            text: 'UPDATE tasks SET publicity = $1 WHERE taskid = $2',
            values: [reverse, taskid],
        };

        await client.query(updateQuery);

        return res.send({
            success: true,
            message: "Updated Successfully!",
        });

    } catch (error) {
        console.error('Error in MaketaskPrivate:', error);
        return res.send({
            success: false,
            message: "An error occurred. Please try again later.",
        });
    } finally {
        client.release();
    }
}
