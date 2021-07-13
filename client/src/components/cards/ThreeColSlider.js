import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { check } from "../../pages/IsSignedIn.js";
// import {parse, stringify} from 'flatted';
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`,
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;

// const runCheck = check();
// runCheck.then((response) => {
//   // console.log("This is from useEffect ", response.status);
//   return setState(response.status);
// });
export default () => {
  const history = useHistory();
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  /* Change this according to your needs */
  const cards = [
    {
      imageSrc:
        "https://media.gcflearnfree.org/global/topics/en/office-icon.svg",
      title: "Computer Basics",
      description:
        "This tutorial will help you understand how computers work and how to use them.",
      pricingText: "USD 59.99",
      rating: "4.8",
    },
    {
      imageSrc:
        "https://media.gcflearnfree.org/global/topics/en/email-icon.svg",
      title: "Basic Computer Skills",
      description:
        "Looking to learn basic computer skills or upgrade the skills you already have? You've come to the right place",
      locationText: "Ibiza, Spain",
      pricingText: "USD 59.99",
      rating: 4.9,
    },
    {
      imageSrc:
        "https://media.gcflearnfree.org/global/topics/en/internet-icon.svg",
      title: "Internet Basics",
      description:
        "In this tutorial, learn how to navigate, find and send files, use shortcuts, and do more in Windows",
      locationText: "Palo Alto, CA",
      pricingText: "USD 59.99",
      rating: "5.0",
    },
    {
      imageSrc:
        "https://media.gcflearnfree.org/global/topics/en/online-safety-icon.svg",
      title: "Windows Basics",
      description:
        "In this tutorial, improve your Internet skills so you can connect, use the cloud, download and upload files, and do more online.",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
  ];
  //<--------------------------------------Check if signed in--------------------------------------->
  const [state, setState] = useState(100);

  useEffect(() => {
    const runCheck = check();
    runCheck.then((response) => {
      // console.log("This is from useEffect ", response.status);
      return setState(response.status);
    });
  }, []);

  // console.log(state);

  const [buyText, setBuyText] = useState("Please login to Buy");

  useEffect(() => {
    if (state === 200) {
      setBuyText("Buy Now");
    }
  }, [state]);

  // else {
  //   setBuyText("Please login to Buy");
  // }

  //<<<<<<<<<<<<<<<<<#######################################______Stripe Payment Mathod 1________#########################>>>>>>>>>>>>>>>>>
  const [product, setProduct] = useState({
    name: "my course",
    price: 59,
    productBy: "Treact courses",
  });

  const [courseID, setCourseID] = useState("No course ID");
  console.log(courseID);

  const getCourseID = (e) => {
    const id = e.target.id;
    return setCourseID(id);
  };

  //<----------------------################ payment for C1 ------------------------------------------------->
  const makePayment = (token) => {
    const body = {
      token,
      product,
      courseID,
    };

    console.log("This is course ID", courseID);
    console.log("This is token", token);
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch("/backend/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log("Status", status);
        if (status === 200) {
          console.log("Payment successful");
          return history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // // const stripe = Stripe('pk_live_51IJ2aGFSQv1Tpw1NSSt22giRsEiLy6dOiUhiqFweMG2UigwWu242apRpUVmaYEaC1hPTqxt3g1DIGGLnLd60hbqr00BjOyFY04');
  // const stripePromise = loadStripe(
  //   "pk_live_51IJ2aGFSQv1Tpw1NSSt22giRsEiLy6dOiUhiqFweMG2UigwWu242apRpUVmaYEaC1hPTqxt3g1DIGGLnLd60hbqr00BjOyFY04"
  // );

  // // stripe.redirectToCheckout({
  // //   lineItems: [{
  // //     // Define the product and price in the Dashboard first, and use the price
  // //     // ID in your client-side code.
  // //     price: '{PRICE_ID}',
  // //     quantity: 1
  // //   }],
  // //   successUrl: 'https://www.example.com/success',
  // //   cancelUrl: 'https://www.example.com/cancel'
  // // });

  // const handleClick = async (event) => {
  //   // Get Stripe.js instance
  //   const stripe = await stripePromise;

  //   // Call your backend to create the Checkout Session
  //   const response = await fetch("http://localhost:5000/backend/payment", {
  //     method: "POST",
  //   });

  //   const session = await response.json();

  //   // When the customer clicks on the button, redirect them to Checkout.
  //   const result = await stripe.redirectToCheckout({
  //     sessionId: session.id,
  //   });

  //   if (result.error) {
  //     // If `redirectToCheckout` fails due to a browser or network
  //     // error, display the localized error message to your customer
  //     // using `result.error.message`.
  //   }
  // };

  //<<<<<<<<<<<<<<<<<#######################################______Stripe Payment Mathod 3________#########################>>>>>>>>>>>>>>>>>

  // const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>Courses</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}>
              <ChevronLeftIcon />
            </PrevButton>
            <NextButton onClick={sliderRef?.slickNext}>
              <ChevronRightIcon />
            </NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {/*<CardSlider>*/}
          <Card>
            <CardImage imageSrc="https://media.gcflearnfree.org/global/topics/en/office-icon.svg" />
            <TextInfo>
              <TitleReviewContainer>
                <Title>Computer Basics</Title>
                {/* <RatingsInfo>
                    <StarIcon />
                    <Rating>5</Rating>
                  </RatingsInfo>*/}
              </TitleReviewContainer>
              <SecondaryInfoContainer>
                <IconWithText>
                  {/*<IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>*/}
                </IconWithText>
                <IconWithText>
                  <IconContainer>
                    <PriceIcon />
                  </IconContainer>
                  <Text>59.99</Text>
                </IconWithText>
              </SecondaryInfoContainer>
              <Description>
                This tutorial will help you understand how computers work and
                how to use them.
              </Description>
            </TextInfo>
            <StripeCheckout
              name="Xplicit courses"
              description="Get best courses at Great Price"
              // image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
              stripeKey="pk_live_51IJ2aGFSQv1Tpw1NSSt22giRsEiLy6dOiUhiqFweMG2UigwWu242apRpUVmaYEaC1hPTqxt3g1DIGGLnLd60hbqr00BjOyFY04"
              token={makePayment}
            >
              <PrimaryButton onClick={getCourseID} id="course1ID">
                {buyText}
              </PrimaryButton>
            </StripeCheckout>
          </Card>
          <Card>
            <CardImage imageSrc="https://media.gcflearnfree.org/global/topics/en/email-icon.svg" />
            <TextInfo>
              <TitleReviewContainer>
                <Title>Basic Computer Skills</Title>
                {/* <RatingsInfo>
                    <StarIcon />
                    <Rating>5</Rating>
                  </RatingsInfo>*/}
              </TitleReviewContainer>
              <SecondaryInfoContainer>
                <IconWithText>
                  {/*<IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>*/}
                </IconWithText>
                <IconWithText>
                  <IconContainer>
                    <PriceIcon />
                  </IconContainer>
                  <Text>59.99</Text>
                </IconWithText>
              </SecondaryInfoContainer>
              <Description>
                Looking to learn basic computer skills or upgrade the skills you
                already have? You've come to the right place
              </Description>
            </TextInfo>
            <StripeCheckout
              name="Xplicit courses"
              description="Get best courses at Great Price"
              // image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
              stripeKey="pk_live_51IJ2aGFSQv1Tpw1NSSt22giRsEiLy6dOiUhiqFweMG2UigwWu242apRpUVmaYEaC1hPTqxt3g1DIGGLnLd60hbqr00BjOyFY04"
              token={makePayment}
            >
              <PrimaryButton>{buyText}</PrimaryButton>
            </StripeCheckout>
          </Card>
          <Card>
            <CardImage imageSrc="https://media.gcflearnfree.org/global/topics/en/internet-icon.svg" />
            <TextInfo>
              <TitleReviewContainer>
                <Title>Internet Basics</Title>
                {/* <RatingsInfo>
                    <StarIcon />
                    <Rating>5</Rating>
                  </RatingsInfo>*/}
              </TitleReviewContainer>
              <SecondaryInfoContainer>
                <IconWithText>
                  {/*<IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>*/}
                </IconWithText>
                <IconWithText>
                  <IconContainer>
                    <PriceIcon />
                  </IconContainer>
                  <Text>59.99</Text>
                </IconWithText>
              </SecondaryInfoContainer>
              <Description>
                In this tutorial, learn how to navigate, find and send files,
                use shortcuts, and do more in Windows
              </Description>
            </TextInfo>
            <StripeCheckout
              name="Xplicit courses"
              description="Get best courses at Great Price"
              // image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
              stripeKey="pk_live_51IJ2aGFSQv1Tpw1NSSt22giRsEiLy6dOiUhiqFweMG2UigwWu242apRpUVmaYEaC1hPTqxt3g1DIGGLnLd60hbqr00BjOyFY04"
              token={makePayment}
            >
              <PrimaryButton>{buyText}</PrimaryButton>
            </StripeCheckout>
          </Card>
          <Card>
            <CardImage imageSrc="https://media.gcflearnfree.org/global/topics/en/online-safety-icon.svg" />
            <TextInfo>
              <TitleReviewContainer>
                <Title>Windows Basics</Title>
                {/* <RatingsInfo>
                    <StarIcon />
                    <Rating>5</Rating>
                  </RatingsInfo>*/}
              </TitleReviewContainer>
              <SecondaryInfoContainer>
                <IconWithText>
                  {/*<IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>*/}
                </IconWithText>
                <IconWithText>
                  <IconContainer>
                    <PriceIcon />
                  </IconContainer>
                  <Text>59.99</Text>
                </IconWithText>
              </SecondaryInfoContainer>
              <Description>
                In this tutorial, improve your Internet skills so you can
                connect, use the cloud, download and upload files, and do more
                online.
              </Description>
            </TextInfo>
            <StripeCheckout
              name="Xplicit courses"
              description="Get best courses at Great Price"
              // image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
              stripeKey="pk_live_51IJ2aGFSQv1Tpw1NSSt22giRsEiLy6dOiUhiqFweMG2UigwWu242apRpUVmaYEaC1hPTqxt3g1DIGGLnLd60hbqr00BjOyFY04"
              token={makePayment}
            >
              <PrimaryButton>{buyText}</PrimaryButton>
            </StripeCheckout>
          </Card>
        </CardSlider>
      </Content>
    </Container>
  );
};
