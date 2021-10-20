import { execFileSync } from 'child_process'

export default async (event, context) => {

    const data = JSON.parse(event.Records[0].body)

    const env = {
        SAST_BRANCH_ID: data.branch_id,
        SAST_PROJECT_ID: data.project_id,
        SAST_CREATED_AT: data.created_at,
        POSTGRESQL: process.env.POSTGRESQL
    }

    execFileSync('/opt/dist/go-app-accuracy', { stdio: 'inherit', timeout: 840000, env: { ...process.env, ...env } })
}
