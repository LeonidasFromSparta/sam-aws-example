import { S3 } from 'aws-sdk'

export const connect = () => {

    return new S3()
}

export const read_object = (client, bucket, file_name) => {

    return client.getObject({ Bucket: bucket, Key: file_name }).promise()
}

export const write_object = (client, bucket, file_name, bytes) => {

    return client.upload({ Bucket: bucket, Key: file_name, Body: bytes }).promise()
}

export const delete_object = (client, bucket, file_name) => {

    return client.deleteObject({ Bucket: bucket, Key: file_name })
}
