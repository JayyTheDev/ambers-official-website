exports.handler = async (event, context) => {
  const ip = event.headers["x-forwarded-for"] || "Unknown IP";
  const time = new Date().toISOString();

  // For now just log to the Netlify function log
  console.log(`Visit from ${ip} at ${time}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Visit logged", ip, time }),
  };
};