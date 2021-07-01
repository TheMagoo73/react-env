import React from 'react';
import { useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types'

import EnvContext from './env-context'
import { reducer } from './reducer'

const EnvProvider = ({
    children,
    url
}) => {

    const [state, dispatch] = useReducer(
        reducer,
        {
            state: 'LOADING'
        }
    )

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url)
                const env = await res.json()
                dispatch({ type: 'LOADED', payload: { env, url } })
            } catch(e) {
                dispatch({ type: 'ERRORED', payload: { error: e.message }})
            }
        })();    
    }, [url]);

    return (
        <EnvContext.Provider
            value={{
                ...state
            }}
        >
            {children}
        </EnvContext.Provider>
    )
}

EnvProvider.propTypes = {
    children: PropTypes.any,
    uri: PropTypes.string
}

export default EnvProvider;