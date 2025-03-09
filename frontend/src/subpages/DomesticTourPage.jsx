import React from 'react';
import './DomesticTourPage.css';

const DomesticTourPage = ({ destinationType, tourData }) => {
    if (!tourData) {
        return <div>Error: Tour data not found for destination: {destinationType}</div>;
    }

    return (
        <div className="domestic-tour-page-content home-page-content">
            <div className="container">
                <header className="domestic-tour-header">
                    <video autoPlay loop muted playsInline className="hero-video">
                        <source src={`${process.env.PUBLIC_URL}/videos/LP6.mp4`} type="video/mp4" /> {/* Replace 'your-video.mp4' with your video file path in public/videos */}
                        Your browser does not support the video tag.
                    </video>
                    <div className="header-content">
                        <h1>{tourData.pageTitle}</h1>
                        <p><a href="/">Home</a> / Domestic Tours / {tourData.pageTitle.replace(' Tour Package', '').replace(' Tour', '').replace(' Darshan', '')}</p>
                    </div>
                </header>

                <section className="tour-brief-section">
                    <h2>{tourData.tourName}</h2>
                    <p>{tourData.briefDescription}</p>
                    <div className="book-now-section">
                        <button className="book-now-button">+91 9768627252 - Book Now</button>
                    </div>
                </section>

                <section className="tour-links-section">
                    <div className="tour-links-grid">
                        <div className="tour-link-card">{tourData.pageTitle} Packages</div> {/* Example - adjust as needed */}
                        <div className="tour-link-card">More About {tourData.pageTitle.replace(' Package', '')}</div> {/* Example - adjust as needed */}
                        {/* Add more link cards if needed */}
                    </div>
                </section>

                <section className="tour-details-grid-section">
                    <div className="tour-details-grid">
                        <div className="detail-item">
                            <h3>Activity</h3>
                            <p>By Car / Bus</p>
                        </div>
                        <div className="detail-item">
                            <h3>Duration</h3>
                            <p>{tourData.duration}</p>
                        </div>
                        <div className="detail-item">
                            <h3>Package</h3>
                            <p>{tourData.packagePrice}</p>
                        </div>
                        <div className="detail-item">
                            <h3>Min Age</h3>
                            <p>{tourData.minAge}</p>
                        </div>
                        <div className="detail-item">
                            <h3>Pick up</h3>
                            <p>{tourData.pickup}</p>
                        </div>
                    </div>
                </section>

                <section className="about-tour-section">
                    <h2>About Tour</h2>
                    <p>{tourData.aboutTourDescription}</p>
                </section>

                <section className="tour-packages-section">
                    <h2>{tourData.tourPackagesSectionTitle}</h2>
                    <p>{tourData.tourPackagesSectionDescription}</p>
                    {/* You can add package cards or lists here if needed */}
                </section>

                <section className="plan-vacation-section">
                    <h2>{tourData.planVacationSectionTitle}</h2>
                    <p>{tourData.planVacationSectionDescription}</p>
                </section>

                <section className="itinerary-section">
                    <h2>ITINERARY</h2>
                    {tourData.itinerary && tourData.itinerary.map((item, index) => (
                        <div key={index} className="itinerary-day">
                            <h3>{item.day}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </section>

                <section className="price-cost-section">
                    <h2>PRICE COST</h2>
                    <div className="price-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tour Cost</th>
                                    <th>{tourData.priceCost}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </section>

                <section className="tour-details-table-section">
                    <h2>Tour Details</h2>
                    <div className="tour-details-table">
                        <table>
                            <tbody>
                                {tourData.tourDetails && tourData.tourDetails.map((detail, index) => (
                                    <tr key={index}>
                                        <td>{detail.label}</td>
                                        <td>{detail.value}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>Book Now</td>
                                    <td><button className="book-now-button">Book Now</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="inclusion-exclusion-section">
                    <h2>TOUR INCLUSION / EXCLUSION</h2>
                    <div className="inclusion-exclusion-grid">
                        <div className="inclusion-list">
                            <h3>Includes</h3>
                            <ul>
                                {tourData.inclusions && tourData.inclusions.map((inclusion, index) => (
                                    <li key={index}>{inclusion}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="exclusion-list">
                            <h3>Excludes</h3>
                            <ul>
                                {tourData.exclusions && tourData.exclusions.map((exclusion, index) => (
                                    <li key={index}>{exclusion}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="terms-conditions">
                        <a href="#">Terms & Conditions Apply</a>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default DomesticTourPage;