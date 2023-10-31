import {registerBasicNode} from './basicNode';

const nodeMapping: {[key: string]: any} = {
	basicNode: registerBasicNode
};

export const registerNodes = (nodeTypes:  string[]) => {
	nodeTypes.forEach(item => {
		if (item && nodeMapping[item]) {
			console.log(`[Register Node]: ${item}`);
			nodeMapping[item]?.();
		}
	});
};