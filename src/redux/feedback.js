import * as ActionTypes from './ActionTypes';

export const Promotions = (state  = { feedback:[] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FEEDBACK:
            return {...state, feedback: action.payload};
    }
}