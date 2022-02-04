import Nav from "./Nav";

const Layout = ( { children } ) => (
	<>
		<nav>
			<Nav />
		</nav>
		{children}
	</>
)

export default Layout;