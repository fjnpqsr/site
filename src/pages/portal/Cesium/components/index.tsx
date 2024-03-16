window.CESIUM_BASE_URL = '/cesium';
import React, {useEffect, useRef} from 'react';
import { Cartesian3, Ion, Terrain, Viewer, SceneMode , OpenStreetMapImageryProvider  } from 'cesium';

import {CesiumToken} from '@/constant/token';

const CesiumMap  = () => {
	const containerRef = useRef<any>();
	const viewerRef = useRef<any>(null);

	// async function addBuildings (viewer:any) {
	// 	const buildingTileset = await createOsmBuildingsAsync();
	// 	viewer.scene.primitives.add(buildingTileset);   
	// }

	function initCesium(geoLocation: any) {
		Ion.defaultAccessToken = CesiumToken;
		
		const viewer  = new Viewer(containerRef.current, {
			terrain: Terrain.fromWorldTerrain(),
			// sceneMode: SceneMode.SCENE2D, // 配置场景 3D/2.5D/2D, 默认3D
			requestRenderMode: true,
			useBrowserRecommendedResolution: true,
			// 配置按钮显示
			animation: false,
			baseLayerPicker: false,
			fullscreenButton: false, 
			geocoder: false,
			homeButton: false,
			infoBox: false,
			sceneModePicker: false,
			selectionIndicator: false,
			timeline: false,
			navigationHelpButton: false,
			shouldAnimate: false,
		});
		const osm = new OpenStreetMapImageryProvider({
			url : 'https://a.tile.openstreetmap.org/'
		});
		viewer.scene.imageryLayers.removeAll();
		viewer.scene.imageryLayers.addImageryProvider(osm);
		viewer.camera.setView({
			destination: Cartesian3.fromDegrees(geoLocation.longitude , geoLocation.latitude, 3000),
		});
		// Add Cesium OSM Buildings, a global 3D buildings layer.
		// addBuildings(viewer);
		// window.viewer = viewer;
		if (!viewerRef.current) {
			viewerRef.current = viewerRef;
		}
	}

	function getGeoLocation () {
		navigator.geolocation.getCurrentPosition((res) => {
			initCesium(res.coords);
		});
	}

	useEffect(() => {
		if (!viewerRef.current) {
			getGeoLocation();
		}
	}, []);

	return (
		<div  style={{height: '100%', width: '100%'}} ref={containerRef}></div>
	);
};

export default CesiumMap;