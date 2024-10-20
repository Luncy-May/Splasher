import { pool } from "../database/index.js";
import pkg from 'bcryptjs';
const { hash } = pkg; // Correctly import hash

export async function RegisterUser(request, res) {
    const req = request.body;
    const client = await pool.connect();
    console.log("Register Process: Database is connected!");
    console.log("This is the req:");
    console.log(req);
    const username = req.username;
    const password = req.password;
    const email = req.email;
    const createdAt = req.createdAt;
    const lastLogin = req.createdAt;
    const subscription = req.subscription;

    // Check if the user already exists
    const checkQuery = {
        text: 'SELECT COUNT(*) FROM users WHERE username = $1',
        values: [username],
    };

    try {
        const checkResult = await client.query(checkQuery);
        const userCount = checkResult.rows[0].count;

        if (userCount === '0') { // User doesn't exist, proceed with registration
            const hashedPassword = await hash(password, 10); // Correct use of hash
            console.log(hashedPassword);

            const insertQuery = {
                text: 'INSERT INTO users (username, passwordHashed, email, createdAt, lastLogin, subscription) VALUES ($1, $2, $3, $4, $5, $6) RETURNING userid',
                values: [username, hashedPassword, email, createdAt, lastLogin, subscription],
            };

            try {
                console.log("try inserting");
                const result = await client.query(insertQuery);
                if (result.rows.length > 0) {
                    const userid = result.rows[0].userid;
                    client.release();
                    return res.send({
                        success: true,
                        username: username,
                        userid: userid,
                        message: "User registered successfully",
                    });
                } else {
                    console.error("No rows returned from the query");
                    client.release();
                    return res.status(500).send({
                        success: false,
                        message: "System error when registering a user",
                    });
                }
            } catch (error) {
                client.release();
                console.error("Insert error:", error);
                return res.status(500).send({
                    success: false,
                    message: "System error when registering a user",
                });
            }
        } else {
            client.release();
            return res.status(409).send({
                success: false,
                message: "User already exists",
            });
        }
    } catch (error) {
        client.release();
        console.error("System error:", error);
        return res.status(500).send({
            success: false,
            message: "System error! Please try refreshing the page",
        });
    }
}
