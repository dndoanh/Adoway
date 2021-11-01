import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialSubscriptionsState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    subscriptionForEdit: undefined,
    lastError: null,
    subscriptionInRoles:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState: initialSubscriptionsState,
    reducers: {
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }
        },
        startCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },

        // subscriptionSelected
        subscriptionSelected: (state, action) => {
            state.subscriptionForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findSubscriptions
        subscriptionsFetched: (state, action) => {
            const { totalCount, entities } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
            state.entities = state.entities.map(entity => {
                entity.dob = entity.dob && new Date(entity.dob) || null;
                return entity;
            });
            
        },
        // createSubscription
        subscriptionCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.subscription);
        },
        // updateSubscription
        subscriptionUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.subscription.id) {
                    return action.payload.subscription;
                }
                return entity;
            });
        },
        // deleteSubscription
        subscriptionDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
