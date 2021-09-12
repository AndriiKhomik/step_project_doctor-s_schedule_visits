// async function getUserAsync(id) {
//   if (!id) return new Error('Empty id')
//   try {
//     const response = await fetch(`https://ajax.test-danit.com/api/json/users/${id}`)
//     const data = await response.json()
//     return data
//   } catch (e) {
//     console.error(e)
//   }
// }   --- example /////