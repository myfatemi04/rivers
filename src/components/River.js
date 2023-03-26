import { useEffect, useRef, useState } from "react";

let _lines = `
	"When I was struggling with depression and anxiety, I decided to seek professional help. I was hesitant at first, but I knew I needed to do something to improve my mental health. After a few weeks of therapy, I started to notice some positive changes. I felt more in control of my emotions, and my anxiety attacks were becoming less frequent. With the help of my therapist, I learned some valuable coping mechanisms and was able to regain a sense of normalcy in my life.",
	"Some days are better than others when it comes to my mental health. Sometimes, I wake up feeling motivated and energized, while other times, I struggle to even get out of bed. It's a constant battle, but I've learned to accept that it's okay to have bad days. I try to focus on the things that bring me joy and take care of myself as best as I can. It's not always easy, but I'm learning to be kinder to myself and take things one day at a time.",
	"There was a time when I felt completely overwhelmed by my mental health issues. I was consumed by negative thoughts and couldn't seem to shake them off. I stopped going out and stopped seeing my friends and family. I felt isolated and alone. It was a scary time, and I knew I needed to do something to get better. With the help of a loved one, I sought professional help and started taking medication. It was a slow process, but eventually, I started to see some improvements. Looking back, I wish I had reached out for help sooner, but I'm grateful that I finally did.",
	"I'll never forget the day when I hit rock bottom. I had been struggling with depression and anxiety for years, but I always managed to keep my head above water. However, on that day, everything fell apart.I couldn't get out of bed, my mind was racing with negative thoughts, and I felt like a complete failure. I didn't have the energy to eat or shower, and the idea of facing the world seemed unbearable.Despite feeling isolated and alone, I knew I needed help. My therapist had given me a list of emergency contacts, and I forced myself to call a crisis hotline. It was scary to reach out to strangers, but their empathy and support made a world of difference.\n\nWithin a few days, I had an appointment with a psychiatrist who prescribed medication to help manage my symptoms. It wasn't a magic cure, and I had to experiment with different doses and types of medication before finding what worked for me.\n\nIn addition to medication, I also started attending therapy sessions on a regular basis. It was a safe space to talk about my emotions and address the root causes of my mental health struggles. My therapist was always compassionate and non-judgmental, and it felt good to have someone in my corner.\n\nOver time, I slowly started to see the light at the end of the tunnel. I had good days and bad days, but overall, my mental health was improving. I learned coping strategies to manage my anxiety and depression, and I practiced self-care every day.\n\nToday, I'm not completely free of mental health struggles, but I'm in a much better place than I was before. I'm grateful for the support I received and the lessons I learned along the way. It's important to remember that mental health is a journey, and there's no shame in asking for help along the way.",
	"So, I have OCD, and it's been tough for me to deal with. I always thought I had to do things a certain way or else something bad would happen. But then, I started seeing a therapist, and they taught me some cool tricks to manage it. Like, they told me to challenge the thoughts I was having, and to try not to give into the compulsions. And it worked! I still have some bad days, but overall, I feel like I'm in control of my thoughts and actions now.",
	"My anxiety can be a real drag sometimes. Like, I'll be feeling great one minute, and then all of a sudden, I'm freaking out about something that probably won't even happen. It's hard to know how to deal with it, you know? Sometimes I try to take deep breaths, or distract myself with something else. But other times, I just have to ride it out and wait for it to pass. It's not ideal, but it's just something I've learned to live with.",
	"Ugh, my ADHD is the worst. It's like, I can't focus on anything for more than a few minutes at a time. And then, when I try to do something about it, I get frustrated and give up. It's a vicious cycle. And it's not just at school or whatever - it affects my friendships too. Like, I'll forget to text someone back, or I'll interrupt them when they're talking. I feel like I'm constantly letting people down, and it sucks. Sometimes I wonder if there's anything that can really help me."
	"i was really struggling with depression for a while. it felt like nothing would make me happy anymore. but i started seeing a therapist and they helped me learn how to take care of myself better. like, they taught me to get up and get dressed even if i didn't want to, and to go outside and get some fresh air. and over time, those little things added up and helped me feel more like myself again.",
	"sometimes i feel like i have this constant brain fog because of my adhd. it's like my thoughts are always bouncing around and i can't focus on any one thing for very long. it's frustrating, but it's just part of who i am, you know? i've learned to make lists and use reminders on my phone to help me stay on track, and that helps. but some days are just harder than others.",
	"anxiety is the worst. sometimes it feels like i can't breathe or like my heart is racing a million miles an hour. i try to tell myself that it's just my brain playing tricks on me, but it's hard to convince myself of that sometimes. and it's not just the physical symptoms - it's the constant worrying too. i worry about everything, from what people think of me to whether i'll be able to pay my bills. it's exhausting, and i just wish i could turn it off sometimes."
	"I'll never forget the day when I hit rock bottom. I had been struggling with depression and anxiety for years, but I always managed to keep my head above water. However, on that day, everything fell apart.I couldn't get out of bed, my mind was racing with negative thoughts, and I felt like a complete failure. I didn't have the energy to eat or shower, and the idea of facing the world seemed unbearable.Despite feeling isolated and alone, I knew I needed help. My therapist had given me a list of emergency contacts, and I forced myself to call a crisis hotline. It was scary to reach out to strangers, but their empathy and support made a world of difference.\n\nWithin a few days, I had an appointment with a psychiatrist who prescribed medication to help manage my symptoms. It wasn't a magic cure, and I had to experiment with different doses and types of medication before finding what worked for me.\n\nIn addition to medication, I also started attending therapy sessions on a regular basis. It was a safe space to talk about my emotions and address the root causes of my mental health struggles. My therapist was always compassionate and non-judgmental, and it felt good to have someone in my corner.\n\nOver time, I slowly started to see the light at the end of the tunnel. I had good days and bad days, but overall, my mental health was improving. I learned coping strategies to manage my anxiety and depression, and I practiced self-care every day.\n\nToday, I'm not completely free of mental health struggles, but I'm in a much better place than I was before. I'm grateful for the support I received and the lessons I learned along the way. It's important to remember that mental health is a journey, and there's no shame in asking for help along the way.",
`.trim().split('\n');

