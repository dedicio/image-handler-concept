import amqp from "amqplib";

export async function send(queue: string, message: string) {
    let connection;
    try {
        connection = await connect();
        const channel = await createChannel(connection);
        await channel.assertQueue(queue, { durable: true });
        const sent = channel.sendToQueue(queue, Buffer.from(message));
        const logMessage = sent ? `Sent ${message}` : `Failed to send ${message}`;
        console.log(logMessage);
        await channel.close();
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

function connect(): Promise<amqp.Connection> {
    return amqp.connect('amqp://rabbitmq:rabbitmq@rabbitmq:5672');
}

function createChannel(connection: amqp.Connection): Promise<amqp.Channel> {
    return connection.createChannel();
}