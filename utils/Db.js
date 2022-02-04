import mongoose from "mongoose";

const cluster = {};

async function Dbconnect()
{
	if ( cluster.isConnected ) return;

	const db = await mongoose.connect( process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} )

	cluster.isConnected = db.connections[0].readyState

}

export default Dbconnect;