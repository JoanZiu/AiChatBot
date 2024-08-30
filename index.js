import LlamaAI from "llamaai";

const apiToken = "LL-zGWLlOF8WQq3ClYGnjIxR4XevlYLSXG0ie9MMdhTHuqIao2d8EuHsydj9nUN6gqx";
const llamaAPI = new LlamaAI(apiToken);

const apiRequestJson = {
  messages: [{ role: "user", content: "What is the weather like in Boston?" }],
  functions: [
    {
      name: "get_current_weather",
      description: "Get the current weather in a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          },
          days: {
            type: "number",
            description: "For how many days ahead you want the forecast",
          },
          unit: { type: "string", enum: ["celsius", "fahrenheit"] },
        },
      },
      required: ["location", "days"],
    },
  ],
  stream: false,
  function_call: "get_current_weather",
};

llamaAPI
  .run(apiRequestJson)
  .then((response) => {
    // Log the complete response
    console.log("API Response:", JSON.stringify(response, null, 2));

    // Access and log the specific message content
    if (response.choices && response.choices.length > 0) {
      console.log("Response Message:", response.choices[0].message);
    } else {
      console.log("No choices in response.");
    }
  })
  .catch((error) => {
    // Log the error
    console.error("Error connecting to the API:", error);
  });
