const express = require('express');
const jsonServer = require('json-server');

const db = {
	garage: [
		{
			name: 'Tesla',
			color: '#e6e6fa',
			id: 1,
		},
		{
			name: 'BMW',
			color: '#fede00',
			id: 2,
		},
		{
			name: 'Mercedes',
			color: '#6c779f',
			id: 3,
		},
		{
			name: 'Ford',
			color: '#ef3c40',
			id: 4,
		},
		{
			name: 'Renault Nissan',
			color: '#AAB3DB',
			id: 5,
		},
		{
			name: 'Jeep Beep',
			color: '#2DA6FA',
			id: 6,
		},
		{
			name: 'Hyundai Karben',
			color: '#953424',
			id: 7,
		},
		{
			name: 'Lancia Nag',
			color: '#BC2F17',
			id: 8,
		},
		{
			name: 'УАЗ Promenad',
			color: '#1D6ED4',
			id: 9,
		},
		{
			name: 'Hummer H3',
			color: '#95B3FD',
			id: 10,
		},
		{
			name: 'Honda Infiniti',
			color: '#C41B25',
			id: 11,
		},
		{
			name: 'Nissan Almera',
			color: '#58067F',
			id: 12,
		},
		{
			name: 'Mini Kuper',
			color: '#B9AD54',
			id: 13,
		},
		{
			name: 'Aston Martin',
			color: '#13DCD9',
			id: 14,
		},
	],
	winners: [
		{
			id: 1,
			wins: 1,
			time: 10,
		},
		{
			id: 4,
			wins: 1,
			time: 10,
		},
		{
			id: 3,
			wins: 1,
			time: 2.7,
		},
		{
			id: 2,
			wins: 1,
			time: 3.38,
		},
		{
			id: 5,
			wins: 1,
			time: 6.67,
		},
	],
};

const server = jsonServer.create();
const router = jsonServer.router(db);

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);
server.use(express.json());

const PORT = process.env.PORT || 3000;

const state = { velocity: {}, blocked: {} };

server.patch('/engine', (req, res) => {
	const { id, status } = req.query;

	if (!id || !status || !/^(started)|(stopped)|(drive)$/.test(status)) {
		return res.status(400).json({ error: 'Wrong parameters' });
	}

	if (!db.garage.find((car) => car.id === +id)) {
		return res.status(404).json({ error: 'Car not found' });
	}

	const distance = 500000;
	if (status === 'drive') {
		const velocity = state.velocity[id];

		if (!velocity)
			return res
				.status(404)
				.json({ error: 'Engine parameters not found' });
		if (state.blocked[id])
			return res.status(429).json({ error: 'Drive already in progress' });

		state.blocked[id] = true;

		const x = Math.round(distance / velocity);

		if (new Date().getMilliseconds() % 3 === 0) {
			setTimeout(() => {
				delete state.velocity[id];
				delete state.blocked[id];
				res.header('Content-Type', 'application/json')
					.status(500)
					.json({ error: 'Engine broken down' });
			}, (Math.random() * x) ^ 0);
		} else {
			setTimeout(() => {
				delete state.velocity[id];
				delete state.blocked[id];
				res.header('Content-Type', 'application/json')
					.status(200)
					.json({ success: true });
			}, x);
		}
	} else {
		const x = req.query.speed
			? +req.query.speed
			: (Math.random() * 2000) ^ 0;

		const velocity =
			status === 'started' ? Math.max(50, (Math.random() * 200) ^ 0) : 0;

		if (velocity) {
			state.velocity[id] = velocity;
		} else {
			delete state.velocity[id];
			delete state.blocked[id];
		}

		setTimeout(
			() =>
				res
					.header('Content-Type', 'application/json')
					.status(200)
					.json({ velocity, distance }),
			x,
		);
	}
});

server.use(router);
server.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
