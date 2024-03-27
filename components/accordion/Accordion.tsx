import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";

type AccordionProps = {
  text: string,
  title: string,
  img: string,
  img2: string
}

const AccordionStyle = styled.div`
@media screen and (min-width: 768px) {
  width: 30%;

  button {
    width: 100%;
    display: block;
    color: white;
    background-color: black;
    padding: 10px;
  }
  
  img{
    display: block;
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  width: 48%;

  button {
    width: 100%;
    display: block;
    color: white;
    background-color: black;
    padding: 10px;
  }
  
  img{
    display: block;
    width: 100%;
  }
}

@media screen and (max-width: 500px){
  width: 100%;
}


`




function Accordion({ text, title, img, img2 }: AccordionProps) {
  const [open, setOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight)
      }
    }

    // コンポーネントがマウントされた時とウィンドウのサイズが変更された時にコンテンツの高さを取得する
    handleResize(); // コンポーネントがマウントされた時に初回の高さ取得を行う
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const transformStyle: React.CSSProperties = {
    maxHeight: open ? `${contentHeight}px` : "0",
    opacity: open ? "1" : "0",
    transition: "max-height 0.3s, opacity 0.3s",
    border: "1px solid black",
  }

  return (
    <AccordionStyle>
      <button onClick={() => setOpen(!open)}>{title}</button>
      <div className="wap" style={{ overflow: "hidden" }}>
        <div style={transformStyle} ref={contentRef}>
          <div style={{ padding: "10px", }}>
            <img src={img} alt="" />
            {/* <Image src={img} width={500} height={0} alt="" /> */}
            <p>{text}</p>
            <img src={img2} alt="" />
            {/* <Image src={img2} width={500} height={0} alt="" /> */}
          </div>
        </div>
      </div>
    </AccordionStyle>
  )
}

export default Accordion


