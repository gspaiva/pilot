import hasProperty from './hasProperty'

/**
 * Identify User in Appcues
 *
 * @param {number} userId user id
 * @param {string} userEmail user email
 * @param {string} userName user name
 * @param {string} userDateCreated account created date
 * @param {string} userPermission user permission
 * @param {string} environment current environment
 */
export const identify = (
  userId,
  userEmail,
  userName,
  userDateCreated,
  userPermission,
  environment
) => {
  if (hasProperty(window.Appcues)) {
    window.Appcues.identify(
      userId,
      {
        userEmail,
        userName,
        userDateCreated,
        userPermission,
        environment,
      }
    )
  }
}

/**
 * Set Company data in Appcues session
 *
 * @param {string} companyId company id
 * @param {string} companyName company name
 * @param {string} companyDateCreated company created date
 * @param {string} companyStatus company status
 * @param {number} userId user id
 *
 */
export const setCompany = (companyId, companyName, companyDateCreated, companyStatus, userId) => {
  if (hasProperty(window.Appcues)) {
    window.Appcues.identify(
      userId,
      {
        companyId,
        companyName,
        companyDateCreated,
        companyStatus,
      }
    )
  }
}

/**
 * Triggers appcues page change
 */
export const page = () => {
  if (hasProperty(window.Appcues)) {
    window.Appcues.page()
  }
}
