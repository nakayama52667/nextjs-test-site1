import Head from 'next/head'
import React from 'react'
import Layout from '../components/Layout'

function contact() {
  return (
    <>
      <Head>
        <title>お問い合わせページタイトル</title>
        <meta name="description" content="お問い合わせページの説明文" />
      </Head>

      <Layout>
        <main>
          <h2>お問い合わせ</h2>
        </main>
      </Layout>
    </>
  )
}

export default contact