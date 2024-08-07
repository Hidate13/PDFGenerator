const Fastify = require("fastify");
const fetch = require("node-fetch");

const fastify = Fastify({ logger: true });

fastify.get("/convert-pdf-to-word", async (request, reply) => {
  const pdfUrl = request.query.pdfUrl;

  try {
    // Call to the third-party PDF to Word API
    const apiResponse = await fetch("https://api.example.com/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
      body: JSON.stringify({ pdfUrl: pdfUrl }),
    });

    const result = await apiResponse.json();

    if (result.success) {
      reply.send({ url: result.downloadUrl });
    } else {
      reply.code(500).send({ error: "Conversion failed." });
    }
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server running at ${address}`);
});
