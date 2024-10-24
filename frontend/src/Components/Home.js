import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./StyleElement/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "./AuthContext";

function Home() {
  const today = new Date().toISOString().split('T')[0];
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [busDate, setBusDate] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/bus-search-results?from=${from}&to=${to}&busDate=${busDate}`);
  };

  const offersSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <main>
      <div className="intro">
        <h1>Spartan Buses</h1>
        <p>Welcome to our bus booking system</p>
        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="From"
            className="input-field location-input"
            value={from}
            onChange={(e) => setFrom(e.target.value.toLowerCase())}
            required
          />
          <input
            type="text"
            placeholder="To"
            className="input-field location-input"
            value={to}
            onChange={(e) => setTo(e.target.value.toLowerCase())}
            required
          />
          <input
            type="date"
            className="input-field date-input"
            value={busDate}
            min={today}
            onChange={(e) => setBusDate(e.target.value)}
            required
          />
          <button onClick={handleSearch} className="search-button">
            Search Buses
          </button>
        </div>
        {/* Trending Offers Section */}
          <h2 style={{textAlign:'center'}}>Trending Offers</h2>
        <div className="offers-slider">
          <Slider className="slider-container" {...offersSettings}>
            <div className="offer-card">
              <div className="offer-content">
                <p>Up to Rs 300 on Chartered Bus</p>
                <p>
                  Use Code: <strong>CHARTERED15</strong>
                </p>
                <p>Valid till 01 Nov</p>
              </div>
            </div>
            <div className="offer-card">
              <div className="offer-content">
                <p>Save 25% up to Rs 100 on SBSTC Bus</p>
                <p>
                  Use Code: <strong>SBTNEW</strong>
                </p>
                <p>Valid till 01 Nov</p>
              </div>
            </div>
            <div className="offer-card">
              <div className="offer-content">
                <p>Up to Rs 300 on Routes from Nagpur</p>
                <p>
                  Use Code: <strong>NAGPUR300</strong>
                </p>
                <p>Valid till 01 Jan</p>
              </div>
            </div>
          </Slider>
        </div>
        {/* Card Section */}
        <div className="card">
          <h2 className="card-title">Online Bus Booking Services</h2>
          <p className="card-content">
            Spartan Bus is India`s leading online bus ticket booking service provider. Check out budget-friendly offers and save big with discount coupons to book bus tickets at the lowest price with us. You can check the bus schedules, compare prices, and find all the information you need to plan an ideal and comfortable bus or train journey.
          
            Spartan Bus has simplified the online bus booking process for your travel planning. In case you need to cancel the ticket or change the dates, you can save both time and money by choosing AbhiCash as a refund option, which can be used instantly. Book now!!!
         
            Browse through all your bus route options, and use our advanced smart filters to ensure a reliable and comfortable journey, tailored to your scheduled travel plans.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Home;
