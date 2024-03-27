import { createClient, MicroCMSQueries } from 'microcms-js-sdk';  //ES6

const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN || "",
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "",

  // 以下、microcmsの強制キャッシュクリア
  customFetch: (input, init) => {
    if (typeof input === 'string') {
      const newInput = new URL(input)
      const time = new Date()
      newInput.searchParams.set('cacheclearparam', `${time.getMinutes()}`)
      return fetch(newInput.href, init)
    }
    return fetch(input, init)
  },

});


//  CMSで投稿した記事を全て取得する。
export const getBlogList = async () => {
  const blogList = await client.getList({
    endpoint: "blogs", // microcmsで作成したプロジェクトのエンドポイント
  })
  return blogList;
}

//  CMSで投稿した記事カテゴリーを全て取得する。
export const getCategoryList = async () => {
  const categoryList = await client.getList({
    endpoint: "categories", // カテゴリーのエンドポイント
  })
  return categoryList;
}

//  CMSで投稿した記事詳細を取得する。
export const getBlogDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailList = await client.getListDetail({
    endpoint: "blogs", // microcmsで作成したプロジェクトのエンドポイント
    contentId, // 個別のidを取得する
    queries, // 日付の取得に使用する
  })
  return detailList;
}

//  microCMSで作成したテンプレートページのリストを取得する。
export const getTemplate1List = async () => {
  const template1List = await client.getList({
    endpoint: "templatepages",
  })
  return template1List;
}

//  microCMSで作成したテンプレートページのAPI情報を取得する。
export const getTemplateDetail1 = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailList = await client.getListDetail({
    endpoint: 'templatepages',
    contentId,
    queries,
  })
  return detailList;
}
