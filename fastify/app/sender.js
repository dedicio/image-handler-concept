import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const AWS_REGION = process.env['AWS_REGION'];
const AWS_TOPIC_ARN = process.env['AWS_TOPIC_ARN'];
const AWS_ENDPOINT = process.env['AWS_ENDPOINT'];

const clientConfig = {
    region: AWS_REGION,
};

if (AWS_ENDPOINT) {
    clientConfig.endpoint = AWS_ENDPOINT;
}

const client = new SNSClient(clientConfig);

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