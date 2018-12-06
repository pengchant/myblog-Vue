// 本地localstorage操作
 export default {
    set: (key, value) => {
        if (!key) return;
        if (typeof value !== "string") {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },
    get: (key) => {
        if (!key) return;
        return localStorage.getItem(key);
    },
    delete: (key) => {
        if (!key) return;
        localStorage.removeItem(key);
    }
}