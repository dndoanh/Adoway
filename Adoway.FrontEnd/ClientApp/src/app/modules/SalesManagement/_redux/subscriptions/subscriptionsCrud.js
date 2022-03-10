import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/subscription`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findSubscriptions(queryParams) {
    return axios.post(`${USERS_URL}/searchSubscriptions`, queryParams);
}

// CREATE =>  POST: add a new subscription to the server
export function createSubscription(subscription) {
    return axios.post(`${USERS_URL}/createSubscription`, subscription);
}

// UPDATE => PUT: update the subscription on the server
export function updateSubscription(subscription) {
    return axios.post(`${USERS_URL}/updateSubscription`, subscription);
}

// DELETE => delete the subscription from the server
export function deleteSubscription(subscriptionId) {
    return axios.post(`${USERS_URL}/deleteSubscription?id=${subscriptionId}`);
}

export function importSubscription(subscription) {
    return axios.post(`${USERS_URL}/importSubscription`, subscription);
}
export function exportSubscription(subscription) {
    return axios({
        url: `${USERS_URL}/exportSubscription`, //your url
        method: 'POST',
        responseType: 'blob', // important
        data: subscription
    })

    /*return axios.post(`${USERS_URL}/exportSubscription`, subscription);*/
}
