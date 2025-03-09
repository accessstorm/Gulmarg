import React, { useEffect, useState } from 'react';
import './Contact.css'; // Import CSS for styling

const Contact = () => {
    const sections = ['contact-header-section', 'contact-details-section', 'contact-form-section'];

    // State variables for form data and submission status
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        tourSelect: '',
        message: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Please check the form and try again.');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the section is visible
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-section');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(sectionId => {
            const section = document.querySelector(`.${sectionId}`);
            if (section) {
                section.classList.remove('fade-in-section'); // Ensure sections start hidden
                observer.observe(section);
            }
        });

        return () => {
            sections.forEach(sectionId => {
                const section = document.querySelector(`.${sectionId}`);
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowSuccess(false);
        setShowError(false);

        // Client-side validation: Check required fields
        if (!formData.firstName || !formData.email || !formData.phoneNumber) {
            setErrorMessage('Please fill in all the required fields: First Name, Email, and Phone Number.');
            setShowError(true);
            return;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: '3727fcb0-26b4-4893-83c1-14a59a2ad826', // Replace with your actual access key
                    subject: 'New Contact Form Submission - Contact Page',
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    tourSelect: formData.tourSelect,
                    message: formData.message
                }),
            });

            const data = await response.json();

            if (data.success) {
                setShowSuccess(true);
                setFormData({ // Reset form on success
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    tourSelect: '',
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
        <div className="contact-us-page">
            {/* Header Section with Video Background - ADDED VIDEO */}
            <header className="contact-header-section">
                <video autoPlay loop muted playsInline className="hero-video">
                    <source src={`${process.env.PUBLIC_URL}/videos/LP2.mp4`} type="video/mp4" /> {/* ADDED VIDEO SOURCE - LP2.mp4 */}
                    Your browser does not support the video tag.
                </video>
                <div className="header-overlay">
                    <div className="container">
                        <h1>Contact Us</h1>
                        <p className="sub-heading">Get in touch</p>
                        <p className="availability-text">We are at your disposal 7 days a week!</p>
                    </div>
                </div>
            </header>

            {/* Contact Details Section as Cards */}
            <section className="contact-details-section">
                <div className="container">
                    <div className="contact-card office-card">
                        <h3>Mumbai Office</h3>
                        <p>Unit No. 5, 3A Ganjawala Apt, Ganjawala lane, near Bharat petrol Pump, Borivali (West) Mumbai – 400092</p>
                    </div>
                    <div className="contact-card office-card">
                        <h3>Mumbai Office</h3>
                        <p>Mumbai Office : 9, 1st Floor, Parshuram Bldg. Ram Maruti Road, Near Shivaji Park Police station, Dadar West Mumbai - 400028.</p>
                        <p>Tel: 9923xxxxxx / 9923xxxxxx</p>
                    </div>

                    <div className="contact-card phone-card">
                        <h3>Phone Number</h3>
                        <ul>
                            <li><a href="tel:9665336474">9665336474</a></li>
                            <li><a href="tel:9923xxxxxx">9923xxxxxx</a></li>
                            <li><a href="tel:9819xxxxxx">9819xxxxxx</a></li>
                        </ul>
                    </div>

                    <div className="contact-card email-card">
                        <h3>Email us</h3>
                        <p><a href="mailto:jayavratasengupta9881@gmail.com">jayavratasengupta9881@gmail.com</a></p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-form-section">
                <div className="container">
                    <h3>Leave A Reply</h3>
                    <form className="contact-form" onSubmit={handleSubmit}> {/* Added onSubmit handler */}
                        <div className="form-row">
                            <div className="form-group half-width">
                                <label htmlFor="firstName">First Name *</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    required
                                    value={formData.firstName} // Controlled input
                                    onChange={handleChange}    // Handle changes
                                />
                            </div>
                            <div className="form-group half-width">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}  // Controlled input
                                    onChange={handleChange}     // Handle changes
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}     // Controlled input
                                onChange={handleChange}    // Handle changes
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number *</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                required
                                value={formData.phoneNumber} // Controlled input
                                onChange={handleChange}    // Handle changes
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tourSelect">Select Your Tour</label>
                            <select
                                id="tourSelect"
                                name="tourSelect"
                                value={formData.tourSelect} // Controlled input
                                onChange={handleChange}    // Handle changes
                            >
                                <option value="">Select</option>
                                <option value="domestic">Domestic Tour</option>
                                <option value="international">International Tour</option>
                                <option value="special">Special Tour</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message / Comments</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}   // Controlled input
                                onChange={handleChange}      // Handle changes
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button">Submit</button>

                        {showSuccess && (
                            <div className="success-message"> {/* Assuming you have success-message class in Contact.css or define it */}
                                Thank you for your message! We will get back to you soon.
                            </div>
                        )}

                        {showError && (
                            <div className="error-message"> {/* Assuming you have error-message class in Contact.css or define it */}
                                {errorMessage}
                            </div>
                        )}

                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;