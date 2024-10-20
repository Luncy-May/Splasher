import { pool } from "../database/index.js";

// Function to handle adding a new club
export async function AddClub(req, res) {
    const {
        startDate,
        endDate,
        clubName,
        creatorID,
        creatorName,
        createdAt,
        joinedAt,
        userid,
        favorite,
        userRole,
        publicity
    } = req.body;

    const client = await pool.connect(); // Get a database connection from the pool
    try {
        // Insert the new club into the database
        const insertQuery = {
            text: 'INSERT INTO clubs (startDate, endDate, clubName, creatorID, creatorName, createdAt, joinedAt, userid, favorite, userRole, publicity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            values: [
                startDate,
                endDate,
                clubName,
                creatorID,
                creatorName,
                createdAt,
                joinedAt,
                userid,
                favorite,
                userRole,
                publicity
            ],
        };

        // Execute the query
        await client.query(insertQuery);
        const fetchUserQuery = {
            text: 'SELECT clubnum FROM users WHERE userid = $1',
            values: [creatorID],
        };

        const userResult = await client.query(fetchUserQuery);
        let clubnum = userResult.rows[0].clubnum;
        clubnum += 1;
        const updateUserPlanQuery = {
            text: 'UPDATE users SET clubnum = $1 WHERE userid = $2',
            values: [clubnum, creatorID],
        };
        await client.query(updateUserPlanQuery);
        // Send a success response
        return res.send({
            success: true,
            message: "Club is added successfully",
        });
    } catch (error) {
        console.error("Error adding club:", error);

        // Handle errors and send an error response
        return res.send({
            success: false,
            message: "System Error! Please try refreshing the page.",
        });
    } finally {
        client.release(); // Release the database client
    }
}
