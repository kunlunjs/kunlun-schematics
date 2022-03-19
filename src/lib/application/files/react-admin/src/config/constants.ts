// https://mock.your.api.com/v1
export let API_ENDPOINT = ''
try {
  API_ENDPOINT =
    import.meta.env.VITE_SERVER_BASE_URL ||
    process?.env?.VITE_SERVER_BASE_URL ||
    '' // 'http://localhost:3000'
} catch (error) {
  //
}

export const REQ_TIMEOUT = 60000

export const LOGIN_PAGE_URL = '/login'
