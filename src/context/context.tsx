import React, { useReducer } from 'react';

const defaultContext: any = {
    scope: 'global',
    theme: 'light',
};

const context = React.createContext(defaultContext);
const ContextProvider = context.Provider;

function contextReducer(state: any, { type, payload }: any) {
    switch (type) {
        case 'theme':
            return {
                ...state,
                theme: payload,
            };
        default:
            return state;
    }
}

const Context = (props: any) => {
    const [state, dispatch] = useReducer(contextReducer, defaultContext);
    return (
        <ContextProvider
            value={{
                state,
                updateContext: dispatch,
            }}
        >
            {props.children}
        </ContextProvider>
    );
};

export { context,Context as ContextProvider };
