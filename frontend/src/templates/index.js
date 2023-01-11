import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./index.css";



function Index() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	let Logo = require('../templates/crypto.png')

	return (
		<header>
			<h3><img src={Logo} alt="Crypto Logo"/></h3>
			<nav ref={navRef}>
			    <a href="/">Home</a>
				<a href="/Login">Login</a>
				<a href="/Register">Register</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Index;