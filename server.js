// server.js
const fastify = require("fastify")({ logger: true });
const fastifyJwt = require("fastify-jwt");
const fastifyCors = require("@fastify/cors");
const fastifyMysql = require("fastify-mysql");

//this is generate PDF requirements
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

// Register CORS for cross-origin requests
fastify.register(fastifyCors, {
  origin: "*",
});

// Register JWT plugin
fastify.register(fastifyJwt, {
  secret: "supersecret",
});

// Register MySQL plugin
fastify.register(fastifyMysql, {
  promise: true,
  connectionString: "mysql://rootcanary:rootcanary@localhost/fastify_auth",
});

// Dummy user data
/* const users = {
  user1: { password: "password1" },
  user2: { password: "password2" },
}; */

fastify.post("/register", async (request, reply) => {
  const { username, password } = request.body;

  try {
    const connection = await fastify.mysql.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length > 0) {
      connection.release();
      return reply.status(400).send({ error: "Username already exists" });
    }

    await connection.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );
    connection.release();
    return reply.send({ success: "User registered successfully" });
  } catch (err) {
    return reply.status(500).send({ error: "Database error" });
  }
});

// Login route
fastify.post("/login", async (request, reply) => {
  const { username, password } = request.body;

  try {
    const connection = await fastify.mysql.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length > 0) {
      const token = fastify.jwt.sign({ username });
      console.log(token + " <======this token from server 1");
      connection.release();
      console.log(token + " <======this token from server 2");
      return reply.send({ token });
    } else {
      connection.release();
      return reply.status(401).send({ error: "Unauthorized" });
    }
  } catch (err) {
    return reply.status(500).send({ error: "Database error" });
  }
});

// Protected route
fastify.get("/protected", async (request, reply) => {
  try {
    await request.jwtVerify();
    reply.send({ message: "This is a protected route" });
  } catch (err) {
    reply.send(err);
  }
});

// Logout route (dummy as JWT is stateless)
fastify.post("/logout", async (request, reply) => {
  // Just respond since JWT is stateless
  reply.send({ message: "Logged out" });
});

/* this code is for generate the PDF File  START=======> */

// Endpoint to return hardcoded data
fastify.get("/api/data", async (request, reply) => {
  return {
    Name: "JESSICA DP",
    Age: "30",
    Insurer: "WAYZ Insurance",
    Plan: "Basic Plan",
    Rider: "Extra Coverage",
    MSLPremium: "100",
    PlanPremium: "200",
    AdditionalWithdrawalLimit: "50",
    CashOutlay: "300",
    RidersPremium: "50",
    TotalPremium: "250",
    TotalCashOutlay: "350",
  };
});

fastify.get("/api/generate-pdf", async (request, reply) => {
  // const { name } = request.query;

  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Fetch the data from the /api/data endpoint
    const response = await fetch("http://localhost:3030/api/data");
    const data = await response.json();

    // Log the fetched data for debugging
    fastify.log.info("Fetched data: ", data);

    // Define HTML content for the PDF
    const htmlContent = `
<html>
  <body>
    <h1>Integrated Shield Plan for:</h1>
    <table border="1" cellspacing="0" cellpadding="5">
      <tr>
        <td><strong>Name:</strong></td>
        <td>${data.Name}</td>
      </tr>
      <tr>
        <td><strong>Age:</strong></td>
        <td>${data.Age}</td>
      </tr>
      <tr>
        <td><strong>Insurer:</strong></td>
        <td>${data.Insurer}</td>
      </tr>
      <tr>
        <td><strong>Plan:</strong></td>
        <td>${data.Plan}</td>
      </tr>
      <tr>
        <td><strong>Rider:</strong></td>
        <td>${data.Rider}</td>
      </tr>
    </table>


    <h1>Premium Breakdown for ${data.Insurer} - ${data.Plan}</h1>
    <h3>Details</h3>
    <table border="1" cellspacing="0" cellpadding="5">
      <tr>
        <td><strong>Age:</strong></td>
        <td>${data.Age}</td>
      </tr>
      <tr>
        <td><strong>MSL Premium:</strong></td>
        <td>${data.MSLPremium}</td>
      </tr>
      <tr>
        <td><strong>Plan Premium:</strong></td>
        <td>${data.PlanPremium}</td>
      </tr>
      <tr>
        <td><strong>Additional Withdrawal Limit:</strong></td>
        <td>${data.AdditionalWithdrawalLimit}</td>
      </tr>
      <tr>
        <td><strong>Cash Outlay for the Integrated Plan:</strong></td>
        <td>${data.CashOutlay}</td>
      </tr>
      <tr>
        <td><strong>Rider(s) Premium:</strong></td>
        <td>${data.RidersPremium}</td>
      </tr>
      <tr>
        <td><strong>Total Premium (Plan + Rider(s)):</strong></td>
        <td>${data.TotalPremium}</td>
      </tr>
      <tr>
        <td><strong>Total Cash Outlay:</strong></td>
        <td>${data.TotalCashOutlay}</td>
      </tr>
    </table>
  </body>
</html>
`;

    // Log the HTML content for debugging
    // fastify.log.info("creating htmlContent====> " + htmlContent);

    // Set HTML content and generate PDF
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4" });

    // Close the browser
    await browser.close();

    // Define the file path using data.Name
    const filePath = path.join(__dirname, `${data.Name}.pdf`);

    // Save the PDF to the file system
    fs.writeFileSync(filePath, pdfBuffer);

    // Return the PDF
    reply.header(
      "Content-Disposition",
      `attachment; filename="${data.Name}.pdf"`
    );
    reply.type("application/pdf");
    reply.send(pdfBuffer);
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: "Error generating PDF" });
  }
});

/* this code is for generate the PDF File =======> END*/

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3030 });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
