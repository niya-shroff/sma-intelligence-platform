import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar
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
  const [activeTab, setActiveTab] = useState('master');
  const [marketData, setMarketData] = useState([]);
  const [signals, setSignals] = useState([]);
  const [ecoConditions, setEcoConditions] = useState([]);
  const [mlData, setMlData] = useState(null);
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

        const ecoRes = await axios.get(`${API_BASE}/economics`);
        setEcoConditions(ecoRes.data.conditions);

        const mlRes = await axios.post(`${API_BASE}/ml/predict`, { symbol: "SPY", features: {} });
        setMlData(mlRes.data);
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
            <span>SMA</span> Intelligence Platform
          </div>
        </div>
        <nav className="nav-menu">
          <a href="#" className={`nav-item ${activeTab === 'master' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('master'); }}><LayoutDashboard size={20} /> Master Control</a>
          <a href="#" className={`nav-item ${activeTab === 'algorithms' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('algorithms'); }}><Cpu size={20} /> Algorithms & Economics</a>
          <a href="#" className={`nav-item ${activeTab === 'dark_pools' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('dark_pools'); }}><ShieldAlert size={20} /> Dark Pools</a>
          <a href="#" className={`nav-item ${activeTab === 'neural_net' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('neural_net'); }}><BrainCircuit size={20} /> Neural Net</a>
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

        {activeTab === 'master' && (
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
        )}

        {activeTab === 'algorithms' && (
          <div className="bento-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="panel" style={{ gridColumn: '1 / 3' }}>
               <div className="panel-header">
                 <h2>Macroeconomic Environment</h2>
                 <InfoBlurb title="Economic Engine" text="Global economic factors influencing algorithmic trading decisions." />
               </div>
               <div className="outfits-list" style={{ flexDirection: 'row', gap: '20px', flexWrap: 'wrap' }}>
                 {ecoConditions.map((eco, i) => (
                   <div key={i} className="outfit-card" style={{ flex: 1, minWidth: '200px' }}>
                     <div className="outfit-name">{eco.indicator}</div>
                     <div className="outfit-values" style={{ fontSize: '1.2rem' }}>{eco.value}</div>
                     <div className={`outfit-status ${eco.status === 'Rising' || eco.status === 'Accelerating' ? 'positive' : eco.status === 'Stable' ? 'neutral' : 'negative'}`}>{eco.status}</div>
                   </div>
                 ))}
                 {ecoConditions.length === 0 && <div className="signal-desc">Loading economic conditions...</div>}
               </div>
            </div>
            
            <div className="panel chart-panel" style={{ gridColumn: '1 / 3', minHeight: '300px' }}>
                <div className="panel-header">
                  <h2>Economic Impact Simulation</h2>
                  <InfoBlurb title="Impact" text="How current economic conditions are expected to impact SMA moving averages." />
                </div>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={marketData.slice(0, 30)}>
                         <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                         <XAxis dataKey="date" stroke="#a3a3a3" tick={{fontSize: 11}} axisLine={false} tickLine={false} />
                         <YAxis stroke="#a3a3a3" tick={{fontSize: 11}} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                         <RechartsTooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }} />
                         <Bar dataKey="close" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'dark_pools' && (
          <div className="bento-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="panel signals-panel" style={{ gridColumn: '1 / 2', minHeight: '600px' }}>
              <div className="panel-header">
                <h2>Dark Pool Transaction Ledger</h2>
                <InfoBlurb title="Off-Exchange" text="Tracking massive institutional block trades hidden from retail exchanges. Look for massive accumulation clusters." />
              </div>
              <div className="signals-feed">
                {signals.length > 0 ? signals.map((sig, i) => (
                  <div key={i} className={`signal-item ${sig.type.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="signal-icon">
                      <ShieldAlert size={18} />
                    </div>
                    <div className="signal-details">
                      <div className="signal-title">{sig.type} <span>({sig.symbol})</span></div>
                      <div className="signal-desc">Volume: {Math.floor(sig.price * 100).toLocaleString()} • Block Conf: {(sig.confidence * 100).toFixed(0)}%</div>
                    </div>
                    <div className="signal-price">${(sig.price * 1.5).toFixed(2)}</div>
                  </div>
                )) : <div className="signal-desc">Scanning dark exchanges...</div>}
                
                {/* Simulated additional dark pool noise */}
                <div className="signal-item dark-pool">
                    <div className="signal-icon"><ShieldAlert size={18} /></div>
                    <div className="signal-details">
                      <div className="signal-title">Dark Pool Accumulation <span>(TSLA)</span></div>
                      <div className="signal-desc">Volume: 854,231 • Block Conf: 98%</div>
                    </div>
                    <div className="signal-price">$245.50</div>
                </div>
                <div className="signal-item dark-pool">
                    <div className="signal-icon"><ShieldAlert size={18} /></div>
                    <div className="signal-details">
                      <div className="signal-title">Off-Exchange Transfer <span>(NVDA)</span></div>
                      <div className="signal-desc">Volume: 1,204,500 • Block Conf: 99%</div>
                    </div>
                    <div className="signal-price">$850.25</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'neural_net' && (
          <div className="bento-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
             <div className="panel outfits-panel" style={{ gridColumn: '1 / 2' }}>
               <div className="panel-header">
                 <h2>Predictive Models</h2>
               </div>
               <div className="outfits-list">
                 <div className="outfit-card">
                    <div className="outfit-name">Target Asset</div>
                    <div className="outfit-values">{mlData?.symbol || 'SPY'}</div>
                    <div className="outfit-status positive">Tracking Active</div>
                 </div>
                 <div className="outfit-card">
                    <div className="outfit-name">Directional Bias</div>
                    <div className="outfit-values" style={{ fontSize: '1.2rem', color: mlData?.prediction === 'Up' ? '#10b981' : mlData?.prediction === 'Down' ? '#ef4444' : '#f59e0b' }}>
                      {mlData?.prediction || 'Analyzing'}
                    </div>
                    <div className="outfit-status neutral">Prob: {((mlData?.probability || 0) * 100).toFixed(1)}%</div>
                 </div>
                 <div className="outfit-card">
                    <div className="outfit-name">Active Engine</div>
                    <div className="outfit-values">XGBoost Ensemble</div>
                    <div className="outfit-status positive">Healthy</div>
                 </div>
               </div>
             </div>
             
             <div className="panel chat-panel" style={{ gridColumn: '2 / 3' }}>
               <div className="panel-header">
                 <h2>Neural Log</h2>
               </div>
               <div className="chat-area" style={{ background: '#050505', borderRadius: '8px', padding: '16px', border: '1px solid #262626' }}>
                 <div className="chat-messages" style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#10b981', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>&gt; Model {mlData?.model_version || 'v1.0-mock'} initialized.</div>
                    <div>&gt; Loading weights from institutional corpus...</div>
                    <div>&gt; Optimizing SMA outfit parameter grid...</div>
                    <div>&gt; Real-time inference online.</div>
                    <div>&gt; Latest inference: {mlData?.symbol} projected {mlData?.prediction?.toUpperCase()} @ {((mlData?.probability || 0) * 100).toFixed(1)}% confidence.</div>
                    <div className="pulse-dot" style={{ display: 'inline-block', marginTop: '10px' }}></div>
                 </div>
               </div>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;

