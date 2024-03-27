import React, { useEffect, useRef, useState } from 'react';

// GSAP のインポート
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

// ScrollTriggerの初期化
gsap.registerPlugin(ScrollTrigger);

function Parallax({ children, bgImage, width, height }: any) {
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current;

    // 中身の高さを取得
    if (ref.current) {
      setContentHeight(ref.current.scrollHeight)
    }

    if (element) {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 15%',
          end: "top -200%",// ネガティブ値を上げるほど終わりが遅くなる
          scrub: true, // スクロールに応じてアニメーションさせる
        },
        // opacity: 1,
        // duration: 2,
        y: '60%',
      });
    }
  }, []);

  return (
    <>
      <div className="parallaxWrap">
        <div className="bgImg" ref={ref}>
        </div>
        {children}

      </div>
      <style jsx>{`
        .parallaxWrap {
          overflow: hidden;
          position: relative;
          width: ${width};
          height: ${height === "auto" ? `${contentHeight}px` : height};
        }
        .bgImg {
          background-image: url(${bgImage});
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          width: 100%;
          height: 120%;
          position: absolute;
          bottom: ${contentHeight !== null ? contentHeight * 0.3 : 0}px;
          left: 0;
        }
        .contents{
          position: relative;
          z-index: 1;
        }
     `}</style>
    </>
  )
}

export default Parallax