import { Client } from 'pg'

export const connect = async () => {

    const client = new Client({ connectionString: process.env.POSTGRESQL })
    await client.connect()
    return client
}

export const create_branch = (client, { branch_name, platform_type, on_id, on_created_at, ttl }) => {

    const stmt =
        'INSERT INTO BRANCHES (BRANCH_NAME, PLATFORM_TYPE, ON_ID, ON_CREATED_AT, TTL) ' +
        'VALUES ($1, $2, $3, $4, $5);'

    const values = [
        branch_name,
        platform_type,
        on_id,
        on_created_at,
        ttl
    ]

    return client.query(stmt, values)
}

export const create_pull = (client, { branch_id, pull_number, author, description, created_at }) => {

    const stmt =
        'INSERT INTO PULLS (BRANCH_ID, PULL_NUMBER, AUTHOR, DESCRIPTION, CREATED_AT) ' +
        'VALUES ($1, $2, $3, $4, $5);'

    const values = [
        branch_id,
        pull_number,
        author,
        description,
        created_at
    ]

    return client.query(stmt, values)
}

export const create_scan = (client, { pull_id, project_id, results_name, results_hash, preset_name }) => {

    const stmt = '' +
        'INSERT INTO SCANS (PULL_ID, PROJECT_ID, RESULTS_NAME, RESULTS_HASH, PRESET_NAME) ' +
        'VALUES($1, $2, $3, $4, $5);'

    const values = [
        pull_id,
        project_id,
        results_name,
        results_hash,
        preset_name
    ]

    return client.query(stmt, values)
}

export const find_branch = (client, branch_name, platform_type) => {

    const stmt =
        'SELECT * FROM BRANCHES WHERE BRANCH_NAME = $1 AND PLATFORM_TYPE = $2'

    const values = [
        branch_name,
        platform_type
    ]

    return client.query(stmt, values).then(({ rows }) => rows[0] || null)
}

export const delete_branch_scans = (client, branch_id) => {

    const stmt =
        'DELETE FROM SCANS WHERE BRANCH_ID = $1'

    const values = [
        branch_id
    ]

    return client.query(stmt, values)
}

export const delete_branch_pulls = (client, branch_id) => {

    const stmt =
        'DELETE FROM PULLS WHERE BRANCH_ID = $1'

    const values = [
        branch_id
    ]

    return client.query(stmt, values)
}

export const delete_branch = (client, branch_id) => {

    const stmt =
        'DELETE FROM BRANCHES WHERE ID = $1'

    const values = [
        branch_id
    ]

    return client.query(stmt, values)
}

export const find_dependable_branches = (client, branch_id) => {

    const stmt =
        'select org.branch_name, org.platform_type from branches as dep join branches as org on dep.on_id = org.id ' +
        'where dep.branch_id = $1;'

    const values = [
        branch_id
    ]

    return client.query(stmt, values).then(({ rows }) => rows)
}

export const find_pull = (client, branch_id, pull_number) => {

    const stmt = 'SELECT * FROM PULLS WHERE BRANCH_ID = $1 AND PULL_NUMBER = $2;'

    const values = [
        branch_id,
        pull_number
    ]

    return client.query(stmt, values).then(({ rows }) => rows[0])
}

export const delete_pull = (client, branch_id, pull_id) => {

    const stmt = 'DELETE FROM PULLS WHERE BRANCH_ID = $1 AND ID = $2;'

    const values = [
        branch_id,
        pull_id
    ]

    return client.query(stmt, values).then(({ rows }) => rows[0])
}

export const delete_pull_scans = (client, branch_id, pull_id) => {

    const stmt =
        'DELETE FROM SCANS WHERE BRANCH_ID = $1 AND ID = $2'

    const values = [
        branch_id,
        pull_id
    ]

    return client.query(stmt, values)
}

export const find_project = (client, project_name) => {

    const stmt = 'SELECT * FROM PROJECTS WHERE PROJECT_NAME = $1'
    const values = [project_name]

    return client.query(stmt, values).then(({ rows }) => rows[0] || null)
}

export const find_scan = (client, pull_id, project_id) => {

    const stmt = 'SELECT * FROM SCANS WHERE PULL_ID = $1 AND PROJECT_ID = $2;'
    const values = [pull_id, project_id]

    return client.query(stmt, values).then(({ rows }) => rows[0] || null)
}
