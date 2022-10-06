const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Create Express Server
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;

// Logging
app.use(morgan("dev"));

// Add CORS HTTP headers
app.use(cors());

// Parse json data
app.use(express.json());

// Parse urlencoded form data
app.use(express.urlencoded({ extended: true }));

app.get(/.*/, function (req, res) {
  res.send("Hello World!");
});

// ACK TWILIO WEBHOOK -> EMPTY TWIML RESPONSE
app.post(/\/(twilio)/, (req, res, next) => {
  console.log("ACK TWILIO WEBHOOK");
  // Reply with empty TWIML response
  res.send("<Response></Response>");
});

// ACK CATCHALL WEBHOOK
// Catchall to acknowledge webhooks that don't match the paths above
app.post(/.*/, (req, res, next) => {
  console.log("ACK CATCHALL WEBHOOK");
  res.sendStatus(200);
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Starting Server on port: ${PORT}`);
});
