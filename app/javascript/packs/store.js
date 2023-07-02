import { USER_TOKEN, USER_DATA } from './constants';

export const getTokenData = () => {
    return localStorage.getItem(USER_TOKEN)
}

export const setTokenData = (token) => {
    localStorage.setItem(USER_TOKEN, token)
}

export const removeTokenData = () => {
    localStorage.removeItem(USER_TOKEN)
}

export const setUserData = (userData) => {
    localStorage.setItem(USER_DATA, JSON.stringify(userData))
}

export const getUserData = () => {
    try {
        return JSON.parse(localStorage.getItem(USER_DATA));
    } catch (error) {
        return {}
    }
}

export const removeUserData = () => {
    localStorage.removeItem(USER_DATA)
}

export const clearStorage = () => {
    removeTokenData();
    removeUserData();
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePasswordLength = (password) => {
    if (password.length < 8) {
        return false;
    }
    return true;
}

export const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
};

