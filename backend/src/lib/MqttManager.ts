import mqtt from "mqtt";

export default async function MqttManager() {
    const client = mqtt.connect(process.env.MQTT_ENDPOINT as string);
    await new Promise((resolve, reject)=>client.on('connect', function (err) {
        if(!client.connected) reject(new Error("Unable to connect mqtt"));
        resolve(true);
        console.log("MQTT Connected");
        client.subscribe('message');
        // client.publish('message', "hello");
    }));

    client.on('message', function (topic : string, message : any) {
        console.log(topic, message.toString())
    });

    return client;
}