import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React, { useState, useEffect } from "react";
import BackToTop from "components/BackToTop/BackToTop.js";
import { css } from "styled-components/macro"; //eslint-disable-line
/*
 * This is the entry point component of this project. You can change the below exported default App component to any of
 * the prebuilt landing page components by uncommenting their import and export lines respectively.
 * See one of the landing page components to better understand how to import and render different components (Always
 * make sure if you are building your own page, the root component should be the AnimationRevealPage component. You can
 * disable the animation by using the disabled prop.
 *
 * The App component below is using React router to render the landing page that you see on the live demo website
 * and the component previews.
 *
 */

/* Use AnimationRevealPage as a wrapper component for your pages if you are building a custom one yourself */
// import AnimationRevealPage from "helpers/AnimationRevealPage.js";

/*
 * Hero section is the top most section on the page. It contains the header as well.
 * So you dont need to import headers
 * separately
 */

// import Hero from "components/hero/TwoColumnWithVideo.js";
// import Hero from "components/hero/TwoColumnWithInput.js";
// import Hero from "components/hero/TwoColumnWithFeaturesAndTestimonial.js";
// import Hero from "components/hero/TwoColumnWithPrimaryBackground.js";
// import Hero from "components/hero/FullWidthWithImage.js";
// import Hero from "components/hero/BackgroundAsImage.js";
// import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";

// import Features from "components/features/ThreeColSimple.js";
// import Features from "components/features/ThreeColWithSideImage.js";
// import Features from "components/features/ThreeColWithSideImageWithPrimaryBackground.js";
// import Features from "components/features/VerticalWithAlternateImageAndText.js";
// import Features from "components/features/DashedBorderSixFeatures";
// import MainFeature from "components/features/TwoColWithButton.js";
// import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
// import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
// import MainFeature from "components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
// import FeatureWithSteps from "components/features/TwoColWithSteps.js";
// import FeatureStats from "components/features/ThreeColCenteredStatsPrimaryBackground.js";

// import Pricing from "components/pricing/ThreePlans.js";
// import Pricing from "components/pricing/ThreePlansWithHalfPrimaryBackground.js";
// import Pricing from "components/pricing/TwoPlansWithDurationSwitcher.js";

// import SliderCard from "components/cards/ThreeColSlider.js";
// import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";
// import Portfolio from "components/cards/PortfolioTwoCardsWithImage.js";
// import TabGrid from "components/cards/TabCardGrid.js";

// import Blog from "components/blogs/ThreeColSimpleWithImage.js";
// import Blog from "components/blogs/ThreeColSimpleWithImageAndDashedBorder.js";
// import Blog from "components/blogs/PopularAndRecentBlogPosts.js";
// import Blog from "components/blogs/GridWithFeaturedPost.js";

// import Testimonial from "components/testimonials/TwoColumnWithImage.js";
// import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
// import Testimonial from "components/testimonials/TwoColumnWithImageAndRating.js";
// import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
// import Testimonial from "components/testimonials/SimplePrimaryBackground.js";

// import FAQ from "components/faqs/SimpleWithSideImage.js";
// import FAQ from "components/faqs/SingleCol.js";
// import FAQ from "components/faqs/TwoColumnPrimaryBackground.js";

// import ContactUsForm from "components/forms/SimpleContactUs.js";
// import ContactUsForm from "components/forms/TwoColContactUsWithIllustration.js";
// import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
//
// import GetStarted from "components/cta/GetStarted.js";////////////
// import GetStarted from "components/cta/GetStartedLight.js";
// import DownloadApp from "components/cta/DownloadApp.js";

// import Footer from "components/footers/SimpleFiveColumn.js";
// import Footer from "components/footers/FiveColumnWithInputForm.js";
// import Footer from "components/footers/FiveColumnWithBackground.js";
// import Footer from "components/footers/FiveColumnDark.js";
// import Footer from "components/footers/MiniCenteredFooter.js";

