import React from 'react'
import { createRoot } from 'react-dom/client'
import { Snp } from '../lib/index'

const root = createRoot(document.getElementById('app') as HTMLElement)

root.render(
  <React.StrictMode>
    <div style={{
      position: 'absolute',
      width: '60vw',
      height: '60vh',
      left: '20%',
      top: '20%',
      border: '1px solid',
    }}>
      <div style={{
        position: 'absolute',
        width: '50%',
        height: '50%',
        left: '10%',
        top: '10%',
        border: '1px solid green',
      }}>
        <Snp
          defaults={{
            width: 100,
            height: 100,
            x: '50%',
            y: '50%',
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
          }}
        >
          <div style={{ color: '#fff' }}>react-snp</div>
        </Snp>
      </div>
      
    </div>
  </React.StrictMode>
)
