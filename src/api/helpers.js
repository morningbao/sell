// import axios from 'ts-axios-new'
import Data from '../../data.json'

// const urlMap = {
//   development: '/',
//   production: 'http://localhost:8080/'
// }
// const baseUrl = urlMap[process.env.NODE_ENV]
// const ERR_OK = 0
export function get(url) {
  // return function (params = {}) {
  //   return axios.get(baseUrl + url, {
  //     params
  //   }).then((res) => {
  //     const { errno, data } = res.data
  //     if (errno === ERR_OK) {
  //       return data
  //     }
  //   }).catch((e) => {
  //   })
  // }
  return function (params = {}) {
    return new Promise(function (resolve, reject) {
      switch (url) {
        case 'api/seller':
          resolve(Data.seller)
          break
        case 'api/goods':
          resolve(Data.goods)
          break
        case 'api/ratings':
          resolve(Data.ratings)
          break
        default:
          reject(new Error('no resource'))
      }
    })
  }
}
