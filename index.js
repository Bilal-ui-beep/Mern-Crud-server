const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const VehiclesSchema = require('./models/Vehicles');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://bilal-ui-beep:Action-up1@cluster0.vlqug.mongodb.net/vehicles?retryWrites=true&w=majority', {
	useNewUrlParser: true,
});

app.post('/insert', async (req, res) => {
	const carName = req.body.carName;
	const carPrice = req.body.carPrice;
	const vehicle = new VehiclesSchema({ carName: carName, carPrice: carPrice });

	try {
		await vehicle.save();
		res.send('data inserted');
	} catch (error) {
		console.log(error);
	}
});

app.put('/updateName', async (req, res) => {
	const newCarName = req.body.newCarName;
	const id = req.body.id;

	try {
		await VehiclesSchema.findById(id, (error, updatedName) => {
			updatedName.carName = newCarName;
			updatedName.save();
			res.send('Name Updated');
		});
	} catch (error) {
		console.log(error);
	}
});

app.put('/updatePrice', async (req, res) => {
	const newCarPrice = req.body.newCarPrice;
	const id = req.body.id;

	try {
		await VehiclesSchema.findById(id, (error, updatedPrice) => {
			updatedPrice.carPrice = newCarPrice;
			updatedPrice.save();
			res.send('Price Updated');
		});
	} catch (error) {
		console.log(error);
	}
});

app.get('/read', async (req, res) => {
	VehiclesSchema.find({}, (error, result) => {
		if (error) {
			res.send(error);
		}
		res.send(result);
	});
});

app.delete('/delete/:id', async (req, res) => {
	const id = req.params.id;

	await VehiclesSchema.findByIdAndRemove(id).exec();
	res.send('deleted');
});

app.listen(3001, () => {
	console.log('server running  ');
});
