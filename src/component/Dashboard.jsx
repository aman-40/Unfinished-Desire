import React from "react";
import "./Dashboard.css"; // Import the CSS file

const dashboard = () => {
  return (
    <div className="dashboard">
      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <h1 className="logo">EspoSan</h1>
          <nav className="nav-links">
            <a href="#" className="active">Analytics</a>
            <a href="#">Matches</a>
            <a href="#">Predictions</a>
            <a href="#">Calendar</a>
            <a href="#">Comparison</a>
            <a href="#">Geography</a>
            <a href="#">News</a>
          </nav>
        </div>

        {/* Main Content */}
        <main className="main-content">
          <div className="navbar">
            <h3 className="option">EN</h3>
            <h3 className="option">
              <h3 className="navopt"></h3>
              <h3 className="navopt"></h3>
              <h3 className="navopt"></h3>
            </h3>
            <h3 className="option">Logout</h3>
          </div>
          {/* Header Stats */}
          <div className="header-stats">
            <div className="stat">32,402<br />Tournaments & Events</div>
            <div className="stat">176,852<br />Matches</div>
            <div className="stat">34,249<br />Teams</div>
            <div className="stat">41,949<br />Players</div>
          </div>

          {/* Analytics */}
          <h2 className="section-title">Analytics</h2>
          <div className="analytics-cards">
            <div className="card yellow">Esport Games Trends</div>
            <div className="card cyan">Top Teams</div>
            <div className="card white">Top Esports Games</div>
            <div className="card pink">Top Organizations</div>
          </div>

          {/* Recent Tournaments */}
          <h2 className="section-title">Recent Tournaments</h2>
          <div className="tournament">PUBG Mobile Pro League European Championship</div>
          <div className="tournament">ESL Challenger League Season 43: Europe</div>
        </main>
      </div>
    </div>
  );
};

export default dashboard;
