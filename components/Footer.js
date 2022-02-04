import Link from "next/link";

import styles from "../styles/Home.module.css";

const Footer = () =>
{
	return (
		<footer>
			<Link href="https://twitter.com/_sh1tt">
				<a>sh1tt/</a>
			</Link>
			<Link href="https://handshake.org">
				<a>handshake</a>
			</Link>
			<Link href="https://vercel.com">
				<a>vercel</a>
			</Link>
		</footer>
	)

}

export default Footer;