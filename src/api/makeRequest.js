import axios from 'axios'
// import isNode from 'detect-node'
// import chalk from 'chalk'

/* eslint-disable prefer-promise-reject-errors */
export default function makeRequest({
  url, method = 'get', data = {}, headers = {}
}) {
  // console.log(`request: ${url}`)
  const options = {
    method,
    data,
    url,
    headers: {
      is_ajax_request: true,
      ...headers,
    },
    timeout: 5 * 1000,
  }
  if (method === 'get') {
    options.params = data
  } else {
    options.data = data
  }
  return new Promise((resolve, reject) => {
    axios(options)
      .then(response => {
        const { code, msg } = response.data
        const data = response.data.body || response.data.data
        if (+code === 200) {
          resolve({
            data,
          })
        } else {
          console.log('\x1b[31m====================DEBUG/s======================\x1b[31m')
          console.log(`request url: ${url}`)
          console.log(`request body: ${JSON.stringify(data)}`)
          console.log('\x1b[31m====================DEBUG/e======================\x1b[31m')
          console.log('\r')
          reject({
            message: msg,
            code: 500,
            briefErr: {
              url,
            },
          })
        }
      })
      .catch(e => {
        if (e.response) {
          if (e.response.status === 401) {
            reject({
              message: '请登录',
              code: 401,
              briefErr: {
                url,
              },
              origin: e,
            })
          } else {
            reject({
              message: '系统异常，请稍后再试！',
              code: e.response.status,
              briefErr: {
                url,
              },
              origin: e,
            })
          }
        } else {
          reject({
            message: '网络异常，请稍后再试！',
            code: 500,
            briefErr: {
              url,
            },
            origin: e,
          })
        }
        console.log('\x1b[31m====================DEBUG/s======================\x1b[31m')
        console.log(`request url: ${url}`)
        console.log(`request body: ${JSON.stringify(data)}`)
        console.log(`response status: ${e.response ? e.response.status : null}`)
        console.log('\x1b[31m====================DEBUG/e======================\x1b[31m')
        console.log('\x1b[37m\r')
      })
  })
}
