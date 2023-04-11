import React from 'react'
import { createRoot } from 'react-dom/client'
import { Snp } from '../lib'

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
        width: '70%',
        height: '70%',
        left: '10%',
        top: '10%',
        border: '1px solid green',
      }}>
        <Snp
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          initial={{
            x: '33%',
            y: '33%',
            w: '30%',
            h: '30%',
          }}
          enableResize='vertical'
          enableMove='disabled'
          moveCallbacks={{
            moveStartCallback: () => {
              console.log('start move')
            },
          }}
          resizeCallbacks={{
            resizeStartCallback(w, h) {
              console.log(w, h)
            },
          }}
          boundaries={{
            left: 30,
            right: -30,
            top: 0,
            bottom: 20,
          }}
          rectLimits={{
            minW: 250,
            minH: 'auto',
            maxW: 300,
            maxH: 800,
          }}
        >
          <div style={{ color: '#fff', background: '#aaa', padding: 10 }}>react-snp</div>
          <div style={{ color: '#fff', background: '#aaa', padding: 10 }}>example</div>
        </Snp>
      </div>
      
    </div>
  </React.StrictMode>
)
