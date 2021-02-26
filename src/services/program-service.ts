import axios from 'axios'
import { ProgramData } from '../components/Program'

const url = 'https://desafio-rpc.herokuapp.com/'

export class ProgramService {

  static async load(): Promise<ProgramData[]> {
    const res = await axios.get(url)
    return res.data.programme.entries
  }
}