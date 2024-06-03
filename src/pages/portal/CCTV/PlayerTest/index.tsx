import PageContainer from '@/components/PageContainer';
import React, { useState } from 'react';
import Player from '@/components/Player';
import {Button, Divider, Space} from 'antd';

export default function PlayerTest() {
  
	const [playUrl, setPlayUrl] = useState('');
	return (
		<PageContainer>
			<Space>
				<Button
					onClick={() => {
						// setPlayUrl('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
						setPlayUrl('http://1.94.122.62:7070/stream/hls264/stream.m3u8');
						setPlayUrl('/stream/h265.m3u8');
					}}
				>
                    Stream A
				</Button>
				<Button
					onClick={() => {
						// setPlayUrl('https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8')
						
						setPlayUrl('http://172.16.81.205:8090/shizai/34030000001310000001T0T0/livestream/index.m3u8?t=1717406895698&r=ff3dd62b1214458c828d64b885c42ba7&sign=d8d7edb7fe66bc36');
						// setPlayUrl('http://1.94.122.62:7070/stream/test/livestream.m3u8');
					}}
				>
                    Stream B
				</Button>
				<Button
					onClick={() => setPlayUrl('')}
				>
                    Empty Stream 
				</Button>
			</Space>
			<Divider/>
			<Player 
				config={{source: playUrl}}
			/>
		</PageContainer>
	);
}
