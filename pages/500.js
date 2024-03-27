import React from 'react'
import Layout from '../components/Layout'

function Not500() {
  return (
    <Layout>
      <main>
        <div className="inner">
          <div className='vh60'>
            <p className="not404Text1">ページが見つかりませんでした。</p>
            <p className="not404Text2">Not500</p>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Not500