import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* 1. SIDEBAR - Investigator Command Console (No scan button/emojis) */}
      <aside className="sidebar">
        <div className="sidebar-header-group">
          <div className="brand-badge"></div>
          <div>
            <h2 className="sidebar-brand-title">FraudLens</h2>
            <p className="sidebar-subtitle">Financial Crime Intelligence</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">NAVIGATION</div>
          <ul>
            <li className="nav-item active">
              <span className="nav-indicator"></span>
              <span className="nav-line-icon"></span> Dashboard
            </li>
            <li className="nav-item">
              <span className="nav-indicator"></span>
              <span className="nav-line-icon"></span> Transactions
            </li>
            <li className="nav-item">
              <span className="nav-indicator"></span>
              <span className="nav-line-icon"></span> Alerts
            </li>
            <li className="nav-item">
              <span className="nav-indicator"></span>
              <span className="nav-line-icon"></span> Network Analysis
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <div>
            <h1 className="header-title">Fraud Detection Dashboard</h1>
            <p className="header-subtitle">Monitoring transaction networks</p>
          </div>
        </header>

        {/* PRIMARY CHANGE: Large Hero Scan Section */}
        <section className="scan-hero-section">
          <div className="scan-hero-content">
            <span className="hero-tag">INTELLIGENCE ENGINE ACTIVE</span>
            <h2>SCAN FOR FRAUD</h2>
            <p>Analyze transaction networks for suspicious activity and latent circular loops.</p>
          </div>
          <button className="primary-scan-cta">
            <span className="cta-icon-shape"></span>
            <span>START SCAN</span>
          </button>
        </section>

        {/* Summary Metric Cards */}
        <section className="metrics-grid">
          <div className="metric-card">
            <span className="metric-label">Total Accounts</span>
            <div className="metric-value-row">
              <span className="metric-number">128</span>
              <span className="metric-trend neutral">Active</span>
            </div>
          </div>
          <div className="metric-card">
            <span className="metric-label">Transactions Monitored</span>
            <div className="metric-value-row">
              <span className="metric-number">2,450</span>
              <span className="metric-trend neutral">Real-time</span>
            </div>
          </div>
          <div className="metric-card alert-metric-card">
            <span className="metric-label">Suspicious Accounts</span>
            <div className="metric-value-row">
              <span className="metric-number alert-num">3</span>
              <span className="metric-trend danger">Requires Review</span>
            </div>
          </div>
        </section>

        {/* Transaction Network Panel */}
        <section className="network-panel">
          <div className="panel-header">
            <h2>Transaction Network</h2>
            <div className="network-legend">
              <span className="legend-item"><span className="node-dot normal-dot"></span> Normal Entity</span>
              <span className="legend-item"><span className="node-dot suspicious-dot"></span> Suspicious Loop</span>
            </div>
          </div>

          <div className="network-canvas">
            <div className="node-network-wrapper">
              {/* Account A */}
              <div className="investigation-node suspicious-node" style={{ top: '22%', left: '26%' }}>
                <span className="node-id">Acct A</span>
                <span className="node-tier">Layer 1</span>
              </div>

              {/* Account B */}
              <div className="investigation-node suspicious-node" style={{ top: '22%', left: '72%' }}>
                <span className="node-id">Acct B</span>
                <span className="node-tier">Layer 2</span>
              </div>

              {/* Account C */}
              <div className="investigation-node suspicious-node" style={{ top: '75%', left: '49%' }}>
                <span className="node-id">Acct C</span>
                <span className="node-tier">Layer 3</span>
              </div>

              {/* Normal Peripheral Nodes */}
              <div className="investigation-node normal-node" style={{ top: '78%', left: '16%' }}>
                <span className="node-id">Acct D</span>
              </div>
              <div className="investigation-node normal-node" style={{ top: '78%', left: '82%' }}>
                <span className="node-id">Acct E</span>
              </div>

              {/* SVG Edges / Flow Lines */}
              <svg className="network-svg">
                <line x1="30%" y1="24%" x2="68%" y2="24%" className="edge suspicious-edge" />
                <line x1="70%" y1="30%" x2="53%" y2="68%" className="edge suspicious-edge" />
                <line x1="45%" y1="68%" x2="28%" y2="30%" className="edge suspicious-edge" />
                <line x1="22%" y1="74%" x2="25%" y2="29%" className="edge normal-edge" />
                <line x1="76%" y1="74%" x2="73%" y2="29%" className="edge normal-edge" />
              </svg>
            </div>
          </div>
        </section>

        {/* Sophisticated Security Intelligence Alert Panel */}
        <section className="security-intelligence-panel">
          <div className="panel-status-indicator">
            <span className="pulse-dot"></span>
          </div>
          <div className="intelligence-content">
            <div className="intelligence-header-row">
              <span className="intelligence-badge">CRITICAL PATTERN DETECTED</span>
              <span className="intelligence-code">RULE_ID: CIR_LOOP_04</span>
            </div>
            <div className="intelligence-body-row">
              <p>
                <span className="highlight-val">3 accounts</span> connected in a circular transaction loop moving <span className="highlight-val">$1,900</span> suspicious flow across isolated network layers.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;