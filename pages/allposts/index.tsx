import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import { getBlogList, getCategoryList } from '@/lib/client'
import Heading02 from '@/styles/components/Heading'
import BlogArea from '../../components/blogParts/BlogArea'
import Item from '../../components/blogParts/Item'
import styled from "styled-components";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'// reactTabsインポート
import Link from 'next/link'
import CategoryArea from '../../components/blogParts/CategoryArea'

// APIリクエスト。コンポーネントを呼び出す親のファイルで以下を記述
export async function getServerSideProps() { // GetServerSideProps の定義
  const blogList: any = await getBlogList();
  const categoryList: any = await getCategoryList();

  return {
    props: {
      blogList, // getBlogListからデータを取得
      categoryList // getCategoryListからデータを取得
    }
  };
}

function allposts({ blogList, categoryList }: any) {
  // console.log(categoryList.contents[0].id)
  const categorizedBlogs: any = {}
  categoryList.contents.forEach((blogCategory: any) => {
    const categoryId = blogCategory.id; // ブログのカテゴリーIDを取得
    categorizedBlogs[categoryId] = categoryList.contents.filter((blog: any) => blog.id === categoryId)// [categoryId]というキーを作る。キーの名前をcategoryIdに設定する
  })
  // console.log(categorizedBlogs)

  return (
    <>
      <Head>
        <title>記事一覧</title>
        <meta name="description" content="トップ記事一覧ページの説明文" />
      </Head>

      <Layout>
        <main>
          <Heading02>記事一覧</Heading02>
          <BlogArea blogList={blogList} />

          <Heading02 id="id1">タブ切り替え</Heading02>
          <p className="mb-5 text-center">以下はカテゴリーごとに記事を分けています。</p>

          <section>
            <Tabs>
              <TabList className="tabUl">
                {/* <Tab className="tabLi">更新情報</Tab>
                <Tab className="tabLi">テストです</Tab>
                <Tab className="tabLi">テクノロジー</Tab>
                <Tab className="tabLi">その他</Tab> */}

                {Object.entries(categorizedBlogs).map(([categoryId]) => { // Object.entries()メソッドはキー（プロパティ名）と値を返す。categoryId
                  // console.log(categoryId)
                  return (
                    <Tab key={categoryId} className="tabLi">
                      {categorizedBlogs[categoryId][0].name}{/* 各カテゴリーの１番目の記事を対象とし、その記事の「.category.name」を表示する */}
                    </Tab>
                  )
                })}
              </TabList>

              {Object.entries(categorizedBlogs).map(([categoryId]: any) => { // [categoryId, blogs]の「blogs」はブログの配列。mapで展開できる。

                const filteredBlogs = blogList.contents.filter((blog: any) => blog.category.id === categoryId);

                return (
                  <TabPanel key={categoryId} className="tabContent">
                    <h3 className="tabContentH3">{categorizedBlogs[categoryId][0].name}</h3>
                    <ul className="blogAreaInner">
                      {filteredBlogs.length === 0 && <p>記事が見つかりませんでした。</p>}
                      {filteredBlogs.map((blog: any) => {
                        return (
                          <Item blog={blog} key={blog.id} />
                        )
                      })}
                    </ul>
                  </TabPanel>
                )
              })}

            </Tabs>
          </section>

          <CategoryArea categoryList={categoryList} />

          {/* <CategoryAreaStyle>
            <div className="inner">
              <p>カテゴリー一覧</p>
              <ul>
                {Object.entries(categorizedBlogs).map(([categoryId]) => {
                  // console.log(categoryId)
                  return (
                    <li key={categoryId} className="li">
                      <Link href={`/allposts/${categoryId}`}>
                        {categorizedBlogs[categoryId][0].name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </CategoryAreaStyle> */}
        </main>
      </Layout>
    </>
  )
}

export default allposts

// // カテゴリーに一致するブログだけをフィルタリング
// const upDates = blogList.contents.filter(blog => blog.category.id === "1yy2kz57xup1") // カテゴリー名「更新情報」
// const tests = blogList.contents.filter(test => test.category.id === "hogdjv2shmz") // カテゴリー名「テストです」
// const technologies = blogList.contents.filter(technology => technology.category.id === "qmb_x43oxh") // カテゴリー名「テクノロジー」
// const others = blogList.contents.filter(other => other.category.id === "s7ez6d_32dxm") // カテゴリー名「その他」






export const CategoryAreaStyle = styled.section`
  background-color: rgb(241, 250, 255);
  padding: 20px;

  .inner {
    max-width: 1000px;
    width: 90%;
    margin: 0 auto;
  }
`