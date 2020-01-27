import axios from 'axios'

const getCategories = async () => {
  const res = await axios.get('/data/categories.json')

  if (res.status === 200) {
    return res.data
  } else {
    return null
  }
}

const getCategoriesDict = async () => {
  const res = await axios.get('/data/categories.json')

  if (res.status === 200) {
    const dict = {}
    for (const category of res.data) {
      dict[category.id] = category
    }
    return dict
  } else {
    return null
  }
}

export {
  getCategories,
  getCategoriesDict,
}