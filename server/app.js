//** Declaration */
const express = require("express");

const { PORT } = require("./config/index");
//*App Initialization
const app = express();
//** MiddleWares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")());
app.use(require("./routes/index"));

app.listen(PORT, () => console.log(`server listen at port ${PORT}`));
