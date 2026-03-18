import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">

                    <h3>About Us</h3>
                    <p>We are committed to promoting sustainable fashion through circular practices.</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Shop</Link></li>
                        <li><Link to ="/recycling-locator">Recycling Locator</Link></li>
                        <li>About Us</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Email: info@Rot8te.com</p>
                </div>
                {/* Social Media Links*/}
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <ul className="social-links">
                        <li>
                        <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noopener noreferrer">
                        Instagram
                        </a>
                        </li>
                        <li>
                        <a href="https://www.tiktok.com/en-GB/" target="_blank" rel="noopener noreferrer">
                        TikTok
                        </a>
                        </li>
                        <li>
                        <a href="https://uk.pinterest.com/" target="_blank" rel="noopener noreferrer">
                        Pinterest
                        </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2026 Rot8te. All rights reserved.
            </div>
        </footer>

    )
}
export default Footer;