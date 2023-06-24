import mqtt from "mqtt";

export default async function MqttManager() {
    const client = mqtt.connect(process.env.MQTT_ENDPOINT as string);
    client.on('connect', function (err) {
        client.subscribe('message');
    });

    client.on('message', function (topic: string, message: any) {
        console.log(topic, message.toString())
    });

    return client;
}