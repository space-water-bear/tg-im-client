// import { inflate } from 'pako'
// /**
//  * 解压gzip消息
//  */
// export function inflateMessage(encodeData: string) {
//     // 转二进制
//   const binaryString = atob(encodeData)
//   const uint8Array = new Uint8Array(binaryString.length)
//   for (let i = 0; i < binaryString.length; i++) {
//     uint8Array[i] = binaryString.charCodeAt(i)
//   }

//   const decompressedData = inflate(uint8Array, { to:'string'})

//   const message = JSON.parse(decompressedData);

//   return message
// }

