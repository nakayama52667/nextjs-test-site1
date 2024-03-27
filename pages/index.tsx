import { Inter } from "next/font/google";
import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import BlogArea from "../components/blogParts/BlogArea";
import { getBlogList } from '@/lib/client';
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Heading02 from "@/styles/components/Heading";
import MoreBtn from "../components/button/MoreBtn";
import Accordion from "../components/accordion/Accordion";
import TextModalWindow, { ImageModalWindow } from "../components/modal/ModalWindow";
import Parallax from "../components/parallax/Parallax";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Fade from "../components/fade/fade";

// publicフォルダの画像。swiperで表示させる。
const images = [
  "/img/sampleImg1.jpg",
  "/img/sampleImg2.jpg",
  "/img/sampleImg3.jpg",
  "/img/sampleImg4.jpg",
  "/img/sampleImg5.jpg",
];
// swiper
export const SlideSection = () => {
  // ブレイクポイントに基づいて1つのスライドに表示するスライドの数を指定
  const slideSettings = {
    0: { // SPは下記が適用
      slidesPerView: 1, // 横幅一杯
      spaceBetween: 0, // 画像と画像の余白
    },
    768: { //768px以上で以上で下記が適用
      slidesPerView: 1.3, // 横幅を少し見切れて表示させる。
      spaceBetween: 10, // 画像と画像の余白
    },
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={slideSettings} // slidesPerViewを指定
      slidesPerView={"auto"} // ハイドレーションエラー対策
      centeredSlides={true} // スライドを中央に配置
      loop={true} // スライドをループさせる
      speed={1000} // スライドが切り替わる時の速度
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }} // スライド表示時間
      navigation // ナビゲーション（左右の矢印）
      pagination={{
        clickable: true,
      }} // ページネーション, クリックで対象のスライドに切り替わる
      className="slideWrapper"
    >
      {images.map((src: string, index: number) => (
        <SwiperSlide key={index}>
          <Image
            src={src /* 配列「images」の画像を取ってくる */}
            width={1920}
            height={0}
            alt="Slider Image"
            className="slideImage"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const inter = Inter({ subsets: ["latin"] });

// MicroCMSでブログ記事を取得するリクエスト関数を呼び出す。コンポーネントを呼び出す親のファイルで以下を記述
export async function getServerSideProps() { // GetServerSideProps の定義
  const blogList: any = await getBlogList();
  // const template1List = await getTemplate1List();

  return {

    props: {
      blogList,
      // template1List
    }
  }
}



export default function Home({ blogList }: any) {
  return (
    <>
      <Head>
        <title>トップページタイトル</title>
        <meta name="description" content="トップページの説明ページの説明文" />
      </Head>

      <Layout>
        <main>
          <SlideSection />

          <Heading02>記事一覧</Heading02>
          <BlogArea blogList={blogList} />
          <div className="text-center mt-14"><MoreBtn url={`/allposts`} text={"記事一覧"} /></div>

          <Heading02>アコーディオン</Heading02>
          <section className="flex flex-wrap justify-between inner">
            <Accordion title={"アコーディオン1"} text={"あああああああああああああ"} img={"/img/dummy1.jpg"} img2={"/img/dummy1.jpg"} />
            <Accordion title={"アコーディオン2"} text={"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまむむめもあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまむむめもあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまむむめもあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまむむめも。"} img={""} img2={""} />
            <Accordion title={"アコーディオン3"} text={"ううううううううううううう"} img={""} img2={"/img/dummy1.jpg"} />
          </section>

          <Heading02>テキストモーダル</Heading02>
          <ul className="text-center">
            <li>
              <TextModalWindow
                title={"テキストモーダルタイトル１"}
                text={
                  "テキストが入ります。テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。<br />テキストが入ります。" +
                  "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。<br />"
                }
                img={"/img/sampleImg1.jpg"}
              />
            </li>

            <li>
              <TextModalWindow
                title={"テキストモーダルタイトル２"}
                text={
                  "テキストが入ります。テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。テキストが入ります。<br />" +
                  "テキストが入ります。テキストが入ります。<br />"
                }
                img={"/img/sampleImg2.jpg"}
              />
            </li>
          </ul>

          <Heading02>イメージモーダル</Heading02>
          <div className="modalArea">
            <div className="modalItem">
              <ImageModalWindow img={"/img/sampleImg5.jpg"} />
            </div>
            <div className="modalItem">
              <ImageModalWindow img={"/img/sampleImg6.jpg"} />
            </div>
          </div>

          <Heading02>フェードアニメーション</Heading02>
          <div className="width90">
            <Fade delay={"0s"} fade={"up"}>
              <div className="fadeBox">
                あああ
              </div>
            </Fade>
            <br /><br /><br />
            <Fade delay={"0s"} fade={"down"}>
              <div className="fadeBox">
                あああ
              </div>
            </Fade>
            <br /><br /><br />
            <Fade delay={"0s"} fade={"left"}>
              <div className="fadeBox">
                あああ
              </div>
            </Fade>
            <br /><br /><br />
            <Fade delay={"0s"} fade={"right"}>
              <div className="fadeBox">
                あああ
              </div>
            </Fade>
          </div>

          <ul className="fadeArea">
            <li>
              <Fade delay={"0s"} fade={"up"}>
                <div className="imgBox">
                  <Image src="/img/sampleImg1.jpg" width={500} height={0} alt="" />
                </div>
                <div className="textBox">
                  <p>テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。</p>
                </div>
              </Fade>
            </li>
            <li>
              <Fade delay={"0.5s"} fade={"up"}>
                <div className="imgBox">
                  <Image src="/img/sampleImg1.jpg" width={500} height={0} alt="" />
                </div>
                <div className="textBox">
                  <p>テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。</p>
                </div>
              </Fade>
            </li>
            <li>
              <Fade delay={"1s"} fade={"up"}>
                <div className="imgBox">
                  <Image src="/img/sampleImg1.jpg" width={500} height={0} alt="" />
                </div>
                <div className="textBox">
                  <p>テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。</p>
                </div>
              </Fade>
            </li>
            <li>
              <Fade delay={"1.5s"} fade={"up"}>
                <div className="imgBox">
                  <Image src="/img/sampleImg1.jpg" width={500} height={0} alt="" />
                </div>
                <div className="textBox">
                  <p>テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。</p>
                </div>
              </Fade>
            </li>
            <li>
              <Fade delay={"2s"} fade={"up"}>
                <div className="imgBox">
                  <Image src="/img/sampleImg1.jpg" width={500} height={0} alt="" />
                </div>
                <div className="textBox">
                  <p>テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。</p>
                </div>
              </Fade>
            </li>
          </ul>

          <Link href="/allposts/#id1" className="block m-16 text-center">記事一覧ページのタブへ</Link>

          <Parallax bgImage={"/img/sampleImg3.jpg"} width={"100%"} height={"auto"}>
            <Heading02>パララックス</Heading02>
            <Heading02>パララックス</Heading02>
            <Heading02>パララックス</Heading02>
            <Heading02>パララックス</Heading02>
          </Parallax>

          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
        </main>
      </Layout>
    </>
  )
}