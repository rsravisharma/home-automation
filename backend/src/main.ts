import express from "express";
import http from "http";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
import "./lib/logger";
import * as models from "./models";
import router from "./router"; 

import RequestLogger from "./middleware/RequestLogger";
import MqttManager from "./lib/MqttManager";


const boot = async () => {
    console.log("\n\n-----------------------------------------------------------------------")
    console.log("Launching Database");
    await models.init();

    console.log("\n\n-----------------------------------------------------------------------")
    console.log("Launching Mqtt Client");
    const mqttClient = MqttManager();

    //
    console.log("\n\n-----------------------------------------------------------------------")
    console.info("Launching router")
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(RequestLogger);
    app.set("mqtt", mqttClient);
    await router(app);


    console.log("\n\n-----------------------------------------------------------------------")
    console.log("Launching server");
    const port = Number(process.env.PORT || 3001);
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log("HTTP Server is listening to port : ", port);
    })

}

boot();
