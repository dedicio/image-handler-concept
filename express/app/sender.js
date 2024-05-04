import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const AWS_REGION = process.env['AWS_REGION'];
const AWS_TOPIC_ARN = process.env['AWS_TOPIC_ARN'];

const client = new SNSClient({ region: AWS_REGION });

export const send = async (topic, message) => {
    const params = {
        Message: message,
        TopicArn: `${AWS_TOPIC_ARN}:${topic}`,
    };
    const command = new PublishCommand(params);

    try {
        const data = await client.send(command);
        console.log('🚀 ~ data:', data);
    } catch (error) {
        console.log('🚀 ~ error:', error);
    }
}