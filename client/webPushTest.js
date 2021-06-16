const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const publicVapidKey = 'BErs7KSrHF1FW_xpeQmoliYuyfFW1Lzt7g499Xe6_uIruTMk5z3GWFxiAA2YVVbyy4SDrj1PmTx_IiwBL7rIcKE';
const privateVapidKey = 'oHER6KGKHmWA6fuGRcz3xcZ-NIDoxXS15WMdkcHmSx4';

webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
  );
  
  // Subscribe Route
  app.post("/subscribe", function(req, res) {
    // Get pushSubscription object
    const subscription = req.body;
  
    // Send 201 - resource created
    res.status(201).json({});
  
    // Create payload
    const payload = JSON.stringify({ title: "Push Test" });
  
    // Pass object into sendNotification
    webpush
      .sendNotification(subscription, payload)
      .catch(err => console.error(err));
  });
  
  const port = 5000;
  
  app.listen(port, () => console.log('Server started on port ${port}'));