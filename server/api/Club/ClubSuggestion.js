

import { pool } from "../database/index.js";

export async function ClubSuggestion(request, res) { // json file: { clubName: searchContent } 
  const req = request.body
  const client = await pool.connect()
  console.log("Suggestion Process: Database is connected!")
  const clubName = req.clubName;
  const query = {
    text: 'SELECT clubName FROM clubs WHERE clubName LIKE $1',
    values: [clubName], // Use % to match any characters before or after the username
  };
  try {
    const result = await client.query(query)
    const data = result.rows
    client.release()
    return res.send({
      success: true,
      message: "Congrats! You reach the backend",
      data: data
    });
  } catch (error) {
    client.release()
    return res.send({
      success: false,
      message: "something wrong with the backend",
    });
  }

}