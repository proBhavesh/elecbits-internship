import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { getCourses } from "../pages/IsSignedIn.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Letter from "components/forms/SimpleSubscribeNewsletter.js";
// import MainFeature2 from "components/features/TwoColSingleFeatureWithStats.js";
// import MainFeature3 from "components/features/TwoColSingleFeatureWithStats2.js";
import Features from "components/features/ThreeColSimple.js";
// import Features from "components/features/ThreeColWithSideImage.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";
import { NavLink as NavBarLink } from "react-router-dom";
const Subheading = tw.div`m-16`;

export default () => {
	const [state, setState] = useState({});
	useEffect(() => {
		const runCourse = getCourses();
		runCourse.then((res) => {
			console.log("This is from mycourse file", res);
			const c1 = res.course1;
			const c2 = res.course2;
			const c3 = res.course3;
			const c4 = res.course4;
			setState({ c1, c2, c3, c4 });
			console.log(state);
		});
	}, []);

	console.log(state);

	return (
		<AnimationRevealPage disabled>
			<Header />
			<Subheading>
				{state.c1 == true ? (
					<NavBarLink to="/c1">Computer Basics</NavBarLink>
				) : (
					<h1>Please set a Stage</h1>
				)}
			</Subheading>
			<Subheading>
				{state.c2 == true ? (
					<NavBarLink to="/c2">Basic Computer Skills</NavBarLink>
				) : null}
			</Subheading>
			<Subheading>
				{state.c3 == true ? (
					<NavBarLink to="/c3">Internet Basics</NavBarLink>
				) : null}
			</Subheading>
			<Subheading>
				{state.c4 == true ? (
					<NavBarLink to="/c4">Windows Basics</NavBarLink>
				) : null}
			</Subheading>
			<Footer />
		</AnimationRevealPage>
	);
};
