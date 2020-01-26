import axios from 'axios'

const url = process.env.NODE_ENV === 'development' ?
  'http://localhost:7070' :
  'https://crepemaker.xyz'

const create = (options) => axios.create({
  baseURL: url,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  ...options
})

export {
  create,
}