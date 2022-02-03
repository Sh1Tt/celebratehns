import { useState, useEffect } from "react";

import styles from "../styles/Nav.module.css";

const Nav = ( { logo, menuTree } ) => 
{
	const [ scrollTop, setScrollTop ] = useState( 0 );

	function onScrollHandler()
	{
		setScrolltop( Math.round( window.scrollY ) );

	}

	useEffect( () =>
	{
		if ( typeof window !== 'undefined' )
		{
			window.addEventListener( "scroll", onScrollHandler, false )

			return () =>
			{
				window.removeEventListener( "scroll", onScrollHandler, false )
			
			}

		}

	}, [] );

	return (
		<>
			<div className={styles.container}>
				<div id="logo-wrapper"
					className={styles.logoWrapper}
				>
					{logo}
				</div>
				<div id="menu-wrapper"
					className={styles.menuWrapper}
				>
					{menuTree}
				</div>
			</div>
		</>
	);
}

export default Nav;