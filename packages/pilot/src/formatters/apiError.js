export const getResponseErrorMessage = ({ message, response }) => {
  if (response && response.errors) {
    const error = response.errors[0]
    return error.message
      ? error.message
      : message
  }

  return message
}

export default {
  getResponseErrorMessage,
}
