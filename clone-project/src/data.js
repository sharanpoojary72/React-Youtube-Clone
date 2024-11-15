export const API_KEY = 'AIzaSyD1xAM4uiEnuyUIqHdt-lYVjE9A7Bpj_fw';
export const CLIENT_ID = '350368409414-2s06ij0vv0j2eqte1oldn9h4tq6mipq4.apps.googleusercontent.com'

export const value_converter = (value) => {
    if (value >= 1000000) {
        return Math.floor(value / 1000000) + "M";
    } else if (value >= 1000) {
        return Math.floor(value / 1000) + "K";
    } else {
        return value;
    }
}


// Function to format numbers with commas
export const formatNumberWithCommas = (number) => {
    return parseInt(number).toLocaleString();
};


export const parseJwt=(token)=> {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}