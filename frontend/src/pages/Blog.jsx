// Blog component - updated to include video background in header
import React, { useEffect } from 'react';
import './Blog.css'; // Import CSS for styling

const Blog = () => {
    const blogPosts = [
        {
            title: "The Pink City Jaipur : Special Attraction in Rajasthan tour",
            category: "Uncategorized",
            date: "August 15, 2024",
            description: "Jaipur is the capital of Rajasthan, a vibrant state in India. It is...",
            imageUrl: 'https://media.istockphoto.com/id/482557081/photo/hawa-mahal-jaipur-india.jpg?s=612x612&w=0&k=20&c=A6qCUjoNH74nXCkB07RNgK3eIt2mun8PgsLPw9dNkVI='
        },
        {
            title: "Winter Wonderland Uttarakhand Tour Packages for Snow Lovers",
            category: "Uncategorized",
            date: "July 20, 2024",
            description: "When you want to plan a family vacation in the proximity of snow,...",
            imageUrl: 'https://media.istockphoto.com/id/1479153584/photo/cross-country-skiers-against-a-background-of-snow-wrapped-firs-and-a-clear-blue-sky.jpg?s=612x612&w=0&k=20&c=oR-Tq3qgFmMuH67RWSvjcSkocx49Yt85GywdXhDyuQc='
        },
        {
            title: "Rich History and Landmarks in kashmir ",
            category: "Travel",
            date: "June 10, 2024",
            description: "Historical Kashmir A Look at the Area’s Rich History and Landmarks Jammu and...",
            imageUrl: 'https://media.istockphoto.com/id/506116780/photo/morning-at-the-paradise-srinagar.jpg?s=612x612&w=0&k=20&c=05KYaEuMYHasAn1_vPxsXqO0i42XsEkGgR-oMoP7kVY='
        },
        {
            title: "Mumbai's Hidden Gems: The Unexplored Corners of the City Worth Visiting",
            category: "Travel",
            date: "May 15, 2024",
            description: "Mumbai’s Hidden Gems: The Unexplored Corners of the City Worth Visiting Mumbai is one of the most visited cities in India. It reflects the...",
            imageUrl: 'https://media.istockphoto.com/id/1216024790/photo/gateway-of-india-mumbai.jpg?s=612x612&w=0&k=20&c=AsSJmRd5D8kHtsvHdzbgcGSn8k1M5qKtFHidauajdrk='
        },
        {
            title: "Delhi’s Hidden Gems: Offbeat Attractions for Family Fun",
            category: "Travel",
            date: "May 10, 2024",
            description: "Delhi’s Hidden Gems: Offbeat Attractions for Family Fun Being the capital city of India, Delhi is the ultimate gateway to experience...",
            imageUrl: 'https://media.istockphoto.com/id/898467608/photo/the-india-gate-in-delhi.jpg?s=612x612&w=0&k=20&c=gXUaUcAJf7TD8VZ1UvBfNGU0SNNzqg-xuIx_eXgL1OM='
        },
        {
            title: "Adventure Activities in Goa: Thrilling Experiences beyond the Beaches",
            category: "Travel",
            date: "May 5, 2024",
            description: "When one thinks of Goa, picturesque beaches, vibrant nightlife, and cultural richness often...",
            imageUrl: 'https://media.istockphoto.com/id/535168027/photo/india-goa-palolem-beach.jpg?s=612x612&w=0&k=20&c=iGV1Ue0Efj87dQirWnUpZVG1dNobUjfVvMGdKHTJ7Qg='
        },
        {
            title: "Best Offbeat Places That You Must Visit in Kashmir",
            category: "Travel",
            date: "April 30, 2024",
            description: "The Beauty of Kashmir: Exploring the Mesmerizing Landscapes Kashmir resembles unparalleled beauty and is one of nature’s finest creations, making it...",
            imageUrl: 'https://media.istockphoto.com/id/1061972184/photo/landscape-of-snow-mountains-and-mountain-road-to-nubra-valley-in-leh-ladakh-india.jpg?s=612x612&w=0&k=20&c=i0pA6oVMEzUgBLp5V7CblN1wPwOO7A2D3orhfi7HGe4='
        },
        {
            title: "Monsoon Adventure Sports in Goa: Thrills Amidst the Rain",
            category: "Travel",
            date: "April 25, 2024",
            description: "Goa is not only a place for having fun in the sun and...",
            imageUrl: 'https://media.istockphoto.com/id/1408164910/photo/vagator-beach-in-north-goa-on-a-windy-and-cloudy-day-during-monsoon-season.jpg?s=612x612&w=0&k=20&c=nfa1PBRTgMmgsOMpflOd4ueN13Ks8fBjP0XChmmG9_0='
        },
        {
            title: "Offbeat-Locations-In-Kerala",
            category: "Travel",
            date: "April 20, 2024",
            description: "Offbeat Locations In Kerala During The Monsoon Kerala, also known as “God’s Own Country,” is a captivating location that comes...",
            imageUrl: 'https://media.istockphoto.com/id/503219304/photo/traditional-kathakali-dance-on-new-year-carnival.jpg?s=612x612&w=0&k=20&c=RgxVoXvUEfI901fjNAoAZv8O7UYLF-aKsjHO1Z6hfzY='
        },
        {
            title: "10 Best Places to Visit in Himachal Pradesh",
            category: "Travel",
            date: "April 15, 2024",
            description: "10 Best Places to Visit in Himachal Pradesh During Snow For someone fond of snow, Himachal is always a place of wonder to...",
            imageUrl: 'https://media.istockphoto.com/id/1371289822/photo/himalayan-village-town-of-kalpa-with-kailash-mountain-snow-peaks-at-himachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=ibz1ktqV34YlHk0FeSyBcoykG2IVViXNUxU2NLCGsg8='
        },
    ];

    // Extract recent posts (first 5)
    const recentPosts = blogPosts.slice(0, 5);

    // Extract archives (assuming dates are in YYYY-MM-DD format and we want unique month-year)
    const archives = [...new Set(blogPosts.map(post => {
        const dateParts = post.date.split(' '); // Split "August 15, 2024"
        const month = dateParts[0];
        const year = dateParts[2];
        const monthNumber = new Date(`${month} 1, ${year}`).getMonth() + 1; // Get month number (0-indexed)
        const monthString = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`; // Pad month number
        return `${year}-${monthString}`; // Format as YYYY-MM
    }))].sort().reverse(); // Sort archives and reverse to show latest first

    // Extract categories and their counts
    const categoryCounts = blogPosts.reduce((counts, post) => {
        counts[post.category] = (counts[post.category] || 0) + 1;
        return counts;
    }, {});

    const sections = ['blog-header-section', 'blog-body-section']; // Sections to fade in
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
    }, []); // Empty dependency array

    return (
        <div className="blog-page-content">
            <section className="blog-header-section">
                <video autoPlay loop muted playsInline className="hero-video">
                    <source src={`${process.env.PUBLIC_URL}/videos/LP5.mp4`} type="video/mp4" /> {/* Example video path - replace with your video */}
                    Your browser does not support the video tag.
                </video>
                <div className="container">
                    <h1>Our Travel Blog</h1>
                    <p>Explore our latest travel tips, destination guides, and adventure stories.</p>
                </div>
            </section>

            <section className="blog-body-section">
                <div className="container">
                    <aside className="blog-sidebar">
                        <div className="sidebar-section search-section">
                            <h4>Search</h4>
                            <input type="text" placeholder="Search …" className="search-input" />
                        </div>

                        <div className="sidebar-section recent-posts-section">
                            <h4>Recent Posts</h4>
                            <ul className="recent-posts-list">
                                {recentPosts.map((post, index) => (
                                    <li key={index} className="recent-post-item">
                                        <a href="#">{post.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="sidebar-section recent-comments-section">
                            <h4>Recent Comments</h4>
                            <p>No comments to show.</p>
                        </div>

                        <div className="sidebar-section archives-section">
                            <h4>Archives</h4>
                            <ul className="archives-list">
                                {archives.map((archive, index) => {
                                    const [year, month] = archive.split('-');
                                    const monthName = new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleString('default', { month: 'long' });
                                    return (
                                        <li key={index} className="archive-item">
                                            <a href="#">{monthName} {year}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="sidebar-section categories-section">
                            <h4>Categories</h4>
                            <ul className="categories-list">
                                {Object.keys(categoryCounts).map(category => (
                                    <li key={category} className="category-item">
                                        <a href="#">{category}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="sidebar-section blog-categories-section">
                            <h4>Blog Categories</h4>
                            <ul className="blog-categories-list">
                                {Object.entries(categoryCounts).map(([category, count]) => (
                                    <li key={category} className="blog-category-item">
                                        {category} ({count})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <main className="blog-main-content">
                        <div className="blog-posts-grid">
                            {blogPosts.map((post, index) => (
                                <div key={index} className="blog-post-card">
                                    <img src={post.imageUrl} alt={post.title} className="blog-post-image" />
                                    <div className="blog-post-details">
                                        <span className="blog-post-category">{post.category}</span>
                                        <h3 className="blog-post-title">{post.title}</h3>
                                        <span className="blog-post-date">{post.date}</span>
                                        <p className="blog-post-description">{post.description} <a href="#" className="read-more">Read more</a></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
};

export default Blog;