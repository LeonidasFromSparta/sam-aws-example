import { SQS } from 'aws-sdk'

export const connect = () => {

    return new SQS({ endpoint: 'https://vpce', region: 'eu-west-1' })
}

export const sendMessage = (client, queue, body, delay = 0) => {

    return new Promise((resolve, reject) => {

        const params = {
            QueueUrl: `https://vpce/${queue}`,
            MessageBody: JSON.stringify(body),
            DelaySeconds: delay
        }

        client.sendMessage(params, (err, data) => {

            if (err)
                return reject(err)

            resolve(data)
        })
    })
}
