import { pool } from '../database/index.js';
import pkg from 'bcryptjs';
const { compare } = pkg;

export async function LoginUser(request, res) {
    const req = request.body;
    const client = await pool.connect();
    console.log("Login Process: Database is connected!");
    console.log(req);

    const username = req.username;
    const password = req.password;
    const lastLogin = req.lastLogin; 
    const query = {
        text: 'SELECT userid, passwordhashed FROM users WHERE username = $1',
        values: [username],
    };

    try {
        const result = await client.query(query);
        const user = result.rows[0];

        if (user) {
            const passwordMatches = await compare(password, user.passwordhashed);
            const userid = user.userid;

            if (passwordMatches) {
                // Update the lastLogin field after successful login
                const updateQuery = {
                    text: 'UPDATE users SET lastLogin = $1 WHERE username = $2',
                    values: [lastLogin, username],
                };

                await client.query(updateQuery); // Execute the update query to set lastLogin

                client.release();
                console.log(username);
                console.log(userid);

                return res.send({
                    success: true,
                    message: "Congrats! You logged in",
                    username: username,
                    userid: userid,
                });
            } else {
                client.release();
                return res.send({
                    success: false,
                    message: "Incorrect password",
                });
            }
        } else {
            client.release();
            return res.send({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        client.release();
        console.error("Backend error:", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong with the backend",
        });
    }
}
