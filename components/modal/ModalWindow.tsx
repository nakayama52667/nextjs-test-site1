import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";

type TextModalContents = {
  img: string,
  title: string,
  text: string
}

type ImageModalContents = {
  img: string,
}

const TextModalContents = styled.div`
// PCデザイン
@media screen and (min-width: 769px) {
  display: flex;
  padding: 5%;
  height: 100%;
  overflow-Y: auto;
  position: relative;
  width: 80%;
  height: 80%;
  background-color: white;
  opacity: 1;
  margin: 0 auto;
  
  .close {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 1.8vw;
    right: 1.8vw;

    &:before ,&:after {
      content: "";
      width: 100%;
      height: 2px;
      background-color: #888;
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }

  .imgBox {
    margin-right: 30px;
    width: 50%;
    max-width: 500px;

    img {
      width:100%;
    }
  }
  
  .textBox {
    width: 50%;
    text-align: left;
    
    h2 {
      font-size:24px;
      font-weight: bold;
    }
  
    p {
      margin-top:20px;
      padding-bottom: 30px;
    }
  }
}

// SPデザイン
@media screen and (max-width: 768px) {
  padding: 5%;
  height: 100%;
  overflow-Y: auto;
  position: relative;
  width: 80%;
  height: 80%;
  background-color: white;
  opacity: 1;
  margin: 0 auto;

  img {
    width:100%;
  }

  h2 {
    font-size:24px;
    font-weight: bold;
    margin-top:20px;
  }

  p {
    margin-top:20px;
  }
}

`

const ImageModalContents = styled.div`
// PCデザイン
@media screen and (min-width: 769px) {
  width: 695px;
  margin: 0 auto;
  padding: 10px;
  background-color: white;
  position: relative;

  .close {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 25px;
    right: 20px;
    z-index: 1;

    &:before ,&:after {
      content: "";
      width: 100%;
      height: 2px;
      background-color: #888;
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }

  h2 {
    font-size: 26px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 7px;
  }

  .imgBox {
    position: relative;
    width: 100%;
    height: 500px;
  }
  img {
    display:block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

// SPデザイン
@media screen and (max-width: 768px) {
}

`

const ModalOpenImg = styled.div`
// PCデザイン
@media screen and (min-width: 769px) {

  height: 100%;

  img {
    display: block;
    height: 100%;
    object-fit: contain;
  }


}

// SPデザイン
@media screen and (max-width: 768px) {
}

`

export default function TextModalWindow({ img, title, text }: TextModalContents) {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => { setModalIsOpen(!modalIsOpen) }}>{title}</button>
      {modalIsOpen && (
        <>
          <div style={{ position: "fixed", zIndex: 100, top: "0", left: "0", width: "100%", height: "100vh", backgroundColor: "rgba(1,1,1,0.7)", display: "flex", justifyContent: "center", alignItems: "center", }} onClick={() => { setModalIsOpen(!modalIsOpen) }}>

            {/* 以下にコンテンツを用意する */}
            <TextModalContents onClick={() => { setModalIsOpen(!modalIsOpen) }}>
              <span className='close'></span>
              <div className="imgBox">
                <Image src={img} width={500} height={0} alt="" />
              </div>

              <div className='textBox'>
                <h2>{title}</h2>
                <p dangerouslySetInnerHTML={{ __html: text }} />{/* brなどを有効にする */}
              </div>
            </TextModalContents>

          </div>
          <style jsx global>{`body {overflow: hidden;}`}</style>
        </>

      )}

    </>
  )
}
export function ImageModalWindow({ img }: ImageModalContents) {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <ModalOpenImg>
        <Image src={img} onClick={() => { setModalIsOpen(!modalIsOpen) }} width={500} height={0} alt="" />
      </ModalOpenImg>
      {modalIsOpen && (
        <>
          <div style={{ position: "fixed", zIndex: 100, top: "0", left: "0", width: "100%", height: "100vh", backgroundColor: "rgba(1,1,1,0.7)", display: "flex", justifyContent: "center", alignItems: "center", }} onClick={() => { setModalIsOpen(!modalIsOpen) }}>

            {/* 以下にコンテンツを用意する */}
            <ImageModalContents style={{}} onClick={() => { setModalIsOpen(!modalIsOpen) }} >
              <span className='close'></span>
              <h2>タイトルタイトルタイトルタイトル</h2>
              <div className="imgBox">
                <Image src={img} width={500} height={0} alt="" />
              </div>
            </ImageModalContents>

          </div>
          <style jsx global>{`body {overflow: hidden;}`}</style>
        </>
      )}
    </>
  )
}

