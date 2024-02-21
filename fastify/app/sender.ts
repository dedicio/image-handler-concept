import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import type { PutEventsCommandInput } from "@aws-sdk/client-eventbridge";

const AWS_REGION = process.env["AWS_REGION"];

const client = new EventBridgeClient({ region: AWS_REGION });

export const send = async (topic: string, message: string) => {
    const params: PutEventsCommandInput = {
        Entries: [
            {
                Detail: message,
                DetailType: topic,
                Source: 'image-handler',
            }
        ]
    };
    const command = new PutEventsCommand(params);

    try {
        const data = await client.send(command);
        console.log('🚀 ~ data:', data);
    } catch (error) {
        console.log('🚀 ~ error:', error);
    }
}
