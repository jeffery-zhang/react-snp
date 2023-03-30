import React from 'react'
import { createRoot } from 'react-dom/client'
import { Snp } from '../lib/index'

const root = createRoot(document.getElementById('app') as HTMLElement)

root.render(
  <React.StrictMode>
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Snp
        defaults={{
          width: 200,
          height: 200,
          x: 100,
          y: 100,
        }}
        style={{
          backgroundColor: 'blue',
        }}
      >
        <div>react-snp</div>
      </Snp>
    </div>
  </React.StrictMode>
)
