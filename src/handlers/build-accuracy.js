import build_accuracy from './../lib/functions/build-accuracy'
import { sqs } from './../lib/wrappers'

export const handler = sqs(build_accuracy)
