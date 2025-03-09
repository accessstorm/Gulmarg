import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Hire from "./pages/Hire";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import SpecialTourPage from "./subpages/SpecialTourPage";
import tourPackagesData from "./subpages/tourPackagesData";
import InternationalTourPage from './subpages/InternationalTourPage'; // Import InternationalTourPage
import internationalTourData from './subpages/internationalTourData.json'; // Import international tour data
import DomesticTourPage from './subpages/DomesticTourPage'; // Import DomesticTourPage
import domesticTourData from './subpages/domesticTourData.json';
import Gem from './components/Gem';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar Component */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/hire" element={<Hire />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/summer-tours" element={<SpecialTourPage tourType="summer" tourData={tourPackagesData.find(data => data.tourType === 'summer')} />} />
            <Route path="/adventure-tours" element={<SpecialTourPage tourType="adventure" tourData={tourPackagesData.find(data => data.tourType === 'adventure')} />} />
            <Route path="/student-tours" element={<SpecialTourPage tourType="student" tourData={tourPackagesData.find(data => data.tourType === 'student')} />} />
            <Route path="/honeymoon-tours" element={<SpecialTourPage tourType="honeymoon" tourData={tourPackagesData.find(data => data.tourType === 'honeymoon')} />} />
            <Route path="/international-tours/maldives" element={<InternationalTourPage destinationType="maldives" tourData={internationalTourData.destinations.find(dest => dest.name === 'maldives')} />} />
            <Route path="/international-tours/thailand" element={<InternationalTourPage destinationType="thailand" tourData={internationalTourData.destinations.find(dest => dest.name === 'thailand')} />} />
            <Route path="/international-tours/dubai" element={<InternationalTourPage destinationType="dubai" tourData={internationalTourData.destinations.find(dest => dest.name === 'dubai')} />} />
            <Route path="/international-tours/singapore-malaysia" element={<InternationalTourPage destinationType="singapore-malaysia" tourData={internationalTourData.destinations.find(dest => dest.name === 'singapore-malaysia')} />} />
            <Route path="/international-tours/bali" element={<InternationalTourPage destinationType="bali" tourData={internationalTourData.destinations.find(dest => dest.name === 'bali')} />} />
            <Route path="/international-tours/singapore" element={<InternationalTourPage destinationType="singapore" tourData={internationalTourData.destinations.find(dest => dest.name === 'singapore')} />} />
            <Route path="/international-tours/sri-lanka" element={<InternationalTourPage destinationType="sri-lanka" tourData={internationalTourData.destinations.find(dest => dest.name === 'sri-lanka')} />} />
            <Route path="/international-tours/hongkong-macau" element={<InternationalTourPage destinationType="hongkong-macau" tourData={internationalTourData.destinations.find(dest => dest.name === 'hongkong-macau')} />} />
            <Route path="/domestic-tours/ashtavinayak-darshan" element={<DomesticTourPage destinationType="ashtavinayak-darshan" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'ashtavinayak-darshan')} />} />
            <Route path="/domestic-tours/konkan-darshan" element={<DomesticTourPage destinationType="konkan-darshan" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'konkan-darshan')} />} />
            <Route path="/domestic-tours/kerala" element={<DomesticTourPage destinationType="kerala" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'kerala')} />} />
            <Route path="/domestic-tours/karnataka" element={<DomesticTourPage destinationType="karnataka" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'karnataka')} />} />
            <Route path="/domestic-tours/himachal" element={<DomesticTourPage destinationType="himachal" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'himachal')} />} />
            <Route path="/domestic-tours/kashmir" element={<DomesticTourPage destinationType="kashmir" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'kashmir')} />} />
            <Route path="/domestic-tours/uttarakhand" element={<DomesticTourPage destinationType="uttarakhand" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'uttarakhand')} />} />
            <Route path="/domestic-tours/rajasthan" element={<DomesticTourPage destinationType="rajasthan" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'rajasthan')} />} />
            <Route path="/domestic-tours/goa" element={<DomesticTourPage destinationType="goa" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'goa')} />} />
            <Route path="/domestic-tours/hyderabad" element={<DomesticTourPage destinationType="hyderabad" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'hyderabad')} />} />
            <Route path="/domestic-tours/tirupati-balaji-darshan" element={<DomesticTourPage destinationType="tirupati-balaji-darshan" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'tirupati-balaji-darshan')} />} />
            <Route path="/domestic-tours/mahabaleshwar" element={<DomesticTourPage destinationType="mahabaleshwar" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'mahabaleshwar')} />} />
            <Route path="/domestic-tours/vaishno-devi" element={<DomesticTourPage destinationType="vaishno-devi" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'vaishno-devi')} />} />
            <Route path="/domestic-tours/sikkim-darjeeling" element={<DomesticTourPage destinationType="sikkim-darjeeling" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'sikkim-darjeeling')} />} />
            <Route path="/domestic-tours/varanasi" element={<DomesticTourPage destinationType="varanasi" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'varanasi')} />} />
            <Route path="/domestic-tours/nepal-tour" element={<DomesticTourPage destinationType="nepal-tour" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'nepal-tour')} />} />
            <Route path="/domestic-tours/shree-datta-dham-yatra" element={<DomesticTourPage destinationType="shree-datta-dham-yatra" tourData={domesticTourData.domesticTours.find(dest => dest.name === 'shree-datta-dham-yatra')} />} />
            {/* Future routes for About, Tours, Blog, Contact, etc. */}
          </Routes>
          <Gem/>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
