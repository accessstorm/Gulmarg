import React, { useEffect, useRef } from 'react';
import './Hire.css'; // Create HireBusCarPage.css

const Hire = () => {
    useEffect(() => {
        // Fade-in animation for sections, similar to homepage and about us page
        const sections = ['rental-offer-section', 'local-tariff-section'];
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
        <div className="hire-bus-car-page-content">
            <header className="hire-header carousel-container" style={{backgroundImage: `url('./images/travel.png')`}}>
                <div className="overlay">
                    <h1>Hire Bus / Car</h1>
                    <p>Reliable and Affordable Transportation Solutions in Mumbai.</p>
                </div>
            </header>

            {/* Cheap Car Rental Section */}
            <section className="rental-offer-section section-padding">
                <div className="container">
                    <h2>CHEAP CAR RENTAL IN MUMBAI</h2>
                    <p className="section-description">
                        Our Special Offer for Innova, Tavera & Indica - Station Tariff
                    </p>
                    <div className="table-container">
                        <table className="rental-table">
                            <thead>
                                <tr>
                                    <th>VEHICLE</th>
                                    <th>SEAT CAPACITY</th>
                                    <th>MIN. AVG. PER DAY</th>
                                    <th>RATE PER KMS.</th>
                                    <th>MAHARASHTRA TAX</th>
                                    <th>D.A. PER DAY RS.</th>
                                    <th>N-AC</th>
                                    <th>AC</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Dzire / Xcent / Aura</td>
                                    <td>4</td>
                                    <td>300 Kms</td>
                                    <td>11/-</td>
                                    <td>Nil</td>
                                    <td>400/-</td>
                                    <td>Yes</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>Innova</td>
                                    <td>6</td>
                                    <td>300 Kms</td>
                                    <td>–</td>
                                    <td>Nil</td>
                                    <td>400/-</td>
                                    <td>No</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Tempo Traveler</td>
                                    <td>14/17</td>
                                    <td>300 Kms</td>
                                    <td>18.00/-</td>
                                    <td>700</td>
                                    <td>400/-</td>
                                    <td>No</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Mini Bus</td>
                                    <td>19/25/27</td>
                                    <td>300 Kms</td>
                                    <td>30.00/-</td>
                                    <td>1000</td>
                                    <td>400/-</td>
                                    <td>No</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Lux. Bus</td>
                                    <td>35/44</td>
                                    <td>300 Kms</td>
                                    <td>40.00/-</td>
                                    <td>1500</td>
                                    <td>500/-</td>
                                    <td>No</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Semi Lux. Bus</td>
                                    <td>49</td>
                                    <td>300 Kms</td>
                                    <td>45.00/-</td>
                                    <td>1500</td>
                                    <td>500/-</td>
                                    <td>No</td>
                                    <td>Yes</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="8">Tol & Parking : Guest to Pay</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </section>

            {/* Local Transport Tariff Section */}
            <section className="local-tariff-section section-padding">
                <div className="container">
                    <h2>LOCAL TRANSPORT TARIFF</h2>
                    <p className="section-description">

                    </p>
                    <div className="table-container">
                        <table className="tariff-table">
                            <thead>
                                <tr>
                                    <th>TYPE OF VEHICLES</th>
                                    <th>80 KMS. 8 HRS.</th>
                                    <th>EXTRA. HRS.</th>
                                    <th>EXTRA KMS.</th>
                                    <th>4 HR. / 50 KMS.</th>
                                    <th>AIRPORT TRANSFER</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>xcent / Dzire (N. A/C)</td>
                                    <td>2000/-</td>
                                    <td>100/-</td>
                                    <td>12/-</td>
                                    <td>1400/-</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Indica (A/C)</td>
                                    <td>2200/-</td>
                                    <td>100/-</td>
                                    <td>12/-</td>
                                    <td>1600/-</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Innova (A/C)</td>
                                    <td>3000/-</td>
                                    <td>150/-</td>
                                    <td>17.00/-</td>
                                    <td>2300/-</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Tavera/Qualis (N. A/C)</td>
                                    <td>2800/-</td>
                                    <td>150/-</td>
                                    <td>17.00/-</td>
                                    <td>2000/-</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Tavera/Qualis (A/C)</td>
                                    <td>3000/-</td>
                                    <td>150/-</td>
                                    <td>17.00/-</td>
                                    <td>2200/-</td>
                                    <td>Yes</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="6">Tol & Parking : Guest to Pay</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hire;