import qs from 'query-string'

const parseParams = (search = '') => {
  const params = qs.parse(search)

  const { keywords = [] } = params

  return { keywords }
}

const createParams = ({ keywords } = {}) => {
  const params = {}

  if (keywords) {
    params.keywords = keywords
  }

  return qs.stringify(params)
}

export {
  parseParams,
  createParams,
}