/* Ready Made Pages (from demos folder) */
// import EventLandingPage from "demos/EventLandingPage.js";
// import HotelTravelLandingPage from "demos/HotelTravelLandingPage.js";
// import AgencyLandingPage from "demos/AgencyLandingPage.js";
import SaaSProductLandingPage from "demos/SaaSProductLandingPage.js";
// import RestaurantLandingPage from "demos/RestaurantLandingPage.js";
// import ServiceLandingPage from "demos/ServiceLandingPage.js";
// import HostingCloudLandingPage from "demos/HostingCloudLandingPage.js";

/* Inner Pages */
import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
// import PricingPage from "pages/Pricing.js";
import AboutUsPage from "pages/AboutUs.js";
import ContactUsPage from "pages/ContactUs.js";
// import BlogIndexPage from "pages/BlogIndex.js";
import CoursesPage from "pages/Courses.js";
//########################################################################################################
import { check, getCourses } from "pages/IsSignedIn.js";

//###############################################################################################\\\\\\\\\\\\////////////////
// import TermsOfServicePage from "pages/TermsOfService.js";
// import PrivacyPolicyPage from "pages/PrivacyPolicy.js";
import Error from "pages/Error.js";
import SignupSucess from "pages/SignupSucess.js";
import LoginSucess from "pages/LoginSucess.js";
import ComponentRenderer from "ComponentRenderer.js";

import MyCourses from "pages/MyCourses.js";
// import MainLandingPage from "MainLandingPage.js";
// import ComputerBasicsSy from "./Courses/computerBasics/ComputerBasicsSy.js";
// import ComputerBasics from "./Courses/computerBasics/ComputerBasics.js";
// import ComputerBasicSkills from "./Courses/computerBasicSkills/ComputerBasicSkills.js";
// import InternetBasics from "./Courses/internetBasics/InternetBasics.js";
// import WindowsBasics from "./Courses/windowsBasics/WindowsBasics.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
	// If you want to disable the animation just use the disabled `prop` like below on your page's component
	// return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;

	const [state, setState] = useState(100);

	useEffect(() => {
		const runCheck = check();
		runCheck.then((response) => {
			// console.log("This is from useEffect ", response.status);
			return setState(response.status);
		});
	}, []);

	// console.log("This is state itself", state);

	let allowedRoutes = (
		<Switch>
			<Route path="/" exact>
				<SaaSProductLandingPage />
			</Route>
			<Route path="/login" exact>
				<LoginPage />
			</Route>
			<Route path="/signup" exact>
				<SignupPage />
			</Route>
			<Route path="/aboutus" exact>
				<AboutUsPage />
			</Route>
			<Route path="/contactus" exact>
				<ContactUsPage />
			</Route>
			<Route path="/SignupSucess" exact>
				<SignupSucess />
			</Route>
			<Route path="/LoginSucess" exact>
				<LoginSucess />
			</Route>
			{/*<Route path="/c1" exact>
				<ComputerBasics />
			</Route>
			<Route path="/c2" exact>
				<ComputerBasicSkills />
			</Route>
			<Route path="/c3" exact>
				<InternetBasics />
			</Route>
			<Route path="/c4" exact>
				<WindowsBasics />
			</Route>*/}
			<Route path="*" exact>
				<Error />
			</Route>
		</Switch>
	);

	if (state === 200) {
		allowedRoutes = (
			<Switch>
				<Route path="/" exact>
					<SaaSProductLandingPage />
				</Route>
				{/*<Route path="/login" exact>
				<LoginPage />
			</Route>
			<Route path="/signup" exact>
				<SignupPage />
			</Route>*/}
				
				<Route path="/aboutus" exact>
					<AboutUsPage />
				</Route>
				<Route path="/contactus" exact>
					<ContactUsPage />
				</Route>
				<Route path="/courses" exact>
					<CoursesPage />
				</Route>
				<Route path="/SignupSucess" exact>
					<SignupSucess />
				</Route>
				<Route path="/LoginSucess" exact>
					<LoginSucess />
				</Route>
				
				<Route path="/mycourses" exact>
					<MyCourses />
				</Route>
				<Route path="*" exact>
					<Error />
				</Route>
			</Switch>
		);
	}

	return (
		<Router>
			<BackToTop>{allowedRoutes}</BackToTop>
		</Router>
	);
}
