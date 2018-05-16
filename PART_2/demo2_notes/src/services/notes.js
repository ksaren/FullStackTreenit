import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const nonExisting = {
        id: 10000,
        content: 'Tätä muistiinpanoa ei ole palvelimelta',
        date: '2017-12-10T17:30:31.098Z',
        important: true
      }
    const request = axios.get(baseUrl)
    return request.then(response => response.data.concat(nonExisting)) 
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }