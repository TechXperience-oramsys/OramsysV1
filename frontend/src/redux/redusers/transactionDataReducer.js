import { ADD_TRANSACTION, ADD_TRANSACTION_ERROR, EDIT_TRANSACTION, EDIT_TRANSACTION_ERROR, GET_ALL_TRANSACTION, GET_ALL_TRANSACTION_ERROR, GET_TRANSACTION_BY_ID, GET_TRANSACTION_BY_ID_ERROR, TRANSACTION_DATA } from '../types';

const initialState = {
    transactionData: [],

    addTransaction: [],
    addTransactionError: [],

    getAllTransaction: [],
    getAllTransactionError: [],

    getTransactionById: [],
    getTransactionByIdError: [],
    
    editTransaction: [],
    editTransactionError: [],
};

export const transactionDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRANSACTION_DATA:

            // console.log('at redux',action.payload);
            return {
                ...state,
                transactionData: action.payload,
            };


        case ADD_TRANSACTION:
            return {
                ...state,
                addTransaction: action.payload,
            };

        case ADD_TRANSACTION_ERROR:
            return {
                ...state,
                addTransactionError: action.payload,
            };


        case GET_ALL_TRANSACTION:
            return {
                ...state,
                getAllTransaction: action.payload,
            };

        case GET_ALL_TRANSACTION_ERROR:
            return {
                ...state,
                getAllTransactionError: action.payload,
            };


        case GET_TRANSACTION_BY_ID:
            return {
                ...state,
                getTransactionById: action.payload,
            };

        case GET_TRANSACTION_BY_ID_ERROR:
            return {
                ...state,
                getTransactionByIdError: action.payload,
            };


        case EDIT_TRANSACTION:
            return {
                ...state,
                editTransaction: action.payload,
            };

        case EDIT_TRANSACTION_ERROR:
            return {
                ...state,
                editTransactionError: action.payload,
            };
        default:
            return state;
    }
};
