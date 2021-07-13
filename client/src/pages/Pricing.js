import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Pricing from "components/pricing/ThreePlans.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import FAQ from "components/faqs/SingleCol.js";

export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;
  return (
    <AnimationRevealPage disabled>
      <Header />
      <Pricing
        subheading={<Subheading>Pricing</Subheading>}
        heading={
          <>
            Reasonable <HighlightedText>Plans.</HighlightedText>
          </>
        }
        plans={[
          // {
          //   name: "Personal",
          //   price: "$17.99",
          //   duration: "Monthly",
          //   mainFeature: "For Individuals",
          //   features: ["30 Templates", "7 Landing Pages", "12 Internal Pages", "Basic Assistance"]
          // },
          {
            name: "Pro Plan",
            price: "$59.99",
            duration: "Life-Time",
            mainFeature: "Great Quality Tutorials",
            features: ["Include Images", "Written by talented people"],
            featured: true,
          },
          // {
          //   name: "Enterprise",
          //   price: "$57.99",
          //   duration: "Monthly",
          //   mainFeature: "For Large Companies",
          //   features: ["90 Templates", "27 Landing Pages", "37 Internal Pages", "Personal Assistance"]
          // }
        ]}
      />
      {/* <Testimonial
        heading="Our Paying Customers"
      />
      <FAQ />*/}
      <Footer />
    </AnimationRevealPage>
  );
};
