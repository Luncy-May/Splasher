import { pool } from "../database/index.js";
export async function SearchClub(request, res) { // json file: { clubName: searchContent } 
  const req = request.body
  const client = await pool.connect()
  console.log("Search Process: Database is connected!")
  const clubName = req.clubName
  console.log(clubName)
  const query = {
    text: 'SELECT * FROM clubs WHERE clubName LIKE $1',
    values: [clubName], // Use % to match any characters before or after the clubName
  };
  try {
    const result = await client.query(query)
    const data = result.rows
    client.release()
    console.log("Successfully retrieved the data")
    try {
      return res.send({
        success: true,
        message: "Congrats! You reach the backend",
        data: data
      });
    } catch (error) {
      return res.send({
        success: false,
        message: "something wrong with the backend",
      });
    }
  } catch (error) {
    client.release()
    return res.send({
      success: false,
      message: "something wrong with the backend",
    });
  }
}