import React from "react";
import { FaRegClock, FaBlog, FaCogs, FaDesktop } from 'react-icons/fa';
import { FaList, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import '../../App.css';

const Opportunities = () => {
    const iconColor = '#E3652D';

    return (
        <div className="py-5" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="container">
                <div className="text-center py-5">
                    <h2 className="display-5">
                        Done For You - Guest Post Service
                    </h2>
                    <div className="my-2" style={{ width: '50px', height: '2px', backgroundColor: iconColor, margin: '0 auto', marginTop: '5px' }}></div>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Don’t feel like dealing with the writing, outreach, and publishing? <br />
                        Check out our guest post service.
                    </p>
                    <a href="#sites">
                        <button className="btn" style={{
                            backgroundColor: iconColor, color: '#fff', borderRadius: '25px', padding: '10px 20px', fontSize: '1rem'
                        }}>Read More</button>
                    </a>
                </div>
                {/* Heading and Button Section */}
                <div className="row mb-4">
                    <div className="col-md-6 mb-4">
                        <h2 className="display-5">The Ultimate List of Guest Posting Opportunities.</h2>
                        <p className="text-muted" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                            We keep an updated list of blogs that accept guest posts. We also keep track of what the
                            website owners charge for the guest post and help you track all of your guest posts in one place.
                        </p>
                        <a href="#contact">
                            <button className="btn" style={{
                                backgroundColor: iconColor, color: '#fff', borderRadius: '25px', padding: '10px 20px', fontSize: '1rem'
                            }}
                            >Get In Touch</button>
                        </a>
                    </div>

                    {/* Stats Section with Boxes on the Right */}
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-6 mb-3">
                                <div className="stat-box text-center d-flex flex-column justify-content-center" style={{ height: '160px' }}>
                                    <div className="fs-1 text-custom-icon"><FaRegClock /></div>
                                    <div className="fs-1 text-white">6</div>
                                    <p className="text-white" style={{ fontSize: '0.9rem' }}>Years</p>
                                </div>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="stat-box text-center d-flex flex-column justify-content-center" style={{ height: '160px' }}>
                                    <div className="fs-1 text-custom-icon"><FaBlog /></div>
                                    <div className="fs-1 text-white">1500 +</div>
                                    <p className="text-white" style={{ fontSize: '0.9rem' }}>Guest Posting</p>
                                </div>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="stat-box text-center d-flex flex-column justify-content-center" style={{ height: '160px' }}>
                                    <div className="fs-1 text-custom-icon"><FaCogs /></div>
                                    <div className="fs-1 text-white">0</div>
                                    <p className="text-white" style={{ fontSize: '0.9rem' }}>Amount of PBNs</p>
                                </div>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="stat-box text-center d-flex flex-column justify-content-center" style={{ height: '160px' }}>
                                    <div className="fs-1 text-custom-icon"><FaDesktop /></div>
                                    <div className="fs-1 text-white">1</div>
                                    <p className="text-white" style={{ fontSize: '0.9rem' }}>Platform</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Steps Section with Icons */}
                <div className="d-flex flex-wrap justify-content-around text-start">
                    <div className="d-flex align-items-start" style={{ flex: 1, minWidth: '300px' }}>
                        <FaList className="fs-3" style={{ color: iconColor, margin: '5px' }} />
                        <p style={{ fontSize: '1.3rem', lineHeight: '1.5' }}>
                            Step 1: Choose a guest blogging website
                        </p>
                    </div>
                    <div className="d-flex align-items-start" style={{ flex: 1, minWidth: '300px' }}>
                        <FaEnvelope className="fs-3" style={{ color: iconColor, margin: '5px' }} />
                        <p style={{ fontSize: '1.3rem', lineHeight: '1.5' }}>
                            Step 2: Reach out and pitch your idea
                        </p>
                    </div>
                    <div className="d-flex align-items-start" style={{ flex: 1, minWidth: '300px' }}>
                        <FaArrowUp className="fs-3" style={{ color: iconColor, margin: '5px' }} />
                        <p style={{ fontSize: '1.3rem', lineHeight: '1.5' }}>
                            Step 3: Write it, submit it, and watch your rankings climb
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Opportunities;
