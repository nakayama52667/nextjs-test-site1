import { getTemplateDetail1 } from '@/lib/client'
import React from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import styled from "styled-components";

type templateDetail1 = {
  id: string,
  text1: string,
  text2: string,
  text3: string,
  text4: string,
  title: string,
  title1: string,
  title2: string,
  title3: string,
  img1: { url: string }
  img2: { url: string }
  img3: { url: string }
  img4: Array<{ url: string, height: number, width: number, id: string }>
}
interface TemplateProps {
  templateDetail1: templateDetail1
}

export async function getServerSideProps(context: any) { // GetServerSideProps の定義
  const params = context.params;
  const templateDetail1: any = await getTemplateDetail1(params.templatePage1); // テンプレートページ情報を取得

  return {
    props: {
      templateDetail1 // テンプレートページ情報
    }
  }
}

const TemplatePages1Style = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`

function TemplatePages1({ templateDetail1 }: TemplateProps) {
  return (
    <Layout>
      <main>
        <TemplatePages1Style>
          <h1>{templateDetail1.title}</h1>

          <Image src={templateDetail1.img1.url} width="500" height="0" alt="" />
          <h2>{templateDetail1.title1}</h2>
          {templateDetail1.text1}

          <Image src={templateDetail1.img2.url} width="500" height="0" alt="" />
          <h2>{templateDetail1.title2}</h2>
          {templateDetail1.text2}

          <Image src={templateDetail1.img3.url} width="500" height="0" alt="" />
          <h2>{templateDetail1.title3}</h2>
          {templateDetail1.text3}

          {templateDetail1.img4.map((img, index) => {
            return (
              <Image src={img.url} key={index} width="500" height="0" alt="" />
            )
          })}
          {templateDetail1.text4}
        </TemplatePages1Style>

      </main>
    </Layout>
  )

}

export default TemplatePages1
