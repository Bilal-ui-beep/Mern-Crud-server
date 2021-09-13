const mongoose = require('mongoose');

const VehiclesSchema = new mongoose.Schema({
	carName: {
		type: String,
		required: true,
	},
	carPrice: {
		type: Number,
		required: true,
	},
});

const Vehicle = mongoose.model('Cars', VehiclesSchema);
module.exports = Vehicle;
