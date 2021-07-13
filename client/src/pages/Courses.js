import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Features from "components/features/ThreeColSimple.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";
import SliderCard from "components/cards/ThreeColSlider.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
  return (
    <AnimationRevealPage disabled>
      <Header />
      <SliderCard />
      <Footer />
    </AnimationRevealPage>
  );
};
