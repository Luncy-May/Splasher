import pkg from 'pg'; // Import the whole package
const { Pool } = pkg; // Destructure the Pool class from the package

const pool = new Pool({
    host: "ec2-3-128-87-197.us-east-2.compute.amazonaws.com",
    port: "5432",
    user: "postgres",
    password: "35354Rattoplace",
    database: "postgres"
})
export default pool