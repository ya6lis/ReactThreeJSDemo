import { Link } from 'react-router-dom';

import "./header.css";

const Header = () => {
    return(
        <header className="header container">
            <div className="header__logo">
                <Link className="header__link" to="/">React + ThreeJS Demo</Link>
            </div>
            <div className="header__links">
                <Link className="header__link" to="/">Main</Link>
                <Link className="header__link" to="/view">3D View</Link>
                <Link className="header__link" to="/animation">3D Animation</Link>
                <Link className="header__link" to="/products">Products</Link>
            </div>
            {/* <Button>Book Now</Button> */}
        </header>
    );
}

export default Header;