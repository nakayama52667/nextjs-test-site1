import { getBlogList, getCategoryList } from '@/lib/client';
import Layout from '@/components/Layout';
import CategoryArea from '@/components/blogParts/CategoryArea';
import Item from '@/components/blogParts/Item';
import Head from 'next/head';
import { useRouter } from "next/router";
import styled from "styled-components";

export const CategoryPageStyle = styled.section`
  .catch {
    background-color: #6A61FF;
    padding: 30px 0;
    margin-bottom: 50px;
  }
  .h1 {
    font-size: 30px;
    color: #fff;
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
  }
`

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

function Category({ blogList, categoryList }: any) {

  const router = useRouter(); // useRouterを利用して現在のURLを取得
  const filteredBlogs = blogList.contents.filter((blog: any) => blog.category.id === router.query.category) // 「router.query.category」の「category」はディレクトリ名[category]と依存関係にある。
  const filteredCategoryNames = categoryList.contents.filter((category: any) => category.id === router.query.category)

  return (
    <>
      <Head>
        <title>{filteredCategoryNames[0].name}</title>
        <meta name="description" content={`microcmsでディスクリプション用のスキーマを作成してコードを埋め込んでも良いですし、本文から抜粋もあり`} />
      </Head>
      <Layout>
        <main>
          <CategoryPageStyle>
            <div className="catch">
              <h1 className='h1'>{filteredCategoryNames[0].name}</h1>
            </div>
            <ul className="blogAreaInner">
              {filteredBlogs.length === 0 && <p>記事が見つかりませんでした。</p>}
              {filteredBlogs.map((blog: any) => {
                return (
                  <>
                    <Item blog={blog} key={blog.id} />
                  </>
                )
              })}
            </ul>

          </CategoryPageStyle>
        </main>

        <CategoryArea categoryList={categoryList} />
      </Layout>
    </>
  )
}

export default Category