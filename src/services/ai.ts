import { Service } from 'typedi'
import { EventPrediction } from '../models/event'
import validator from 'validator'
import toFloat = validator.toFloat
import { ChildProcess } from 'child_process'

@Service()
export class Ai {
  async getPrediction (userName: string): Promise<EventPrediction | undefined> {
    // tslint:disable-next-line:no-require-imports
    const spawn: Function = require('child_process').spawn
    const pythonProcess: ChildProcess = spawn('python', ['node_modules/ai/ai.py', userName])
    if (pythonProcess.stdout === null) {
      return
    }
    // tslint:disable-next-line
    for await (const data of pythonProcess.stdout) {
      const regex: RegExp = /[0-9\.]+/g
      const result: RegExpMatchArray | null = [...(data.toString()).match(regex)]
      if (result) {
        return {
          prediction: toFloat(result[0]),
          accuracy: toFloat(result[1]),
        }
      }
    }

    return
  }
}
