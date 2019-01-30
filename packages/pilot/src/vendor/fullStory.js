/* eslint-disable no-undef */
import hasProperty from './hasProperty'

/**
 * Identify User in FullStory
 *
 * @param {number} id user id
 * @param {string} email user email
 * @param {string} userName user name
 * @param {string} userDateCreated account created date
 * @param {string} userPermission user permission
 * @param {string} environment current environment
 */
export const identify = (
  id,
  email,
  userName,
  userDateCreated,
  userPermission,
  environment
) => {
  if (hasProperty(window.FS)) {
    window.FS.identify(
      id,
      {
        email_str: email,
        environment_str: environment,
        userDateCreated_str: userDateCreated,
        userName_str: userName,
        userPermission_str: userPermission,
      }
    )
  }
}

/**
 * Set Company data in FullStory session
 *
 * @param {string} id company id
 * @param {string} name company name
 * @param {string} dateCreated company created date
 * @param {string} status company status
 *
 */
export const setCompany = (id, name, dateCreated, status) => {
  if (hasProperty(window.FS)) {
    window.FS.setUserVars({
      companyDateCreated_str: dateCreated,
      companyId_str: id,
      companyName_str: name,
      companyStatus_str: status,
    })
  }
}

