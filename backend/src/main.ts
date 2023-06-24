import express from "express";
import http from "http";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
const { instrument } = require("@socket.io/admin-ui");
dotenv.config();
import "./lib/logger";
import {_console} from "./lib/logger";
import * as models from "./models";
import router from "./router"; 

import RequestLogger from "./middleware/RequestLogger";
import MqttManager from "./lib/MqttManager";
import chalk from "chalk";
import columnify from "columnify";


const boot = async () => {
    console.log("-----------------------------------------------------------------------")
    console.info(chalk.blue("Launching Database"));
    await models.init();

    console.log("-----------------------------------------------------------------------")
    console.info(chalk.blue("Launching Mqtt Client"));
    const mqttClient = await MqttManager();

    //
    console.log("-----------------------------------------------------------------------")
    console.info(chalk.blue("Launching router"))
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(RequestLogger);
    app.set("mqtt", mqttClient);
    const endpoints = await router(app);
    _console.log(columnify(endpoints, {
        columnSplitter: ' → ',
        showHeaders: false
      }));
    const server = http.createServer(app);

    console.log("-----------------------------------------------------------------------")
    console.info(chalk.blue("Launching socket.io"));
    const io = new Server(server, { cors: { origin: '*' } });
    instrument(io, {
        auth: false,
        mode: "development",
      });
    app.set("io", io); //assign io variable to app
    console.log("Socket Io has beed launched");


    console.log("-----------------------------------------------------------------------")
    console.info(chalk.blue("Launching server"));
    const port = Number(process.env.PORT || 3001);
    server.listen(port, () => {
        console.log("HTTP Server is listening to port : ", port);
    })

}

boot();
