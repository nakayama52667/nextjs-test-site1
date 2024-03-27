import Link from 'next/link';
import styled from "styled-components";
const MoreBtnStyle = styled.div`
 display: inline-block;
 width: 180px;

 a {
  background-color: #6A61FF;
  font-size: 16px;
  color: #fff;
  padding: 12px 7px;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 0.1s;

  &:hover {
    border: 1px solid #6A61FF;
    background-color: #fff;
    color: #6A61FF;
  }
 }
`

function MoreBtn({ url, text }: { url: string; text: string }) {
  return (
    <MoreBtnStyle>
      <Link href={{ pathname: url }} className="link">{text}</Link>
    </MoreBtnStyle>
  )
}

export default MoreBtn