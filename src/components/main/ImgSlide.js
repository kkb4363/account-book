import styled from "styled-components";
import img from "../../images/bg.webp";
import { flexCenter } from "../../styled/styled";

const ImgSlide = () => {
  return (
    <ImgSlideLayout>
      <img src={img} alt="bg." width={"100%"} height={"100%"} />
    </ImgSlideLayout>
  );
};

export default ImgSlide;

const ImgSlideLayout = styled.div`
  ${flexCenter};
  position: absolute;
  inset: 0;
  margin: 0 auto;
  z-index: -1;
`;
