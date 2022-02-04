import Image from "next/image";

import { useState, useEffect, useContext } from "react";

import { NimbleEmojiIndex, Emoji } from "emoji-mart";

import UserContext from "../context/User";

import { resolver_v1, valid, removeTrailingSlash, hasEmoji, toAscii, toEmoji } from "../../utils/Handshakename";

import data from "emoji-mart/data/all.json";

import styles from "../../styles/Resolver.module.css";

const Form = () =>
{
	const initialState = "";
	
	const { storeEmoji, getStoreEmoji } = useContext( UserContext );

	const [ emojipicker, setEmojipicker ] = useState( initialState );
	
	const [ sld, setSld ] = useState( initialState );

	const [ receiver, setReceiver ] = useState( initialState );

	const [ message, setMessage ] = useState( initialState );

	const errorHandler = () =>
	{
		setMessage( "" );
		
		setTimeout( () =>
		{
			setMessage( initialState );
			
		}, 9_000 );
	
	}

	const selectEmojiHandler = emoji =>
	{
		const input = document.getElementById( "sld" );

		input.value += String.fromCodePoint( parseInt( data.emojis[ emoji ].unified , 16 ) );

		setSld( input.value );

		storeEmoji( emoji );

		input.focus();

	}

	const submitHandler = e =>
	{
		e.preventDefault();

		if ( !sld || sld == "" || !valid( sld ) )
		{
			errorHandler();

		}
		else
		{
			try
			{
				fetch( `/api/${sld}`,
				{
					method: "POST",
					headers:
					{
				    	'Content-Type': 'application/json',
				  	},
				  	body: JSON.stringify( { domain: sld, user: receiver } ),
				} )
				.then( res =>
				{
					if ( res.status !== 201 )
					{
						setMessage( <div id="msg"><h2>{sld}.a☕ is taken! :(</h2></div> );

						setReceiver( "" );

						setSld( "" );
						
					}

					setTimeout( () =>
					{
						setMessage( "" );

					}, 2_000 );

					setSld( "" );

				} );

			}
			catch( err )
			{
				console.log( err );

			}	
		
		}

		setTimeout( () => 
		{ 
			resetInput();

		}, 100 );

	}

	function resetInput()
	{
		document.getElementById( "sld" ).value = ``;
		
		document.getElementById( "user" ).value = ``;

	}

	function emojiMartCleanUp()
	{
		Array.from( document.querySelectorAll( "[data-category]" ) ).forEach( btn =>
		{
			btn.classList.remove( 'emoji-mart-open' )
		} );

		setEmojipicker( "" );

	}

	function emojiMartViewHandler( category )
	{
		const categoryBtn = document.getElementById( category.id );

		if( categoryBtn.classList.contains( 'emoji-mart-open' ) )
		{
			categoryBtn.classList.remove( 'emoji-mart-open' );

			setEmojipicker( "" );
		
		}
		else
		{
			emojiMartCleanUp();

			categoryBtn.classList.add( 'emoji-mart-open' );
			
			setEmojipicker(
			  	<div className={styles.customMartWrapper}>
			  		<span className={styles.customMartCategory}>{category.name}</span>
				  	<div className={styles.customMart}>
				  		{category.emojis.map( ( emoji, key ) => (
							<Emoji
							  // native={'true'}
							  key={key}
							  emoji={emoji}
							  set={'twitter'}
							  skin={1}
							  size={20}
							  onClick={e => selectEmojiHandler( emoji )}
							/>
				 		))}
				 	</div>
				</div>
			);

		}

	}

	const customCategory = {
		recent:
		{
			id: "recent",
		},
	}

	return (
		<>
			<form id="__domainrequest" className={styles.Form} autoComplete="off">
				<input 
					className={styles.input}
					type="text" 
					id="user"
					name="user" 
					placeholder="Enter your email or wallet address." 
					onChange={e => setReceiver( removeTrailingSlash( e.target.value ) )}
					onClick={e => emojiMartCleanUp()}
				/>
				<input 
					className={styles.input}
					type="text" 
					id="sld"
					name="sld" 
					placeholder="Enter a sld (e.g. 🎁yourname )" 
					onChange={e => setSld( removeTrailingSlash( e.target.value ) )}
					onClick={e => emojiMartCleanUp()}
				/>
				<div className={styles.emojiWrapper}>
					<span className={styles.emoji} id="__emojis">
						<span 
							id={customCategory.recent.id}
							className={styles.categoryEmoji}
							data-category={customCategory.recent.id}
						>
							<Emoji
								// native={'true'}
							    emoji={data.categories[4].emojis[153]}
								set={'twitter'}
								skin={1}
								size={20}
								onClick={e =>
								{
									emojiMartCleanUp();
									setEmojipicker(
										<div className={styles.customMartWrapper}>
									  		<span className={styles.customMartCategory}>Recent</span>
										  	<div className={styles.customMart}>
										  		{getStoreEmoji().map( ( emoji, key ) =>
									  			{
									  				return (
									  					<Emoji
									  						// native={'true'}
									  						key={key}
									  						emoji={emoji}
									  						set={'twitter'}
									  						skin={1}
									  						size={20}
									  						onClick={e => selectEmojiHandler( emoji )}
									  					/>
									  				);

									  			} )}
										 	</div>
										</div>
									);
								}}
								className={styles.category}
							/>
						</span>
						{data.categories.map( ( category, key ) => (
							<span 
								key={key}
								id={category.id}
								className={styles.categoryEmoji}
								data-category={category.id}
							>
								<Emoji
									// native={'true'}
									key={key}
								    emoji={category.emojis[0]}
									set={'twitter'}
									skin={1}
									size={20}
									onClick={e => emojiMartViewHandler( category )}
									className={styles.category}
								/>
							</span>
						) )}
						{emojipicker}	
					</span>
				</div>
				<div className={styles.buttonWrapper}>
					<button 
						id="submit"
						className={styles.submit} 
						onClick={e => submitHandler( e )}
					>
						<code id="submit-icon">🤝</code>
					</button>
				</div>
			</form>
			{message}
		</>
	);

}

export default Form;