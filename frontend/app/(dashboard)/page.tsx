'use client'

import {
  ArrowUpRight,
  DollarSign,
  PackageCheck,
  ShoppingBag,
  TrendingUp,
  Users,
} from 'lucide-react'

const statCards = [
  {
    label: 'Gross sales',
    value: '$24.8k',
    change: '+12.5%',
    detail: 'vs last week',
    icon: <DollarSign size={18} />,
  },
  {
    label: 'Orders',
    value: '842',
    change: '+8.1%',
    detail: 'today',
    icon: <ShoppingBag size={18} />,
  },
  {
    label: 'Customers',
    value: '384',
    change: '+6.3%',
    detail: 'new',
    icon: <Users size={18} />,
  },
  {
    label: 'Inventory',
    value: '93%',
    change: 'Healthy',
    detail: 'stock level',
    icon: <PackageCheck size={18} />,
  },
]

const salesRows = [
  { invoice: '#1042', customer: 'Mary James', amount: '$320.00', status: 'Completed' },
  { invoice: '#1043', customer: 'Lucas Hart', amount: '$180.50', status: 'Pending' },
  { invoice: '#1044', customer: 'Amber Reed', amount: '$540.25', status: 'Completed' },
  { invoice: '#1045', customer: 'Noah Kim', amount: '$275.90', status: 'Completed' },
]

const tasks = [
  { text: 'Stock check for electronics', tag: 'On track', tone: 'success' },
  { text: 'Call inactive customers', tag: '3 left', tone: 'warning' },
  { text: 'Review weekly sales summary', tag: 'Done', tone: 'success' },
]

const actions = [
  { label: 'Create new sale', detail: 'Open checkout', tone: 'primary' },
  { label: 'Add product', detail: 'Inventory update', tone: 'secondary' },
  { label: 'Generate report', detail: 'Export summary', tone: 'neutral' },
]

export default function DashboardRootPage() {
  return (
    <>
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="hero-kicker">Today overview</p>
          <h2>Retail performance is strong.</h2>
          <p>Revenue is up 18% compared to last week across your top stores.</p>
        </div>

        <div className="hero-actions">
          <button className="hero-btn ghost">Download report</button>
          <button className="hero-btn">View reports</button>
        </div>
      </section>

      <div className="stats-grid">
        {statCards.map(({ label, value, change, detail, icon }) => (
          <div key={label} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon">{icon}</div>
              <span className="stat-chip">{change}</span>
            </div>
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-meta">{detail}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="content-panel chart-panel">
          <div className="panel-head">
            <h3 className="panel-title">Sales trend</h3>
            <button className="mini-link">This week</button>
          </div>

          <div className="chart-wrap" aria-label="Sales trend chart">
            {[52, 72, 64, 98, 86, 120, 110].map((height, index) => (
              <div key={index} className="chart-col">
                <span className="chart-bar" style={{ height: `${height}%` }} />
              </div>
            ))}
          </div>

          <div className="chart-labels">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>

        <div className="content-panel">
          <h3 className="panel-title">Priority tasks</h3>
          <ul className="todo-list">
            {tasks.map(({ text, tag, tone }) => (
              <li key={text} className="todo-item">
                <span className="task-label">
                  <span className="dot" />
                  {text}
                </span>
                <span className={`status-tag ${tone === 'warning' ? 'status-pending' : 'status-completed'}`}>
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel-grid">
        <div className="content-panel">
          <div className="panel-head">
            <h3 className="panel-title">Recent sales</h3>
            <button className="mini-link">View all</button>
          </div>

          <table className="sales-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {salesRows.map((sale) => (
                <tr key={sale.invoice}>
                  <td>{sale.invoice}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.amount}</td>
                  <td>
                    <span className={`status-tag ${sale.status === 'Pending' ? 'status-pending' : 'status-completed'}`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="content-panel">
          <div className="panel-head">
            <h3 className="panel-title">Quick actions</h3>
            <span className="mini-link success-pill">
              <TrendingUp size={14} />
              Live
            </span>
          </div>

          <div className="quick-actions">
            {actions.map(({ label, detail, tone }) => (
              <button key={label} className={`action-item ${tone}`}>
                <span className="action-copy">
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </span>
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
