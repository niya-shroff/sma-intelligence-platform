import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import { Activity, LayoutDashboard, BrainCircuit, TerminalSquare, Send } from 'lucide-react'
import './index.css'

const API_BASE = 'http://localhost:8000'

function App() {
  const [marketData, setMarketData] = useState([])
  const [signals, setSignals] = useState([])
  const [chatHistory, setChatHistory] = useState([
    { role: 'agent', content: 'SMA-Analyst-01 initialized. Monitoring S&P 500, NASDAQ, and Dow Jones parameters. How can I assist you?' }
  ])
  const [chatInput, setChatInput] = useState('')

  useEffect(() => {
    // Fetch mock data from our backend
    const fetchData = async () => {
      try {
        const marketRes = await axios.get(`${API_BASE}/market`)
        setMarketData(marketRes.data.data)

        const signalsRes = await axios.get(`${API_BASE}/signals`)
        setSignals(signalsRes.data.signals)
      } catch (error) {
        console.error("Error fetching data:", error)
        // Fallback mock data in case backend isn't running yet
        setMarketData(Array.from({length: 30}).map((_, i) => ({
          date: `2024-04-${i+1}`,
          close: 5000 + Math.random() * 200 - 100
        })))
        setSignals([
          { id: '1', type: 'Buy', outfit: '10/50/200', price: 5050.25, confidence: 0.92, symbol: 'SPX' },
          { id: '2', type: 'Hold', outfit: '20/100/250', price: 18000.5, confidence: 0.75, symbol: 'IXIC' },
        ])
      }
    }
    fetchData()
  }, [])

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMsg = chatInput
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }])
    setChatInput('')

    try {
      const res = await axios.post(`${API_BASE}/agents/chat`, { message: userMsg })
      setChatHistory(prev => [...prev, { role: 'agent', content: res.data.response }])
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'agent', content: 'Simulated response: The precision algorithm is currently optimizing. Please hold.' }])
    }
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <Activity size={24} />
          <span>SMA</span> Platform
        </div>
        <nav className="nav-links mt-8">
          <div className="nav-link active"><LayoutDashboard size={20} /> Dashboard</div>
          <div className="nav-link"><BrainCircuit size={20} /> Models</div>
          <div className="nav-link"><TerminalSquare size={20} /> Agents</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Intelligence Overview</h1>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success"></span> Data Feed: Active</span>
          </div>
        </header>

        <div className="grid-container">
          {/* Main Chart */}
          <div className="card animate-fade-in" style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}>
            <div className="card-header">
              <span>S&P 500 (SPX)</span>
              <span className="text-sm font-normal">30M / 10/50/200 Setup</span>
            </div>
            <div className="chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData}>
                  <defs>
                    <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="date" stroke="#94a3b8" tick={{fontSize: 12}} />
                  <YAxis domain={['auto', 'auto']} stroke="#94a3b8" tick={{fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="close" stroke="var(--accent-blue)" fillOpacity={1} fill="url(#colorClose)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Signal Stream */}
          <div className="card animate-fade-in" style={{ gridColumn: '2 / 3', gridRow: '1 / 3', animationDelay: '0.1s' }}>
            <div className="card-header">Live Signals</div>
            <div className="signal-list">
              {signals.map((sig, i) => (
                <div key={i} className={`signal-item ${sig.type.toLowerCase()}`}>
                  <div className="signal-info">
                    <span className={`signal-type ${sig.type.toLowerCase()}`}>{sig.type} {sig.symbol}</span>
                    <span className="signal-meta">{sig.outfit} • Conf: {(sig.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${sig.price.toFixed(2)}</div>
                    <div className="text-xs text-text-secondary">Just now</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Chat */}
          <div className="card animate-fade-in" style={{ gridColumn: '1 / 2', gridRow: '2 / 3', animationDelay: '0.2s', minHeight: '300px' }}>
            <div className="card-header">Research Agent</div>
            <div className="chat-container">
              <div className="chat-messages">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`chat-message ${msg.role}`}>
                    {msg.content}
                  </div>
                ))}
              </div>
              <form className="chat-input" onSubmit={handleChatSubmit}>
                <input 
                  type="text" 
                  placeholder="Ask about current SMA outfits or specific tickers..." 
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
  )
}

export default App
