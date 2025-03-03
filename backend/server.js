const dotenv = require("dotenv");
const mongoose = require("mongoose");
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({path: "./config.env"});

const app = require("./app");

mongoose.connect(process.env.DB).then(() => {
    console.log('DB Connection Sucessfull');
}).catch((err)=>console.log(err));

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log(`App Running on port ${port}`);
})

process.on("unhandledRejection", (err) => {
    console.log("UNHANDED REJECTION! shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});