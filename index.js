const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(
	"sk_test_51Is8NSSJt0CbONA4w38hWPvqJPZOU8FpEpE2Dx3TRojx3ZvemdlsImkN45PvieibKlqmgrd3tbYZIS1Zgs0Tl3A000smrtkchw"
);
const uuid = require("uuid");
const dotenv = require("dotenv");
const cookies = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

//making passwords secure using .envwwwwww
dotenv.config({ path: "./.env" });

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookies());

//connect to db
require("./db/connect.js");

//importig outsourced routes
app.use(require("./router/auth.js"));

//serving the files
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

//server listening on port 3000
PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
