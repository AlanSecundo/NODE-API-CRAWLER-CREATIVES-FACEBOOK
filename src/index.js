const express = require("express");
var cors = require("cors");
const app = express();

app.use(express.json(), cors());

require("./controllers/creativeController")(app);
require("./controllers/specialistController")(app);

app.listen(3000, () => console.log("Running on localhost:3000"));
