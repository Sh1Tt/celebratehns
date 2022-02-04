import punycode from "punycode";

const resolver_v1 = n =>
{
	const url = `${process.env.PROTOCOL}://${n}.${process.env.DOMAIN}/`;

	location.href = url;

	return;

}

const valid = n => !/[`~!@#$%^&*()+={}|[\]\\;:\'\"<>,\/?\s]/.test( n );

const removeTrailingSlash = n => ( n.endsWith( `/` ) || n.endsWith( ` ` ) ? n.slice( 0, -1 ) : n );

const hasEmoji = n => /\p{Extended_Pictographic}/u.test( n );

const toAscii = n => punycode.toASCII( n );

const toEmoji = n => punycode.toUnicode( n );

const validQuery = n => n.match( /[\s]/g );

export { 
	resolver_v1,
	valid, 
	removeTrailingSlash,
	hasEmoji,
	toAscii,
	toEmoji,
	validQuery,
}