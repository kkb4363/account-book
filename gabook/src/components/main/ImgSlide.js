import styled, { keyframes } from "styled-components";
import { flexCenter } from "../../styled/styled";
import img1 from "../../images/img1.jpg";
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg";
import img4 from "../../images/img4.jpg";
import img5 from "../../images/bg.png";
import { useEffect, useState } from "react";

const imgs = [
  {
    src: img1,
  },
  {
    src: img2,
  },
  {
    src: img3,
  },
  {
    src: img4,
  },
  {
    src: img5,
  },
];

const ImgSlide = () => {
  return (
    <ImgSlideLayout>
      <img src={imgs[2].src} alt="loading..." width={"100%"} height={"100%"} />
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
