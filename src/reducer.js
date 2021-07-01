export const reducer = (state, action) => {
    switch (action.type) {
        case "LOADED": {
            return { ...state, state: 'LOADED', env: { ...action.payload.env } }
        }
        case "ERRORED": {
            return { ...state, state: 'ERRORED', errorMessage: action.payload.error }
        }
        default: {
            return { ...state };
        }
    }
};