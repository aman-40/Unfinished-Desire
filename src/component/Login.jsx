import React, { useState } from "react";
import "./Login.css";

const Login = ({ onStart }) => {
    const [activeTab, setActiveTab] = useState("home");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="login">
            <nav className="nav-bar">
                <a href="#" onClick={() => handleTabClick("home")}>
                    Login
                </a>
                <a href="#" onClick={() => handleTabClick("gallery")}>
                    Gallery
                </a>
                <a href="#" onClick={() => handleTabClick("info")}>
                    Information
                </a>
                <a href="#" onClick={() => handleTabClick("contact")}>
                    Contact 
                </a>
            </nav>

            <div className="main-container">
                {/* HOME */}
                {activeTab === "home" && (
                    <div className="tab-content active" id="tab-home">
                        <h2 className="tab-title">Login</h2>
                        <div className="tab-section">
                            <div className="image-container">
                                <img
                                    src="https://www.zabala.es/wp-content/uploads/2023/11/Inteligencia-artificial-y-consultoria-1200x675.jpg"
                                    alt="Example image"
                                />
                            </div>
                            <div className="form-group">
                                <div className="gender-selection">
                                <label>
                                    <input type="radio" name="gender" value="male" />
                                    Male
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="female" />
                                    Female
                                </label>
                            </div>
                                <input type="text" className="glass-input" placeholder="Write your desire name..." />
                                <button
                                    className="glass-button"
                                    onClick={() => { if (onStart) onStart(); }}
                                >
                                    <span>Start <br />
                                    <p className="wait">I can't wait</p>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* GALLERY */}
                {activeTab === "gallery" && (
                    <div className="tab-content active" id="tab-gallery">
                        <h2 className="tab-title">Gallery</h2>
                        <div className="gallery-grid">
                            <div className="image-container">
                                <img
                                    src="https://www.zabala.es/wp-content/uploads/2023/11/CEF-Digital-2023-450x300.jpg"
                                    alt="1"
                                />
                            </div>
                            <div className="image-container">
                                <img
                                    src="https://www.zabala.es/wp-content/uploads/2023/10/paradigma-cibernetico-450x300.jpg"
                                    alt="2"
                                />
                            </div>

                        </div>
                    </div>
                )}

                {/* INFORMATION */}
                {activeTab === "info" && (
                    <div className="tab-content active" id="tab-info">
                        <h2 className="tab-title">Information</h2>
                        <div className="form-group">
                            <div className="crystal-container">
                                <h1>The Legend of Aetherion</h1>
                                <p>
                                    Thousands of years ago, in a floating kingdom known as Aetherion, magic and technology
                                    coexisted...
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* CONTACT */}
                {activeTab === "contact" && (
                    <div className="tab-content active" id="tab-contact">
                        <h2 className="tab-title">Contact</h2>
                        <div className="form-group">
                            <textarea className="glass-input" placeholder="Leave your comments..."></textarea>
                            <button className="glass-button">
                                <span>Send</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <footer>
                <p>© 2023 Web Development</p>
            </footer>
        </div>
    );
};

export default Login;
