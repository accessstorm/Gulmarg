import React, { useState, useEffect, useRef } from 'react';
import './AboutUs.css'; // Inherit styles from HomePage.css
import { FaUsers, FaRoute, FaHeart, FaStar, FaCheckCircle } from 'react-icons/fa'; // Stat icons and checkmark icon

const AboutUs = () => {
    // Inherit stats section and animation logic from HomePage
    const [statsData, setStatsData] = useState([
        { icon: <FaUsers />, value: 28000, label: 'Happy Travelers', animatedValue: 0 },
        { icon: <FaRoute />, value: 13000, label: 'Tours Completed', animatedValue: 0 },
        { icon: <FaHeart />, value: 68000, label: 'Positive Reviews', animatedValue: 0 },
        { icon: <FaStar className="star-icon" />, value: 10000, label: '5-Star Experiences', animatedValue: 0 },
    ]);

    const statsRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    const animateValue = (startValue, endValue, duration, index) => {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.floor(progress * (endValue - startValue) + startValue);

            setStatsData(prev => {
                const newStats = [...prev];
                newStats[index] = { ...newStats[index], animatedValue: currentValue };
                return newStats;
            });

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        statsData.forEach((stat, index) => {
                            animateValue(0, stat.value, 2000, index);
                        });
                        setHasAnimated(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, [hasAnimated, statsData]);


    useEffect(() => {
        // Fade-in animation for sections on About Us page, similar to homepage
        const sections = ['about-us-header', 'our-story', 'mission-values', 'stats-section', 'why-choose-us', 'our-team', 'contact-us'];
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-section');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(sectionId => {
            const section = document.querySelector(`.${sectionId}`);
            if (section) {
                section.classList.remove('fade-in-section');
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

    return (
        <div className="about-us-page-content">
            {/* About Us Header Section */}
            <header className="about-us-header carousel-container" style={{ backgroundImage: `url('https://swastiktours.com/wp-content/uploads/2024/05/mandore-hindu-temple-complex-rajasthan-india-2023-11-27-05-25-11-utc-scaled.jpg')` }}>
                <div className="overlay">
                    <h1>About Us</h1>
                    <p>Your Trusted Partner in Travel and Exploration.</p>
                </div>
            </header>

            {/* Our Story Section */}
            <section className="our-story section-padding">
                <div className="container">
                    <h2>Our Story</h2>
                    <div className="section-description">
                        <p>Welcome to Gulmarg Destination Tours and Travels! Our journey began with a simple passion: to share the beauty and wonder of travel with the world. Founded in [Year], we started as a small team of travel enthusiasts dedicated to crafting unique and memorable experiences for our clients.</p>
                        <p>Over the years, we've grown from a local agency to a recognized name in the travel industry.  Our commitment to personalized service, deep destination knowledge, and sustainable tourism practices has been the cornerstone of our success. We believe in creating travel experiences that not only showcase the world's most incredible places but also enrich the lives of our travelers and the communities they visit.</p>
                        <p>From humble beginnings, we've expanded our offerings to include a wide range of domestic and international tours, catering to diverse interests and budgets.  But even as we've grown, our core values remain the same: integrity, exceptional service, and a genuine love for travel.</p>
                    </div>
                    <div className="image-container">
                        <img src="https://media.istockphoto.com/id/1491196684/photo/business-people-celebrating-success-in-an-office.jpg?s=612x612&w=0&k=20&c=zQ5Ps5nQWi3S2futnwyOoqLMFxPzE8B04WltyPB6RyI=" alt="Our Team" />
                    </div>
                </div>
            </section>

            {/* Our Mission and Values Section */}
            <section className="mission-values section-padding">
                <div className="container">
                    <h2>Our Mission and Values</h2>
                    <div className="mission-values-grid">
                        <div className="value-card">
                            <FaCheckCircle className="value-icon" />
                            <h3>Exceptional Service</h3>
                            <p>We are committed to providing unparalleled customer service, ensuring every aspect of your journey is seamless and stress-free.</p>
                        </div>
                        <div className="value-card">
                            <FaCheckCircle className="value-icon" />
                            <h3>Authentic Experiences</h3>
                            <p>We believe in offering authentic and immersive travel experiences that go beyond the typical tourist trail, connecting you with local cultures and communities.</p>
                        </div>
                        <div className="value-card">
                            <FaCheckCircle className="value-icon" />
                            <h3>Sustainable Tourism</h3>
                            <p>We are dedicated to responsible travel practices that respect the environment, support local economies, and preserve cultural heritage for future generations.</p>
                        </div>
                        <div className="value-card">
                            <FaCheckCircle className="value-icon" />
                            <h3>Passion for Travel</h3>
                            <p>Our team is driven by a genuine passion for travel, and we bring this enthusiasm to every tour we create, ensuring you have an unforgettable adventure.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Inherited from HomePage */}
            <section className="stats-section stats-about-us" ref={statsRef}>
                <div className="container">
                    <div className="stats-row">
                        {statsData.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <span className="stat-icon">{stat.icon}</span>
                                <div className="stat-number">{stat.animatedValue.toLocaleString()}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-us section-padding">
                <div className="container">
                    <h2>Why Choose Gulmarg Destination Tours and Travels?</h2>
                    <div className="why-choose-us-grid">
                        <div className="choose-card">
                            <h3>Expertly Curated Tours</h3>
                            <p>Our tours are thoughtfully designed by travel experts to offer a perfect blend of must-see attractions and unique local experiences.</p>
                        </div>
                        <div className="choose-card">
                            <h3>Personalized Service</h3>
                            <p>We provide personalized attention to every traveler, ensuring your trip is tailored to your preferences and needs.</p>
                        </div>
                        <div className="choose-card">
                            <h3>Best Value Guaranteed</h3>
                            <p>We offer competitive pricing without compromising on quality, ensuring you get the best value for your travel investment.</p>
                        </div>
                        <div className="choose-card">
                            <h3>24/7 Support</h3>
                            <p>Our dedicated support team is available around the clock to assist you before, during, and after your trip, providing peace of mind.</p>
                        </div>
                        {/* Add these two new choose-card divs below */}
                        <div className="choose-card">
                            <h3>Local Expertise & Guidance</h3>
                            <p>Benefit from our in-depth local knowledge and experienced guides who ensure an authentic and enriching travel experience.</p>
                        </div>
                        <div className="choose-card">
                            <h3>Flexible & Tailored Travel</h3>
                            <p>We offer flexible booking options and tailor-made itineraries to perfectly match your travel style and preferences.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section (Placeholder) */}
            <section className="our-team section-padding">
                <div className="container">
                    <h2>Meet Our Team</h2>
                    <div className="team-grid">
                        {/* Team member cards would go here - Example placeholders */}
                        <div className="team-member">
                            <img src="https://media.istockphoto.com/id/1830126474/photo/portrait-of-a-business-man-sitting-in-an-office.jpg?s=612x612&w=0&k=20&c=jFJl6x5NUZOXEH230n2asejE-vDZ0YtATM0pbfJFTgk=" alt="Team Member 1" />
                            <h3>John Smith</h3>
                            <p className="team-title">CEO & Founder</p>
                            <p className="team-description">John's vision and passion for travel have driven the company's growth and success.</p>
                        </div>
                        <div className="team-member">
                            <img src="https://media.istockphoto.com/id/2042526830/photo/successful-businesswoman-using-laptop-working-in-office-business-technology-corporate-concept.jpg?s=612x612&w=0&k=20&c=-NJyxcMesUAKzzPwoHXC10ZuBHPGa1dRp1gFl2T37o8=" alt="Team Member 2" />
                            <h3>Alice Johnson</h3>
                            <p className="team-title">Head of Operations</p>
                            <p className="team-description">Alice ensures smooth and efficient tour operations, delivering exceptional experiences.</p>
                        </div>
                        <div className="team-member">
                            <img src="https://media.istockphoto.com/id/1430286027/photo/information-technology-businessman-working-on-computer-in-office-for-digital-app-software.jpg?s=612x612&w=0&k=20&c=qnzxRAHSoiRs1TmAOuvfbtCXWFUUdN7Fv_WRHzuvcuE=" alt="Team Member 3" />
                            <h3>Michael Brown</h3>
                            <p className="team-title">Senior Travel Consultant</p>
                            <p className="team-description">Michael's expertise and personalized approach help clients plan their dream vacations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="contact-us section-padding">
                <div className="container">
                    <h2>Ready to Plan Your Adventure?</h2>
                    <p className="contact-description">Get in touch with us today to start planning your next unforgettable journey. Our travel experts are here to assist you with all your travel needs.</p>
                    <div className="contact-buttons">
                        <button className="contact-button primary">Contact Us</button>
                        <button className="contact-button secondary">Explore Tours</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;