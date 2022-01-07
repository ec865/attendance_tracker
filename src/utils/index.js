
export function getToken() {
    let accessToken = null;
    if (typeof window !== undefined && window.localStorage.getItem('access-token')) {
        accessToken = window.localStorage.getItem('access-token');
        return accessToken;
    } else {
        removeAccessToken();
    }
    return accessToken;
}

export const setAccessToken = (token) => {
    window.localStorage.setItem('access-token', token);
};

export const removeAccessToken = () => {
    window.localStorage.removeItem('access-token');
};


export function getRole() {
    let accessRole = null;
    if (typeof window !== undefined && window.localStorage.getItem('access-role')) {
        accessRole = window.localStorage.getItem('access-role');
        return accessRole;
    } else {
        removeAccessRole();
    }
    return accessRole;
}

export const setAccessRole = (role) => {
    window.localStorage.setItem('access-role', role);
};

export const removeAccessRole = () => {
    window.localStorage.removeItem('access-role');
};