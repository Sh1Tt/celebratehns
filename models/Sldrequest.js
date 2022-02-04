const mongoose = require( "mongoose" );

const SldrequestSchema = new mongoose.Schema( {
	domain:
	{
		type: String,
		required: [ true, 'Please enter a valid subdomain.' ],
		unique: true,
		trim: true,
		maxlength: [ 48, 'The subdomain can not exceed 48 characters!' ],
	},
	user:
	{
		type: String,
		required: [ true, 'Please enter a destination for the SLD.' ],
		maxlength: [ 200, 'The destination can not exceed 200 characters!' ],
	}
} );

module.exports = mongoose.models.Sldrequest || mongoose.model( 'Sldrequest', SldrequestSchema );