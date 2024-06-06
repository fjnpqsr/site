import React, { useEffect, useRef } from 'react';

export default function Map() {
	const mapRef = useRef<any>(null);
	const currentPositionRef = useRef<any>(null);

	useEffect(() => {

		navigator.geolocation.getCurrentPosition((position) => {
			currentPositionRef.current = position;
		});

		if (mapRef.current !== null) return;
		setTimeout(() => {
			const language = new MapboxLanguage({
				defaultLanguage: 'ru'
			});
			const map = L.map('map').setView([46.722168, 24.656254], 10);
			const gl = L.mapboxGL({
				accessToken: 'pk.eyJ1IjoiMTUwMjY0MDQ3MTYiLCJhIjoiY2p0M291ZGlhMjh3cDQ0cXhydXR2czN4MyJ9.ynqc8cGJDTzgjqhmCp4ugQ',
				style: 'http://172.16.84.119:8090/ZTMapEngine/styles/v1/mapbox/dark-v1.json?access_token=pk.eyJ1IjoiMTUwMjY0MDQ3MTYiLCJhIjoiY2p0M291ZGlhMjh3cDQ0cXhydXR2czN4MyJ9.ynqc8cGJDTzgjqhmCp4ugQ'
			}).addTo(map);
			gl.getMapboxMap().addControl(language);
			console.log({gl});
			mapRef.current = map;
			// window.gl = gl;
			// window.map = map;
		});
	}, []);

	return (
		<div id="map" style={{ height: '100%' }}>
            Map
		</div>
	);
}
