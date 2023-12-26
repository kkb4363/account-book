import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { styled } from "styled-components";
import PlusIcon from "../components/common/PlusIcon";
import ImgSlide from "../components/main/ImgSlide";
import useAddHistory from "../hooks/useAddHistory";
import { flexCenter, flexColumn, fullScreen } from "../styled/styled";
import MenubarIcon from "../components/common/MenubarIcon";

const mainText = [
  {
    title: "GABook",
  },
  {
    title: "누구나 간편하게 사용가능한 가게부 웹사이트입니다",
  },
  {
    title: "데이터는 로컬스토리지에 저장됩니다.",
  },
  {
    title: "따라서 인터넷 사용기록을 지우게 되면 데이터가 삭제되니 주의해주세요.",
  },
];

const Main = () => {
  const { open, handleToggle, openItems } = useAddHistory();

  return (
    <MainLayout>
      <Head>
        <MenubarIcon handleToggle={handleToggle} />
      </Head>

      <ImgSlide />

      <MainText>
        {mainText.map((item, idx) => (
          <span key={"maintextkey=" + idx}>{item.title}</span>
        ))}
      </MainText>

      <PlusIcon onClick={() => handleToggle("addMoney")} />

      {openItems.map(
        (item, idx) =>
          open[item.condition] && (
            <React.Fragment key={"opendataskey" + idx}>{item.data}</React.Fragment>
          )
      )}
    </MainLayout>
  );
};

export default Main;

const Head = styled.div`
  width: inherit;
  height: 10vh;
  ${flexCenter};
  position: relative;

  & > div {
    right: 3vw;
    position: absolute;
  }
`;

const MainLayout = styled.div`
  ${fullScreen};
  ${flexColumn};
  position: relative;
`;

const MainText = styled.div`
  width: 50%;
  @media screen and (max-width: 500px) {
    width: 100%;
  }

  height: 80%;
  ${flexCenter};
  flex-direction: column;
  margin-bottom: 0;
  gap: 5px;

  color: white;
  font-weight: ${({ theme }) => theme.weight.xxl};
  span:first-child {
    font-size: 2rem;
  }
  span:last-child {
    font-size: ${({ theme }) => theme.weight.xl};
  }
`;
