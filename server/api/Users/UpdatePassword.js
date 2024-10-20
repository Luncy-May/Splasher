import { pool } from "../../api/database/index.js";
import pkg from 'bcryptjs';
const { compare, hash } = pkg; // Import compare and hash

export async function UpdatePassword(request, res) {
    const req = request.body;
    const client = await pool.connect();
    console.log("Update Password: Database is connected!");
    const username = req.username;
    const oldpassword = req.oldpassword;
    const newpassword = req.newpassword;
    console.log(username, oldpassword, newpassword);

    // Check if the user exists and retrieve hashed password
    const checkQuery = {
        text: 'SELECT passwordHashed FROM users WHERE username = $1',
        values: [username],
    };

    try {
        const checkResult = await client.query(checkQuery);
        if (checkResult.rows.length === 1) {
            const hashedPasswordFromDB = checkResult.rows[0].hashedpassword;
            const passwordsMatch = await compare(oldpassword, hashedPasswordFromDB); // Use compare function correctly

            if (passwordsMatch) {
                const hashedPassword = await hash(newpassword, 10); // Hash new password
                const updateQuery = {
                    text: 'UPDATE users SET passwordHashed = $1 WHERE username = $2',
                    values: [hashedPassword, username],
                };

                try {
                    await client.query(updateQuery);
                    client.release();
                    return res.send({
                        success: true,
                        message: "Password updated successfully",
                    });
                } catch (error) {
                    client.release();
                    console.error("Error during password update:", error);
                    return res.send({
                        success: false,
                        message: "System error updating password",
                    });
                }
            } else {
                client.release();
                return res.send({
                    success: false,
                    message: "Incorrect old password",
                });
            }
        } else {
            client.release();
            return res.send({
                success: false,
                message: "User does not exist, please login first",
            });
        }
    } catch (error) {
        client.release();
        console.error("System error:", error);
        return res.send({
            success: false,
            message: "System error updating password",
        });
    }
}
