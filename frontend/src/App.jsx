import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import { Activity, LayoutDashboard, BrainCircuit, TerminalSquare, Send, Info, Eye, ShieldAlert, Cpu } from 'lucide-react';
import './index.css';

const API_BASE = 'http://localhost:8000';

function InfoBlurb({ title, text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="info-blurb-wrapper" onMouseLeave={() => setIsOpen(false)}>
      <button className="info-icon" onClick={() => setIsOpen(!isOpen)} onMouseEnter={() => setIsOpen(true)}>
        <Info size={16} />
      </button>
      {isOpen && (
        <div className="info-tooltip">
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

function App() {
  const [marketData, setMarketData] = useState([]);
  const [signals, setSignals] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    { role: 'agent', content: 'SMA-Analyst-01 online. Monitoring specific SMA outfits like the S&P 10/50/200 system for Institutional Precision Buying.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marketRes = await axios.get(`${API_BASE}/market`);
        setMarketData(marketRes.data.data);

        const signalsRes = await axios.get(`${API_BASE}/signals`);
        setSignals(signalsRes.data.signals);
      } catch (error) {
        console.error("Backend offline, using fallback data.");
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatInput('');

    try {
      const res = await axios.post(`${API_BASE}/agents/chat`, { message: userMsg });
      setChatHistory(prev => [...prev, { role: 'agent', content: res.data.response }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'agent', content: 'Analyzing market conditions based on SMA configuration...' }]);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="brand">
          <Activity size={28} className="brand-icon" />
          <div className="brand-text">
            <span>SMA</span> Operations
          </div>
        </div>
        <nav className="nav-menu">
          <a href="#" className="nav-item active"><LayoutDashboard size={20} /> Master Control</a>
          <a href="#" className="nav-item"><Cpu size={20} /> Algorithms</a>
          <a href="#" className="nav-item"><ShieldAlert size={20} /> Dark Pools</a>
          <a href="#" className="nav-item"><BrainCircuit size={20} /> Neural Net</a>
        </nav>

        <div className="sidebar-education">
          <h4>Platform Guide</h4>
          <p>This platform visualizes how massive financial institutions use specific moving averages (SMAs) to operate the market.</p>
        </div>
      </aside>

      <main className="main-view">
        <header className="topbar">
          <div className="header-title">
            <h1>Institutional Intelligence Tracker</h1>
            <InfoBlurb 
              title="What is this?" 
              text="This dashboard models the 'Raul Analysis' which states that global wealth operators use specific sets of numbers (SMA Outfits) to trigger massive automated buying and selling in the stock market." 
            />
          </div>
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            System Live: Institutional Session
          </div>
        </header>

        <div className="bento-grid">
          
          {/* Main Chart */}
          <div className="panel chart-panel">
            <div className="panel-header">
              <h2>S&P 500 Simulation</h2>
              <InfoBlurb 
                title="The Core System" 
                text="The S&P 500 uses a 10/50/200 SMA configuration. When the 10-day average drops below the 50-day average, large institutions are often shorting the market. When it rises above, they trigger 'Precision Buying'." 
              />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData}>
                  <defs>
                    <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="date" stroke="#a3a3a3" tick={{fontSize: 11}} axisLine={false} tickLine={false} />
                  <YAxis domain={['auto', 'auto']} stroke="#a3a3a3" tick={{fontSize: 11}} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                    itemStyle={{ color: '#f5f5f5' }}
                  />
                  <Area type="monotone" dataKey="close" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#colorClose)" />
                  <Area type="monotone" dataKey="sma50" stroke="#fbbf24" strokeWidth={1.5} fillOpacity={0} />
                  <Area type="monotone" dataKey="sma200" stroke="#f87171" strokeWidth={1.5} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Outfits */}
          <div className="panel outfits-panel">
            <div className="panel-header">
              <h2>Active SMA Outfits</h2>
              <InfoBlurb 
                title="SMA Outfits" 
                text="These are specific number sequences used like passwords. For example, the Dow Jones strictly uses 30, 60, 90, 300, 600, 900 to dictate when to buy or sell." 
              />
            </div>
            <div className="outfits-list">
              <div className="outfit-card">
                <div className="outfit-name">S&P 500</div>
                <div className="outfit-values">10 / 50 / 200</div>
                <div className="outfit-status positive">Active Buying</div>
              </div>
              <div className="outfit-card">
                <div className="outfit-name">NASDAQ</div>
                <div className="outfit-values">20 / 100 / 250</div>
                <div className="outfit-status neutral">Consolidating</div>
              </div>
              <div className="outfit-card">
                <div className="outfit-name">Dow Jones</div>
                <div className="outfit-values">30 / 60 / 90 / 300 / 600 / 900</div>
                <div className="outfit-status negative">Short Triggered</div>
              </div>
            </div>
          </div>

          {/* Signal Stream */}
          <div className="panel signals-panel">
            <div className="panel-header">
              <h2>Institutional Activity</h2>
              <InfoBlurb 
                title="Market Operations" 
                text="'Precision Buying Algorithms' are bots that buy exactly at certain SMA numbers to move the market. 'Dark Pools' are private exchanges used to hide these massive trades from the public." 
              />
            </div>
            <div className="signals-feed">
              {signals.map((sig, i) => (
                <div key={i} className={`signal-item ${sig.type.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="signal-icon">
                    <Eye size={18} />
                  </div>
                  <div className="signal-details">
                    <div className="signal-title">{sig.type} <span>({sig.symbol})</span></div>
                    <div className="signal-desc">Trigger: {sig.outfit} • Conf: {(sig.confidence * 100).toFixed(0)}%</div>
                  </div>
                  <div className="signal-price">${sig.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Chat */}
          <div className="panel chat-panel">
            <div className="panel-header">
              <h2>AI Market Analyst</h2>
              <InfoBlurb 
                title="AI Analyst" 
                text="Ask this agent about what the current moving averages mean. It analyzes the market pretending to be the institutional algorithms." 
              />
            </div>
            <div className="chat-area">
              <div className="chat-messages">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`chat-bubble ${msg.role}`}>
                    {msg.content}
                  </div>
                ))}
              </div>
              <form className="chat-input-wrapper" onSubmit={handleChatSubmit}>
                <input 
                  type="text" 
                  placeholder="Ask about Dark Pools or Precision Buying..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit"><Send size={18} /></button>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
