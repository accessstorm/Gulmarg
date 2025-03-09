import React, { useState } from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        destination: '',
        message: ''
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Please check the form and try again.');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowSuccess(false);
        setShowError(false);

        // Client-side validation: Check if required fields are filled
        if (!formData.name || !formData.email || !formData.phone || !formData.city || !formData.destination || !formData.message) {
            setErrorMessage('Please fill in all the required fields');
            setShowError(true);
            return; // Prevent form submission
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: '3727fcb0-26b4-4893-83c1-14a59a2ad826', // Replace with your actual access key
                    subject: 'New Quick Inquiry Form Submission',
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    city: formData.city,
                    destination: formData.destination,
                    message: formData.message
                }),
            });

            const data = await response.json();

            if (data.success) {
                setShowSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    city: '',
                    destination: '',
                    message: ''
                });
            } else {
                setErrorMessage('There was an error submitting the form. Please try again.');
                setShowError(true);
            }
        } catch (error) {
            setErrorMessage('There was an error submitting the form. Please try again.');
            setShowError(true);
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-column">
                    <div className="footer-logo">
                        <img src={`${process.env.PUBLIC_URL}/logo/GulmargGold.png`} alt="Company Logo Footer" />
                    </div>
                    <p>Your trusted partner for tropical and adventure travel experiences. Explore the world with us!</p>
                </div>

                <div className="footer-column office">
                    <h3>Our Office</h3>
                    <p>Visit us at our main office for travel planning and consultations.</p>
                    <p>123 Office Building, Tropical City, Country</p>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    </div>
                </div>

                <div className="footer-column contact-info">
                    <h3>Contact Info</h3>
                    <p><FaMapMarkerAlt /> 456 Contact Ave, Mumbai City</p>
                    <p><FaPhone /> Phone: +91 96653 36474</p>
                    <p><FaEnvelope /> Email: jayavratasengupta9881@gmail.com</p>
                    <p><FaEnvelope /> Support: jayavratasengupta9881@gmail.com</p>
                </div>

                <div className="footer-column inquiry">
                    <h3>Get Quick Inquiry</h3>
                    <div className="table-form">
                        <form onSubmit={handleSubmit}>
                            <table className="inquiry-table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="tel" name="phone" placeholder="Your Number" value={formData.phone} onChange={handleChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button type="submit" className="send-button">Send</button>
                                        </td>
                                    </tr>
                                    {showSuccess && (
                                        <tr>
                                            <td colSpan="100%">
                                                <div className="success-message">
                                                    Thank you for your message! We will get back to you soon.
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {showError && (
                                        <tr>
                                            <td colSpan="100%">
                                                <div className="error-message">
                                                    {errorMessage}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="copyright">
                © {new Date().getFullYear()} Tropical Adventure Travel. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;