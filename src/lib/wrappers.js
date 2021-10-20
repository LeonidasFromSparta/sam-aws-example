export const gateway = (fn) => {

    return (event, context) => {

        return Promise.resolve(fn(event, context))
            .then((data) => {

                if (data.http_code === 201) {

                    return {
                        statusCode: data.http_code,
                        headers: { 'Access-Control-Allow-Origin': "*" },
                        body: JSON.stringify({ code: data.http_code, message: data.message })
                    }
                }
            })
            .catch((err) => {

                if (err.http_code) {

                    console.log({ code: err.http_code, message: err.message })

                    return {
                        statusCode: err.http_code,
                        headers: { 'Access-Control-Allow-Origin': "*" },
                        body: JSON.stringify({ code: err.http_code, message: err.message })
                    }
                }

                console.log({ message: err.message, stack: err.stack })

                return {
                    statusCode: 500,
                    headers: { 'Access-Control-Allow-Origin': "*" },
                    body: JSON.stringify({ code: 500, message: err.message, stack: err.stack })
                }
            })
    }
}

export const sqs = (fn) => {

    return (event, context) => {

        return Promise.resolve(fn(event, context))

            .then((data) => {

                return 'OK'
            })
            .catch((err) => {

                console.log({ message: err.message, stack: err.stack })

                return 'OK'
            })
    }
}
