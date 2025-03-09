import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import { FaBus, FaMapMarkerAlt, FaMobileAlt, FaStar, FaGoogle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaUsers, FaRoute, FaHeart } from 'react-icons/fa'; // Stat icons

const HomePage = () => {
    const carouselImages = [
        'https://swastiktours.com/wp-content/uploads/2024/05/young-woman-tourist-with-backpack-coming-to-shoot-2023-11-27-04-50-43-utc-scaled.jpg',
        'https://swastiktours.com/wp-content/uploads/2024/05/people-on-tropical-sandy-beach-just-before-sunset-2023-11-27-05-19-55-utc-scaled.jpg',
        'https://swastiktours.com/wp-content/uploads/2024/05/back-view-of-tourist-woman-with-backpack-taking-ph-2024-04-01-23-41-13-utc-scaled.jpg',
        'https://swastiktours.com/wp-content/uploads/2024/05/mandore-hindu-temple-complex-rajasthan-india-2023-11-27-05-25-11-utc-scaled.jpg'
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [carouselStyle, setCarouselStyle] = useState({ backgroundImage: `url(${carouselImages[0]})` });
    const carouselIntervalRef = useRef(null);

    useEffect(() => {
        carouselIntervalRef.current = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % carouselImages.length;
                console.log("Setting currentImageIndex to:", nextIndex); // ADD THIS LINE
                return nextIndex;
            });
        }, 5000);
        return () => clearInterval(carouselIntervalRef.current);
    }, []);

    useEffect(() => {
        console.log("currentImageIndex changed to:", currentImageIndex); // ADD THIS LINE
        setCarouselStyle({ backgroundImage: `url(${carouselImages[currentImageIndex]})` });
    }, [currentImageIndex]);
    // Fix 1: Reorganize stats data to properly handle animation
    const [statsData, setStatsData] = useState([
        { icon: <FaUsers />, value: 28000, label: 'Total Users', animatedValue: 0 },
        { icon: <FaRoute />, value: 13000, label: 'Total Tours', animatedValue: 0 },
        { icon: <FaHeart />, value: 68000, label: 'Social Likes', animatedValue: 0 },
        { icon: <FaStar className="star-icon" />, value: 10000, label: '5 Star Ratings', animatedValue: 0 },
    ]);

    const statsRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Fix 2: Improved animation function
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

    // Fix 3: Better animation trigger with IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        // Start animation for all stats
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

    const scrollingCardsRef = useRef(null);

    const scrollLeft = () => {
        if (scrollingCardsRef.current) {
            scrollingCardsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollingCardsRef.current) {
            scrollingCardsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };


    const domesticPackages = [
        { image: 'https://swastiktours.com/wp-content/uploads/2024/04/ashtavinayak-tour-itinerary-1.jpg', title: 'Ashtavinayak Darshan', description: 'Ashtavinayak: Blessings on the Eight Temple Trail.' },
        { image: 'https://swastiktours.com/wp-content/uploads/2024/04/kokan-darshan2.jpg', title: 'Kokan Darshan', description: 'Coastal Beauty and Culture Unveiled in natural beauty.' },
        { image: 'https://swastiktours.com/wp-content/uploads/2024/05/Kerala-Backwaters-of-Kerala-001-050524-1-711x400-1.jpg', title: 'Kerela Tour', description: 'Experience the Magic of Gods Own Country.' },
        { image: 'https://swastiktours.com/wp-content/uploads/2024/05/Gokarna-tour-1024x640-1.jpg', title: 'Rajasthan Tour', description: 'Witness Royal Grandeur in Vibrant Colors.' },
        { image: 'https://swastiktours.com/wp-content/uploads/2024/04/HIMACHAL-PRA.jpg', title: 'Himachal Tour', description: 'Himalayan Views and Thrilling Adventures.' },
        { image: 'https://swastiktours.com/wp-content/uploads/2024/05/kashmir-2.jpg', title: 'Kashmir Tour', description: 'Experience Paradise and Adventure on Earth.' },
    ];

    const summerTourPackages = [
        { image: 'https://media.istockphoto.com/id/1442179368/photo/maldives-island.jpg?s=612x612&w=0&k=20&c=t38FJQ6YhyyZGN91A8tpn3nz9Aqcy_aXolImsOXOZ34=', title: 'Beach Escapes', description: 'Pristine beaches this summer.' },
        { image: 'https://media.istockphoto.com/id/1141196125/photo/hiking-in-the-allgaeu-alps.jpg?s=612x612&w=0&k=20&c=scBnm6PxD4eJm49IKmP-EJiarbI_lds_z5QCWgViqTo=', title: 'Mountain Retreats', description: 'Cool mountain paradises.' },
        { image: 'https://media.istockphoto.com/id/516449022/photo/lady-with-kayak.jpg?s=612x612&w=0&k=20&c=Yp-rzpmY_hbhpbTE38z6toouRKW-lAEN-ZvuWvH8kKE=', title: 'Adventure Camps', description: 'Camps for thrill-seekers.' },
        { image: 'https://media.istockphoto.com/id/1164329797/photo/hindu-sadhu-sitting-on-a-boat-overlooking-varanasi-city-architecture-at-sunset.jpg?s=612x612&w=0&k=20&c=LbpIHRo7kGT7dbUr6b6UuD1d6P0yCaKZ2lbqo3TY988=', title: 'Cultural Holidays', description: 'Vibrant cultures this summer.' },
        { image: 'https://media.istockphoto.com/id/1384618442/photo/multiracial-friends-taking-big-group-selfie-shot-smiling-at-camera-laughing-young-people.jpg?s=612x612&w=0&k=20&c=bQn8gjL69nvsP0bbUyonQqXIlVPaEwWBhOW6h9rhV_c=', title: 'Student Tour', description: 'Explore wildlife this summer.' },
        { image: 'https://media.istockphoto.com/id/1126057647/photo/young-tourists-couple-on-walk-along-the-port.jpg?s=612x612&w=0&k=20&c=KA37wgE_gtslooMTLYRRJUnTCwbjnFtD7YKeJzxnjUs=', title: 'Honeymoon Tour', description: 'Hop through islands this summer.' },
    ];

    const internationalPackages = [
        { image: 'https://swastiktours.com/wp-content/uploads/2024/05/maldives-island_1203-7338.png', title: 'Maldives', description: 'Beauty of Bali.' },
        { image: 'https://swastiktours.com/wp-content/uploads/2024/05/sigapore-vertical-768x1365.webp', title: 'Singapore', description: 'Iconic European cities.' },
        { image: 'https://swastiktours.com/wp-content/uploads/2024/05/thailad-vertical.png', title: 'Thailand', description: 'Stunning beaches of Thailand.' },
        { image: 'https://swastiktours.com/wp-content/uploads/2024/05/hongkong-vertical.jpg', title: 'Hong Kong', description: 'Luxury in the Maldives.' },
    ];

    // Fix 4: Simplified client reviews section - REDESIGNED
    const reviews = [
        { text: '"Amazing experience! Highly recommend."', author: 'John Doe', rating: 5 },
        { text: '"Excellent service & tours."', author: 'Jane Smith', rating: 4 },
        { text: '"Memorable trip."', author: 'Peter Jones', rating: 5 },
        { text: '"Top-notch planning."', author: 'Alice Brown', rating: 4 },
        { text: '"Seamless booking & support."', author: 'Bob Williams', rating: 5 },
        { text: '"Incredible destinations & value."', author: 'Charlie Davis', rating: 3 },
    ];

    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [reviewTransition, setReviewTransition] = useState('fade-in');
    const reviewTimeoutRef = useRef(null); // Ref to hold the timeout

    useEffect(() => {
        const TRANSITION_DURATION = 500; // Match CSS transition time (increased slightly for clarity)
        const DISPLAY_DURATION = 3500; // 3.5s display time

        const rotateReviews = () => {
            setReviewTransition('fade-out'); // Start fade-out

            reviewTimeoutRef.current = setTimeout(() => {
                setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
                setReviewTransition('fade-in'); // Start fade-in for the next review
            }, TRANSITION_DURATION); // Wait for fade-out before changing review
        };

        const reviewInterval = setInterval(rotateReviews, DISPLAY_DURATION + TRANSITION_DURATION); // Total cycle time

        return () => {
            clearInterval(reviewInterval);
            clearTimeout(reviewTimeoutRef.current); // Clear timeout on unmount
        };
    }, [reviews.length]);



    const travelTips = [
        { image: 'https://media.istockphoto.com/id/482557081/photo/hawa-mahal-jaipur-india.jpg?s=612x612&w=0&k=20&c=A6qCUjoNH74nXCkB07RNgK3eIt2mun8PgsLPw9dNkVI=', date: 'Aug 15, 2024', title: 'The Pink City Jaipur : Special Attraction in Rajasthan tour', description: 'Jaipur is the capital of Rajasthan, a vibrant state in India. It is because the history and architecture of the…' },
        { image: 'https://media.istockphoto.com/id/1479153584/photo/cross-country-skiers-against-a-background-of-snow-wrapped-firs-and-a-clear-blue-sky.jpg?s=612x612&w=0&k=20&c=oR-Tq3qgFmMuH67RWSvjcSkocx49Yt85GywdXhDyuQc=', date: 'July 20, 2024', title: 'Winter Wonderland: Uttarakhand Tour Packages for Snow Lovers', description: 'When you want to plan a family vacation in the proximity of snow, then the winter season is ideal.  And…' },
        { image: 'https://media.istockphoto.com/id/506116780/photo/morning-at-the-paradise-srinagar.jpg?s=612x612&w=0&k=20&c=05KYaEuMYHasAn1_vPxsXqO0i42XsEkGgR-oMoP7kVY=', date: 'June 10, 2024', title: 'Rich History and Landmarks in kashmir ', description: 'Historical Kashmir A Look at the Area’s Rich History and Landmarks Jammu and Kashmir is one of the most important…' },
    ];

    const sections = ['quick-actions-section', 'packages-section', 'summer-tours-section', 'stats-section', 'mumbai-tours-section', 'international-packages-section', 'client-reviews-section', 'travel-tips-section'];
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
                // Ensure sections start hidden
                section.classList.remove('fade-in-section');
                observer.observe(section);
            }
        });

        // Cleanup
        return () => {
            sections.forEach(sectionId => {
                const section = document.querySelector(`.${sectionId}`);
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []); // Empty dependency array since sections don't change


    return (
        <div className="home-page-content">
            {/* Image Carousel */}
            <header className="carousel-container" style={carouselStyle}>
                <div className="overlay">
                    <h1><span>Gulmarg Destination</span> Tours and travels.</h1>
                </div>
            </header>

            {/* Activity, Destination, Book Now Section */}
            <section className="quick-actions-section fade-in-section"> {/* Added fade-in-section class */}
                <div className="container">
                    <div className="card">
                        <FaBus className="icon" />
                        <h3>Activity</h3>
                        <p>Discover exciting activities for your trip.</p>
                    </div>
                    <div className="card">
                        <FaMapMarkerAlt className="icon" />
                        <h3>Destination</h3>
                        <p>Find your dream destination with us.</p>
                    </div>
                    <div className="card">
                        <FaMobileAlt className="icon" />
                        <h3>Book Now</h3>
                        <p>Easy booking on your mobile.</p>
                    </div>
                </div>
            </section>

            {/* Domestic Packages Section - Video Background with LP3.mp4 */}
            <section className="packages-section fade-in-section"> {/* Added fade-in-section class */}
                <video autoPlay loop muted playsInline className="hero-video">
                    <source src={`${process.env.PUBLIC_URL}/videos/LP3.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="container">
                    <h2>Explore the Best of Our <span>Domestic Packages</span></h2>
                    <div className="section-description">
                        <p>Embark on unforgettable journeys within your country. Discover diverse cultures, breathtaking landscapes, and hidden gems with our curated domestic tour packages.</p>
                        <p>From serene beaches to majestic mountains, we have a package for every traveler. Explore our top domestic destinations and start planning your adventure today!</p>
                    </div>

                    <div className="scrolling-cards-container">
                        <button className="scroll-button left" onClick={scrollLeft}><FaChevronLeft /></button>
                        <div className="scrolling-cards" ref={scrollingCardsRef}>
                            {domesticPackages.map((pkg, index) => (
                                <div key={index} className="tour-card">
                                    <img src={pkg.image} alt={pkg.title} />
                                    <h3>{pkg.title}</h3>
                                    <p>{pkg.description}</p>
                                    <button className="view-tour-button">View Tour</button>
                                </div>
                            ))}
                        </div>
                        <button className="scroll-button right" onClick={scrollRight}><FaChevronRight /></button>
                    </div>
                    <div className="view-more-button-container">
                        <button className="view-more-button">View More Domestic Packages</button>
                    </div>
                </div>
            </section>

            {/* Summer Tours Packages Section */}
            <section className="summer-tours-section fade-in-section"> {/* Added fade-in-section class */}
                <div className="container">
                    <h2>Explore the Best of Our Summer Tours Packages</h2>
                    <div className="summer-tours-grid">
                        {summerTourPackages.map((pkg, index) => (
                            <div key={index} className="summer-tour-card">
                                <img src={pkg.image} alt={pkg.title} />
                                <h3>{pkg.title}</h3>
                                <p>{pkg.description}</p>
                                <button className="tour-button">Explore Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section - Fixed */}
            <section className="stats-section fade-in-section" ref={statsRef}> {/* Added fade-in-section class */}
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

            {/* Mumbai Tours Section */}
            <section className="mumbai-tours-section fade-in-section"> {/* Added fade-in-section class */}
                <div className="container">
                    <h2>Tours and Travels in Mumbai</h2>
                    <div className="mumbai-content">
                        <img src="https://media.istockphoto.com/id/1216024790/photo/gateway-of-india-mumbai.jpg?s=612x612&w=0&k=20&c=AsSJmRd5D8kHtsvHdzbgcGSn8k1M5qKtFHidauajdrk=" alt="Mumbai City" className="mumbai-image" />
                        <div className="mumbai-text">
                            <p>Discover the vibrant city of Mumbai with our exclusive tour packages. Experience the hustle and bustle of city life combined with rich cultural heritage and iconic landmarks.</p>
                            <p>From historical sites to Bollywood studios, Mumbai offers a unique blend of experiences. Let us guide you through the best of what Mumbai has to offer!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* International Packages Section - Video Background with LP4.mp4 */}
            <section className="international-packages-section fade-in-section">
                <video autoPlay loop muted playsInline className="hero-video">
                    <source src={`${process.env.PUBLIC_URL}/videos/LP4.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="container">
                    <h2>Explore our best <span>International Packages</span></h2>
                    <div className="section-description">
                        <p>Broaden your horizons with our exciting international tour packages. Explore new cultures, exotic destinations, and create memories that last a lifetime.</p>
                        <p>Whether you dream of relaxing on tropical beaches or exploring ancient ruins, our international packages are designed to cater to your wanderlust. Discover the world with us!</p>
                    </div>
                    <div className="international-packages-grid">
                        {internationalPackages.map((pkg, index) => (
                            <div key={index} className="international-tour-card">
                                <img src={pkg.image} alt={pkg.title} />
                                <h3>{pkg.title}</h3>
                                <div className="button-container">
                                    <button className="animated-button">Discover More</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Reviews Section - REDESIGNED with fade animation */}
            <section className="client-reviews-section fade-in-section"> {/* Added fade-in-section class */}
                <div className="container">
                    <h2>Client Reviews</h2>
                    <div className="reviews-container">
                        <img src="https://media.istockphoto.com/id/623586810/photo/young-beautiful-girl-is-shopping-in-the-mall.jpg?s=612x612&w=0&k=20&c=2csKN2tDyAoX5kHJwNF_xcLcYQnxycljbwwuieL_5A8=" alt="Happy Clients" className="reviews-image" />
                        <div className="review-carousel">
                            {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className={`review-card ${reviewTransition} ${index === currentReviewIndex ? 'active' : ''}`}
                                >
                                    <FaGoogle className="google-icon" />
                                    <div className="review-rating"> {/* Container for rating display */}
                                        <span className="numeric-rating">{review.rating.toFixed(1)}</span> {/* Display numeric rating with one decimal */}
                                        <span className="star-icons"> {/* Container for star icons */}
                                            {[...Array(review.rating)].map((_, i) => (  // Golden stars
                                                <FaStar key={i} className="golden-star-icon" />
                                            ))}
                                            {[...Array(5 - review.rating)].map((_, i) => (  // Grey stars
                                                <FaStar key={i} className="grey-star-icon" />
                                            ))}
                                        </span>
                                    </div>
                                    <p className="review-text">{review.text}</p>
                                    <p className="review-author">- {review.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Travel Tips and Advice Section */}
            <section className="travel-tips-section fade-in-section"> {/* Added fade-in-section class */}
                <div className="container">
                    <h2>Travel tips and Advice</h2>
                    <div className="tips-grid">
                        {travelTips.map((tip, index) => (
                            <div key={index} className="tip-card">
                                <img src={tip.image} alt={tip.title} />
                                <span className="tip-date">{tip.date}</span>
                                <h3>{tip.title}</h3>
                                <p className="tip-description">{tip.description} <a href="#" className="read-more">...Read more</a></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;