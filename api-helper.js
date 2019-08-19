import { api } from '@/utils/api/api-config'
import SecureLS from 'secure-ls'
import axios from 'axios'

/**
 * Call endpoints
 * @param {string} slug API endpoint by dot notation
 * @param {object} payload data to be passed to the API endpoint
 * @return {object|false} Promise object or false if invalid
 */
export function API(slug, payload = {}, headers = {}) {
  const endpoint = getEndpoint(slug, api)
  let check = true;
  if (!isValidEndpoint(endpoint)) check = false

  if (hasRequiredKeys(endpoint)) if (isValidPayload(payload, endpoint)) check = false

  if (check) {
    let params = {
      url: createEndpointUrl([
        process.env.API_HOST,
        createEndpointPrefix(slug, api),
        formatEndpointUrl(endpoint, payload),
      ]),
      method: endpoint.$method,
    }

    params.url = removeTrailingSlash(params.url)

    // if headers is not empty
    if (!Object.is(headers, {})) {
      params = { ...params, headers: headers }
    }

    if (endpoint.$method === 'GET') {
      params.url += addQueryString(endpoint, payload)
      payload = {}
    }

    let ls = new SecureLS({
      encodingType: 'aes'
    });

    let accessToken = ls.get('token').access_token
    let tenant = ls.get('tenant')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    payload.tenant_id = tenant.tenant_id
    payload.tenant_id_hash = tenant.tenant_id_hash
    const response = axios({
      ...params,
      data: { ...payload },
    })

    return response
  }

  return false
}

/**
 * Call endpoints with state mutations
 * @param slug
 * @param params
 * @param headers
 * @param commit
 * @param mutations
 * @returns {Promise<void>}
 * @constructor
 */
export async function STATE_API({ slug, params, headers }, commit, mutations) {
  commit(mutations[0])
  await API(slug, params, headers).then(({ data }) => {
    if (data.code >= 200 && data.code <= 299) {
      commit(mutations[1], data)
    } else if (data.code == 401 && data.title == 'Token is invalid.') {
      commit('AUTH/LOGOUT_SUCCESS')
    } else {
      commit(mutations[2], data)
    }
  }).catch(error => {
    commit(mutations[2], error.response.data)
  })
}

export const esc = encodeURIComponent

/**
 * Convert an object of query to string
 * @param {object} params key value pair of query
 * @return {string}
 */
export function QS(params) {
  return (Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&'))
}

/**
 * Checks if the slug is valid, and returns the endpoint object
 * @param {string} slug slug for API endpoint
 * @param {object} api api config
 * @returns {object} Endpoint object {$url, $method, $requires?, $format?}
 */
function getEndpoint(slug, api) {
  return slug.split('.').reduce((obj, ind) => {
    return getChildrenOrMethod(obj, ind);
  }, api) || {}
}

/**
 * Checks if the url needs formatting, then returns the formatted uri
 * @param {object} endpoint Endpoint object {$url, $method, $requires?, $format?}
 * @param {object} payload data passed to the api url
 * @return {string}
 */
function formatEndpointUrl(endpoint, payload) {
  if (endpoint.hasOwnProperty('$format')) {
    return endpoint.$format(payload)
  }
  return endpoint.$url
}

/**
 * Generates an endpoint URL
 * @param parts
 * @returns {*}
 */
function createEndpointUrl(parts) {
  return parts.join('/')
}

/**
 * Removes all the
 * @param url
 * @returns {*}
 */
function removeTrailingSlash(url) {
  if (_.endsWith(url, '/')) url = url.slice(0, -1)
  return url
}

/**
 * Appends a query to the URL
 * @param endpoint
 * @param payload
 * @returns {string}
 */
function addQueryString(endpoint, payload) {
  if (hasRequiredKeys(endpoint)) {
    let omitKeys = endpoint.$requires
    let query = _.omit(payload, omitKeys)
    return _.isEmpty(query) ? '' : '?' + QS(query)
  }
  return '?' + QS(payload)
}

/**
 * Creates the slug's prefix
 * @param {string} slug slug for API endpoint
 * @param {object} api api config
 */
function createEndpointPrefix(slug, api) {
  // the accumulator `acc = {object, prefix}` will contain the current object in the iterator and the prefix
  return slug.split('.').reduce((acc, ind) => {
    // lets get the child object or the child object's method
    let obj = getChildrenOrMethod(acc.object, ind)

    // if this is a child object, it will have a $prefix, pass it to the accumulator
    if (obj.$prefix) acc.prefix.push(obj.$prefix)

    return { object: obj, prefix: acc.prefix }
  }, { object: api, prefix: [] }).prefix.join('/')
}

/**
 * Checks if the payload has the required keys
 * @param {object} payload data that will be passed to the endpoint
 * @param {array} required list of required data keys
 * @returns {boolean} true on success, false otherwise
 */
function isValidPayload(payload, endpoint) {
  return endpoint.$requires.filter((key) => payload.hasOwnProperty(key)).length === 0
}

function isValidEndpoint(endpoint) {
  return endpoint.hasOwnProperty('$url')
}

function hasRequiredKeys(endpoint) {
  return endpoint.hasOwnProperty('$requires');
}

function getChildrenOrMethod(obj, childOrMethodName) {
  return (obj[childOrMethodName] || obj.$children[childOrMethodName]) || {}
}
