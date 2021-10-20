import ajv from 'ajv'

export const validate_schema = (payload, schema) => {

    const data = JSON.parse(payload)
    const validate = new ajv({ allErrors: true }).compile(schema)

    if (!validate(data))
        throw new Error(`Error validating payload - ${validate.errors.map(({ message }) => JSON.stringify(message)).join('; ')}`)

    return data
}
