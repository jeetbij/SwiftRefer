export const USER_TOKEN = "user_token"
export const USER_DATA = "user_data"
export const AUTHORIZATION_HEADER = "Authorization"
export const VALID_EMAIL_PATTERN = "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-zA-Z]{2,4}";
export const BASE_URL = "http://localhost:3000"
export const ENDPOINTS = {
    SIGN_UP: '/users/',
    LOGIN: '/users/sign_in',
    SIGN_OUT: '/users/sign_out',
    REFERRALS: '/api/v1/referrals'
}
export const COMMON_HEADERS = {
    "Content-Type": "application/json",
}