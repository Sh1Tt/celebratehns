import Dbconnect from "../../utils/Db";

import Sldrequest from "../../models/Sldrequest";

Dbconnect();

const Sld = async ( req, res ) =>
{

  const {
    query: { sld },
    method
  } = req;

  switch ( method )
  {
    case "GET":
      try
      {
        const available = await Sldrequest.find( { domain: sld } );

        res.status( 200 ).json( { available: ( available ? true : false ) } );

      }
      catch ( err )
      {
        res.status( 400 ).json( { error: `There was an error verifying the sld. ${ err }` } );
      
      }
      
      break;
    
    case "POST":
      try
      {
        const newSld = await Sldrequest.create( req.body );

        res.status( 201 ).json( { data: newSld } );

      }
      catch ( err )
      {
        res.status( 400 ).json( { err } );

      }
      
      break;
    
    default:
      res.status( 404 ).json( { error: "Error! Not an accepted method!" } )
      
      break;
  
  }

}

export default Sld;