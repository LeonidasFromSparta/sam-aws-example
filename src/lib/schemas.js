export const create_branch = {
    type: 'object',
    properties: {
        target: {
            type: 'object',
            properties: {
                branch_name: { type: 'string' },
                platform_type: { type: 'string' },
                ttl: { type: 'integer' }
            },
            required: ['branch_name', 'platform_type'],
            additionalProperties: false
        },
        depends_on: {
            type: 'object',
            properties: {
                branch_name: { type: 'string' },
                pull_number: { type: 'integer' },
            },
            required: ['branch_name'],
            additionalProperties: false
        }
    },
    required: ['target'],
    additionalProperties: false
}

export const create_pull = {
    type: 'object',
    properties: {
        branch_name: { type: 'string' },
        platform_type: { type: 'string' },
        pull_number: { type: 'integer' },
        author: { type: 'string' },
        description: { type: 'string' },
        created_at: { type: 'integer' },
    },
    required: ['branch_name', 'platform_type', 'pull_number', 'author', 'description', 'created_at'],
    additionalProperties: false
}

export const create_scan = {
    type: 'object',
    properties: {
        branch_name: { type: 'string' },
        platform_type: { type: 'string' },
        pull_number: { type: 'integer' },
        project_name: { type: 'string' },
        results: { type: 'string' },
        preset: { type: ['string', 'null'] }
    },
    required: ['branch_name', 'platform_type', 'pull_number', 'project_name', 'results', 'preset'],
    additionalProperties: false
}

export const delete_branch = {
    type: 'object',
    properties: {
        branch_name: { type: 'string' },
        platform_type: { type: 'string' }
    },
    required: ['branch_name', 'platform_type'],
    additionalProperties: false
}

export const delete_pull = {
    type: 'object',
    properties: {
        branch_name: { type: 'string' },
        platform_type: { type: 'string' },
        pull_number: { type: 'integer' }
    },
    required: ['branch_name', 'platform_type', 'pull_number'],
    additionalProperties: false
}

export const delete_scan = {
    type: 'object',
    properties: {
        branch_name: { type: 'string' },
        platform_type: { type: 'string' },
        pull_number: { type: 'integer' },
        project_name: { type: 'string' }
    },
    required: ['branch_name', 'platform_type', 'pull_number', 'project_name'],
    additionalProperties: false
}

export const rebuild_accuracy = {
    type: 'object',
    properties: {
        branch_name: { type: 'string' },
        platform_type: { type: 'string' },
        project_name: { type: 'string' },
        created_at: { type: 'integer' }
    },
    required: ['branch_name', 'platform_type', 'project_name', 'created_at'],
    additionalProperties: false
}
