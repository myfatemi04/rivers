import { useState, useEffect, useRef, useMemo } from "react";

let _lines = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur turpis vitae mi dignissim maximus in id tortor. In eget felis lectus. Proin vitae vulputate turpis, vel mattis felis. In non leo bibendum, tempor sapien quis, malesuada metus. Sed vel nibh massa. Suspendisse tristique, est accumsan accumsan porttitor, massa sem dictum ipsum, vel dictum purus sapien in urna. Praesent in justo in leo tincidunt bibendum. Nullam ut sollicitudin libero. Ut mollis orci lacus. Curabitur leo neque, molestie a augue at, dictum tincidunt turpis. Praesent risus sem, convallis quis erat quis, ultrices malesuada magna. Suspendisse malesuada massa sed vulputate gravida. Donec viverra risus et condimentum efficitur.
Nullam placerat, felis ut auctor viverra, elit justo varius enim, a sagittis sem mauris ac ex. Maecenas congue, nulla et interdum egestas, tortor lectus malesuada justo, at tristique erat ex tristique ligula. Curabitur euismod feugiat dignissim. Praesent convallis neque ac magna efficitur, nec ultricies justo semper. Donec mi diam, maximus vel mauris eget, elementum congue lacus. Sed blandit nisi nulla, non consequat tortor aliquet eget. Donec et dapibus nisi. Aliquam a tincidunt dolor. Morbi vulputate sapien sit amet faucibus consectetur. Aenean ac libero sem. Nulla consequat tellus vel consectetur maximus. Praesent at molestie libero, ut congue sapien. Donec consectetur sed nisl ac laoreet.
Donec lacinia finibus suscipit. Donec lacus erat, viverra vel lacinia quis, pulvinar ut neque. Pellentesque sed tellus ultrices, congue nisl vehicula, molestie urna. In id orci a augue placerat venenatis vel at purus. Etiam porta purus sed est porttitor venenatis. Aliquam non tellus eu libero vulputate bibendum eget ut nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
Nulla ac volutpat mauris, quis maximus diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam rhoncus pharetra imperdiet. Ut scelerisque sem turpis, nec convallis nibh vestibulum vel. Aenean a erat nulla. Mauris quam tellus, dapibus eget scelerisque sollicitudin, mollis quis mauris. Fusce quis turpis ullamcorper lacus placerat blandit. Proin consectetur quis leo quis varius.
Mauris non libero efficitur, mattis dui ac, mattis odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam eu consectetur sem, sed vestibulum orci. Pellentesque tempus sapien ut nulla luctus, id maximus enim lobortis. Suspendisse sodales urna purus, et faucibus felis cursus quis. Nunc vulputate nisi sed felis vulputate varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et felis et velit ornare placerat at sed enim. Donec luctus feugiat mi, auctor pretium nunc varius quis. Nulla neque metus, faucibus dapibus mattis in, lacinia fermentum odio. Nunc tempus dapibus neque et lobortis. Morbi eget posuere arcu, suscipit molestie nisi. Ut a interdum turpis, vel dapibus est.
`.trim().split('\n');

// _lines = ['a', 'b', 'c', 'd']

const heightBlockCount = 10;

const LINES = [];

const depths = [];

// Get browser height
const height = window.innerHeight * 1.1;

const ys = [];
const xs = [];

const baseDepths = [[0.5, 0.9], [0.8, 1.3]];

for (let heightBlockI = 0; heightBlockI < heightBlockCount; heightBlockI++) {
	const baseHeight = ((heightBlockI) / (heightBlockCount - 1)) * height;
	for (let baseDepthI = 0; baseDepthI < baseDepths[0].length; baseDepthI++) {
		const line = _lines[Math.floor(Math.random() * _lines.length)];
		LINES.push(line);
		depths.push(baseDepths[heightBlockI % baseDepths.length][baseDepthI] + Math.random() * 0.05);
		ys.push(baseHeight + (Math.random() * 0.05) * height);
		xs.push(Math.random() * 1000);
	}
}

function getBaseSize(text) {
	// Gets size of text at 1px font size
	const span = document.createElement('span');
	span.style.fontSize = "10px";
	span.style.position = "absolute";
	span.style.whiteSpace = "nowrap";
	span.innerText = text;
	document.body.appendChild(span);
	const size = span.getBoundingClientRect().width;
	document.body.removeChild(span);
	return size;
}

function Line({ line, depth, y, x }) {
	const [offset, setOffset] = useState(x);
	const speed = 0.5 / depth;
	useEffect(() => {
		const id = requestAnimationFrame(
			() => setOffset(offset => offset + speed)
		)
		return () => cancelAnimationFrame(id);
	}, [offset, speed]);

	const baseWidth = useMemo(() => getBaseSize(line), [line]);
	const fontSize = 20 / depth;

	const ref = useRef();

	const opacity = 1 - depth * depth;

	return <>
		<span style={{
			position: 'absolute',
			overflow: "visible",
			whiteSpace: "nowrap",
			left: offset + "px",
			fontSize: fontSize + "px",
			top: y,
			opacity,
			color: 'transparent',
			display: "inline-block",
			textShadow: `0 0 ${Math.max(0, (depth - 0.5)) * 2}px #fff`
		}} ref={ref}>
			{line}
		</span>{ref.current &&
			<span style={{
				position: 'absolute',
				overflow: "visible",
				whiteSpace: "nowrap",
				left: (offset - baseWidth * (fontSize / 10)) + "px",
				fontSize: fontSize + "px",
				top: y,
				opacity,
				color: 'transparent',
				display: "inline-block",
				textShadow: `0 0 ${Math.max(0, (depth - 0.5)) * 2}px #fff`
			}}>
				{line}
			</span>}
	</>
}

export default function River() {
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		requestAnimationFrame(
			() => setCounter(counter + 0.25)
		)
	}, [counter]);

	return <div style={{ position: "absolute", inset: 0 }}>
		{LINES.map((line, index) => <Line key={index} line={line} depth={depths[index]} y={ys[index] + 4 * Math.sin(counter / 75 * Math.PI)} x={xs[index]} />)}
	</div>
}
