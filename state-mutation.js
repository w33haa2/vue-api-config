/**
 * Generates mutation types
 * @param {*} moduleType 
 * @param {*} nameType 
 */
export function generateMutationTypes(moduleType, nameType) {
  const newModuleType = moduleType.toUpperCase()
  const newNameType = nameType.toUpperCase()
  return {
    initial: newModuleType+"/"+newNameType,
    success: newModuleType+"/"+newNameType+'_SUCCESS',
    fail: newModuleType+"/"+newNameType+'_FAIL',
  }
}
/**
 * Fetches Mutation Handlers
 * @param {*} type 
 */
export function fetchStateMutationHandler(type) {
  return type
}
