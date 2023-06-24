import mqtt from "mqtt";

export default function MqttManager() {
    const client = mqtt.connect(process.env.MQTT_ENDPOINT as string);
    client.on('connect', function () {
        console.log("MQTT Connected");
        client.subscribe('message');
        // client.publish('message', "hello");
    })

    client.on('message', function (topic : string, message : any) {
        console.log(topic, message.toString())
    });

    return client;
}