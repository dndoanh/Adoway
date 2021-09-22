export default function setupAxios(axios, store) {
    axios.interceptors.request.use(
        config => {
            const {
                auth: { accessToken }
            } = store.getState();

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            config.headers.ApiKey = `${process.env.REACT_APP_API_KEY}`;
            return config;
        },
        err => Promise.reject(err)
    );
}
