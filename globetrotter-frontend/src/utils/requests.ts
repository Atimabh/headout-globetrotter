import axios, { AxiosError, AxiosResponse } from 'axios'

const base_url = 'http://127.0.0.1:5000'
// const base_url = 'https://globetrotter.atimabh.in'

export async function getRequest(endpoint: string, responseType?: XMLHttpRequestResponseType) {
  try {
    const response = await axios.get(`${base_url}${endpoint}`, {
      responseType: responseType ? responseType : 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return {
      success: true,
      message: '',
      data: response.data,
      status: response.status,
    }
  } catch (error: any) {
    return normalizeErrorMessage(error)
  }
}



export async function postFormDataRequest(endpoint: string, payload: any) {
  try {
    const response = await axios.post(`${base_url}${endpoint}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    }
  } catch (error: any) {
    return normalizeErrorMessage(error)
  }
}

export async function postRequest(endpoint: string, payload: any) {
  try {
    const response = await axios.post(`${base_url}${endpoint}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('main', response)
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    }
  } catch (error: any) {
    return normalizeErrorMessage(error)
  }
}

export async function deleteRequest(endpoint: string) {
  try {
    const response = await axios.delete(`${base_url}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    }
  } catch (error: any) {
    return normalizeErrorMessage(error)
  }
}

export async function patchRequest(endpoint: string, payload: any) {
  try {
    const response = await axios.patch(`${base_url}${endpoint}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    }
  } catch (error: any) {
    console.log({ error })
    return normalizeErrorMessage(error)
  }
}

export async function patchRequestFormData(endpoint: string, payload: any) {
  try {
    const response = await axios.patch(`${base_url}${endpoint}`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    }
  } catch (error: any) {
    console.log({ error })
    return normalizeErrorMessage(error)
  }
}

async function clearSession() {
  const response = await getRequest('/api/management/auth/logout')
  if (response.success) {
    sessionStorage.clear()
    if (window.location.pathname != '/login') {
      window.location.href = '/login'
    }
  }
}

const defaultErrorMessage = 'Something went wrong, try again later'
interface ErrorType {
  message: string
  response: AxiosResponse
}

export const normalizeErrorMessage = (error: AxiosError<ErrorType>) => {
  let message = ''
  const success = false

  if (error.request.status) {
    switch (error.request.status) {
      case 401:
        if (error.response && 'message' in error.response.data) {
          message = error.response.data['message']
        } else {
          message = 'Wrong credentials, please, try again.'
        }
        clearSession()
        break
      case 403:
        if (error.response && 'message' in error.response.data) {
          message = error.response.data['message']
        } else {
          message = 'Attempted action is not allowed.'
        }
        break
      case 500:
        if (error.response && 'message' in error.response.data) {
          message = error.response.data['message']
        } else {
          message = 'Internal Server Error'
        }
        break
      case 400:
        if (error.response && 'message' in error.response.data) {
          message = error.response.data['message']
        } else {
          message = defaultErrorMessage
        }
        break
      case 404:
        if (error.response && 'message' in error.response.data) {
          message = error.response.data['message']
        } else {
          message = defaultErrorMessage
        }
        break
      default:
        message = defaultErrorMessage
    }
  }

  return {
    success,
    message,
    data: error.response,
    status: error.request.status ? error.request.status : 500,
  }
}
