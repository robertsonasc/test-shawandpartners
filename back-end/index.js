const app = require('express')();
const PORT = 8080;

const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.github.com/users',
});

app.get('/api/users', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.query.since) {
    if (/^[0-9]+$/.test(req.query.since)) {
      try {
        const response = await instance.get(instance.defaults.baseURL, {
          params: {
            since: req.query.since,
          }
        })
        let startIndex = response.headers.link.search('since=')
        let endIndex = response.headers.link.search('>; rel="next"')
        startIndex += 6

        nextP = response.headers.link.toString().substring(startIndex, endIndex)
        nextP = parseInt(nextP)

        if (response.status === 200) {
          res.status(200).send({
            data: response.data,
            nextPage: nextP
          })
        }
      } catch (error) {
        res.status(400).send(error)
      }
    } else {
      res.status(400).send({
        errorMessage: 'senci incorrect format'
      })
    }
  } else {
    res.status(400).send({
      errorMessage: 'senci required'
    })
  }
})

app.get('/api/users/:username/details', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { username } = req.params

  try {
    const response = await instance.get(`/${username}`)
    if (response.status === 200) {
      res.status(200).send(response.data)
    }
  } catch (error) {
    res.status(400).send({
      errorMessage: 'invalid username, or network error'
    })
  }
})

app.get('/api/users/:username/repos', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { username } = req.params

  try {
    const response = await instance.get(`/${username}/repos`)
    if (response.status === 200) {
      res.status(200).send(response.data)
    }
  } catch (error) {
    res.status(400).send({
      errorMessage: 'invalid username, or network error'
    })
  }
})

app.listen(
  PORT,
  () => console.log(`back-end is live on http://localhost:${PORT}`)
)

