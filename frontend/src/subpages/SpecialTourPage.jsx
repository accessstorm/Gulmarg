import React from 'react';
import './SpecialTourPage.css'; // Import CSS - we'll create this

const SpecialTourPage = ({ tourType, tourData }) => {
    if (!tourData) {
        return <div>Error: Tour data not found for type: {tourType}</div>;
    }

    return (
        <div className="special-tour-page-content home-page-content"> {/* Apply HomePage styles too */}
            <div className="container">
                <header className="special-tour-header">
                    <video autoPlay loop muted playsInline className="hero-video">
                        <source src={`${process.env.PUBLIC_URL}/videos/LP11.mp4`} type="video/mp4" /> {/* Replace 'your-video.mp4' with your video file path in public/videos */}
                        Your browser does not support the video tag.
                    </video>
                    <div className="header-content">
                        <h1>{tourData.pageTitle}</h1>
                        <p><a href="/">Home</a> / {tourData.pageTitle}</p>
                    </div>
                </header>

                <section className="tour-details-section">
                    <div className="tour-details-grid">
                        <div className="detail-item">
                            <h3>Activity</h3>
                            <p>By Car / Bus</p>
                        </div>
                        <div className="detail-item">
                            <h3>Packages</h3>
                            <p>{tourData.pageTitle}</p> {/* Or Package Category Title if you have one */}
                        </div>
                        <div className="detail-item book-now">
                            <h3>Book Now</h3>
                            <p>+91 9768627252</p>
                        </div>
                    </div>
                </section>

                <section className="tour-packages-section">
                    <h2>{tourData.packagesTitle}</h2>
                    <div className="tour-packages-grid">
                        {tourData.packages && tourData.packages.map((pkg, index) => (
                            <div key={index} className="tour-package-card">
                                {/*  Use pkg.imageUrl for the image source */}
                                <img src={pkg.imageUrl} alt={pkg.title} />
                                <h3>{pkg.title}</h3>
                                <a href={`/package/${pkg.name}`} className="view-package-button">View Package</a> {/* Adjust link as needed */}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SpecialTourPage;