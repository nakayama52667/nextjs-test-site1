import Link from 'next/link';
import styled from "styled-components";


export const CategoryAreaStyle = styled.section`
  background-color: rgb(241, 250, 255);
  padding: 20px;
  margin-top: 80px;

  .inner {
    max-width: 1000px;
    width: 90%;
    margin: 0 auto;
  }

  .categoryAllTitle {
    font-size: 20px;
  }

  .ul {
    margin-top: 7px;
  }

  .li {
    font-size: 16px;
    padding-left: 25px;

    a {
      &:hover {
        opacity: 0.5;
      }
    }
  }
`


function CategoryArea({ categoryList }: any) {

  return (
    <CategoryAreaStyle>
      <div className="inner">
        <p className="categoryAllTitle">カテゴリー一覧</p>
        <ul className='ul'>
          {categoryList && categoryList.contents && categoryList.contents.map((category: any) => { // Object.entry()メソッドはキー（プロパティ名）と値を返す。categoryId
            return (
              <li key={category.id} className="li">
                <Link href={`/allposts/${category.id}`}>{category.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </CategoryAreaStyle>
  )
}

export default CategoryArea