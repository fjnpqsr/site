
export type IOperationData = {light: number, sharpen: number}
export type IImageSize = {width: number, height: number}
export function getRenderSize(width:number, height:number, max: number) {
	const rato = width/height;
	if (rato === 1 || width === 0) {
		return {width: max, height: max};
	}
	if (rato > 1) { // width > height => use width
		return {
			width: max,
			height: Math.floor(height* max/width)
		};
	} else {
		return {
			width: Math.floor(width * max/height),
			height: max
		};
	}
}
export function changeImageLight (canvasRef: HTMLCanvasElement | null, light: any, originData: ImageData) {
	if (canvasRef) {
		const ctx = canvasRef.getContext('2d');
		if (!originData?.data) return; 
		const {data} = originData;
		for (let i = 0; i < data.length; i += 4) {
			data[i] += light;
			data[i + 1] += light;
			data[i + 2] += light;
		}
		ctx?.putImageData(originData, 0, 0);
	}
}
export function sharpenImage(canvasPReRef:any, canvasRef:any, strength: number,   canvasImageSize: any) {
	const ctx = canvasRef.getContext('2d');
	const ctxPre = canvasPReRef.getContext('2d');
	const {width, height} = canvasImageSize;
	const imageData= ctxPre?.getImageData(0,0, width, height);
	// 创建锐化的内核矩阵
	const kernel = [
		-1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1,
		-1,-1, strength+24, -1,-1,
		-1, -1, -1,-1,-1,
		-1, -1, -1,-1,-1
	];


	const data = imageData.data;
	for (let y = 1; y < height - 1; y++) {
		for (let x = 1; x < width - 1; x++) {
			// y = 1 开始， 过滤掉第一行的像素点
			const pxIndex= y * width + x;
			let weight = 0;
			// 找到像素点的rgb色值
			let r = data[pxIndex * 4] * kernel[0];
			let g = data[pxIndex * 4 + 1] * kernel[1];
			let b = data[pxIndex * 4 + 2] * kernel[2];

			for (let i = 0; i < kernel.length; i++) {
				const yy = y + Math.floor(i / 5) - 1;
				const xx = x + (i % 5) - 1;
				const index = (yy * width + xx) * 4;
				weight += kernel[i];
				r += data[index] * kernel[i];
				g += data[index + 1] * kernel[i];
				b += data[index + 2] * kernel[i];
			}

			data[pxIndex * 4] = r / weight;
			data[pxIndex * 4 + 1] = g / weight;
			data[pxIndex * 4 + 2] = b / weight;
		}
	}
	ctx.putImageData(imageData, 0, 0);
}
 

export function handleFilter (canvasPReRef:HTMLCanvasElement | null, canvasRef: HTMLCanvasElement| null, filters:IOperationData, size: IImageSize) {
	if (!canvasRef || !canvasPReRef) return; 
	const {light, sharpen} = filters;
	const ctx = canvasRef.getContext('2d');
	const ctxPre = canvasPReRef.getContext('2d');
	const {width, height} = size;
	const imageData= ctxPre?.getImageData(0,0, width, height);
	if (!ctx || !imageData) return;
	// 创建锐化的内核矩阵
	const kernel = [
		-1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1,
		-1,-1, sharpen+24, -1,-1,
		-1, -1, -1,-1,-1,
		-1, -1, -1,-1,-1
	];


	const data = imageData.data;

	if (light) {
		for (let i = 0; i < data.length; i += 4) {
			data[i] += light;
			data[i + 1] += light;
			data[i + 2] += light;
		}
	}

	if (sharpen) {
		for (let y = 1; y < height - 1; y++) {
			for (let x = 1; x < width - 1; x++) {
				// y = 1 开始， 过滤掉第一行的像素点
				const pxIndex= y * width + x;
				let weight = 0;
				// 找到像素点的rgb色值
				let r = data[pxIndex * 4] * kernel[0];
				let g = data[pxIndex * 4 + 1] * kernel[1];
				let b = data[pxIndex * 4 + 2] * kernel[2];
	
				for (let i = 0; i < kernel.length; i++) {
					const yy = y + Math.floor(i / 5) - 1;
					const xx = x + (i % 5) - 1;
					const index = (yy * width + xx) * 4;
					weight += kernel[i];
					r += data[index] * kernel[i];
					g += data[index + 1] * kernel[i];
					b += data[index + 2] * kernel[i];
				}
	
				data[pxIndex * 4] = r / weight;
				data[pxIndex * 4 + 1] = g / weight;
				data[pxIndex * 4 + 2] = b / weight;
			}
		}
	}
	ctx.putImageData(imageData, 0, 0);
}