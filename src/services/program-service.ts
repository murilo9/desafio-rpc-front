import axios from 'axios'
import { ProgramData } from '../components/Program'

const url = 'https://desafio-rpc.herokuapp.com?date='

export class ProgramService {

  static getDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    return `${year}-${month < 9 ? '0' + month : month}-${day < 9 ? '0' + day : day}`
  }

  static async load(): Promise<ProgramData[]> {
    const date = this.getDate()
    const res = await axios.get(url + date)
    return res.data.programme.entries
  }
}