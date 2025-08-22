import React from 'react'
import './Hello.css'

const Hello = () => {
  return (
    <div className="hello-container">
      <h2 className="hello-title">Hello!</h2>
      <p className="hello-message">
        ยินดีต้อนรับสู่ React App ที่สร้างด้วย Vite
      </p>
      <div className="hello-features">
        <div className="feature">
          <span className="feature-icon">⚡</span>
          <span>Fast Development</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🔥</span>
          <span>Hot Module Replacement</span>
        </div>
        <div className="feature">
          <span className="feature-icon">📦</span>
          <span>Optimized Build</span>
        </div>
      </div>
    </div>
  )
}

export default Hello
