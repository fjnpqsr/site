import React, {useEffect, useRef} from 'react';

interface IPlayer {
    config: {
        source: string
    }
	renew?: boolean
}

export default function Player(props:IPlayer) {
	const {config: {source}} = props;
	const playerRef = useRef<any>(null);

	const createPlayer = () => {
		const playerIns = new Aliplayer({
			id: 'js_player',
			height: '400px',
			width: '500px',
			isLive: true,
			autoplay: true,
			mute: true,
			enableH265:true,
			skinLayout:[
				{name: 'H5Loading', align: 'cc'},
			],    
		});
		console.log({playerIns}, '>>> 222');
		playerRef.current = playerIns;
	};

	useEffect(() => {
		createPlayer();
	}, []);

	useEffect(() => {
		
	}, []);


	useEffect(() => {
		playerRef.current?.loadByUrl(source);
	}, [source]);

	return (
		<div id='js_player'></div>
	);
}