// _lines = ['a', 'b', 'c', 'd']

const heightBlockCount = 10;

const LINES = [];

const depths = [];

// Get browser height
const height = window.innerHeight * 1.1;

const ys = [];
const xs = [];
const speedMultipliers = [];

const baseDepths = [[0.5, 0.9], [0.8, 1.3]];

for (let heightBlockI = 0; heightBlockI < heightBlockCount; heightBlockI++) {
	const baseHeight = ((heightBlockI) / (heightBlockCount - 1)) * height;
	for (let baseDepthI = 0; baseDepthI < baseDepths[0].length; baseDepthI++) {
		const line = _lines[Math.floor(Math.random() * _lines.length)];
		LINES.push(line);
		depths.push(baseDepths[heightBlockI % baseDepths.length][baseDepthI] + Math.random() * 0.05);
		ys.push(baseHeight + (Math.random() * 0.05) * height);
		xs.push(Math.random() * 1000);
		speedMultipliers.push(1 + Math.random() * 0.5);
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

function Line({ line, depth, y, x, speedMultiplier, maxOffset = null }) {
	const [offset, setOffset] = useState(x);
	const speed = -0.5 / depth * speedMultiplier;
	useEffect(() => {
		const id = requestAnimationFrame(
			() => {
				if (maxOffset != null) {
					// Decelerate
					let nominalSpeed = speed;
					if (maxOffset !== null && maxOffset - offset < 100) {
						nominalSpeed = Math.max(speed * 0.01, speed * (maxOffset - offset) / 75);
					}
					setOffset(offset => Math.min(maxOffset, offset + nominalSpeed));
				} else {
					setOffset(offset => offset + speed);
				}
			}
		)
		return () => cancelAnimationFrame(id);
	}, [maxOffset, offset, speed]);

	const fontSize = 20 / depth;

	const ref = useRef();

	const opacity = 1 - depth * depth;

	const baseWidth = ref.current?.clientWidth;

	const totalWidth = baseWidth * 2 + 8 / depth;

	if (offset + totalWidth < 0) {
		setOffset(window.innerWidth);
	}

	return <>
		<span style={{
			position: 'absolute',
			overflow: "visible",
			whiteSpace: "nowrap",
			left: (offset) + "px",
			fontSize: fontSize + "px",
			top: y,
			opacity,
			color: 'transparent',
			display: "inline-block",
			textShadow: `0 0 ${Math.max(0, (depth - 0.5)) * 2}px #fff`,
			pointerEvents: 'none'
		}} ref={ref}>
			{line}
		</span>{ref.current && (maxOffset === null) &&
			<span style={{
				position: 'absolute',
				overflow: "visible",
				whiteSpace: "nowrap",
				left: ((offset + baseWidth + 8 / depth)) + "px",
				fontSize: fontSize + "px",
				top: y,
				opacity,
				color: 'transparent',
				display: "inline-block",
				textShadow: `0 0 ${Math.max(0, (depth - 0.5)) * 2}px #fff`,
				pointerEvents: 'none'
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

	// const [injected, setInjected] = useState(false);

	return <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
		{/* <button onClick={() => setInjected(true)} style={{ zIndex: -10, cursor: "pointer" }}>
			Inject
		</button> */}

		{LINES.map((line, index) => <Line key={index} line={line} depth={depths[index]} y={ys[index] + 8 * Math.sin(counter / 75 * Math.PI + xs[index])} x={xs[index]} speedMultiplier={speedMultipliers[index]} />)}

		{/* {injected &&
			<Line line="Hello" depth={0.5} y={100} x={-10 * getBaseSize("Hello")} maxOffset={100} />} */}
	</div>
}
