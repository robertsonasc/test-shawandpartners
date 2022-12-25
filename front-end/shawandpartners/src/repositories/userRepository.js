import axios from "axios"

const baseURL = 'http://localhost:8080/api/users'

const instance = axios.create({
  baseURL
});

export default {
  getUsersAndIdNextPage(idNextPage){
    return instance.get(instance.defaults.baseURL, {
      params: {
        since : idNextPage
      }
    })
  },
  getUserDetails(username){
    return instance.get(`/${username}/details`)
  },
  getUserRepos(username){
    return instance.get(`/${username}/repos`)
  }
}

