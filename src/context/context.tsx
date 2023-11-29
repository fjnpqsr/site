import React, { useReducer } from 'react';

const defaultContext: any = {
	scope: 'global',
	theme: 'light',
	test: 'default',
};

const context = React.createContext(defaultContext);
const ContextProvider = context.Provider;

function contextReducer(state: any, { type, payload }: any) {
	switch (type) {
	case 'theme':
		return { ...state, theme: payload, };
	case 'test':
		return { ...state, [type]: payload, };
	default:
		return { ...state, [type]: payload, };
	}
}

const Context = (props: any) => {
	const { routes } = props;
	const [state, dispatch] = useReducer(contextReducer, {
		...defaultContext,
	});
	return (
		<ContextProvider
			value={{
				state,
				routes,
				updateContext: dispatch,
			}}
		>
			{props.children}
		</ContextProvider>
	);
};

export { context, Context as ContextProvider };
