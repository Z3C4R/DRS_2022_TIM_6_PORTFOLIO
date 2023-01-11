import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	let Logo = require('../templates/crypto.png')

	return (
		<div>
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
		</div>
	);
}

export default Navbar;