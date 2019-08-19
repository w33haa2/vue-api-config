/**
 * Raw API function for state calls.
 * Can be used to explicitly write the route without using the api-config structure.
 * @param {object} params
 * @param {object} commit
 * @param {object} types
 */
export async function RAW_API(params, commit, types) {
  try {
    commit(types[0])
    const response = await axios(params)
    if (response.data.code >= 200 && response.data.code <= 299) {
      commit(types[1], response.data)
      return response.data
    } else {
      commit(types[2], response)
    }
  } catch (error) {
    commit(types[2], error.response.data)
  }
}
