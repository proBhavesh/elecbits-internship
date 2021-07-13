const uuid = require("uuid").v4;
const stripe = require("stripe")(
	"pk_live_51IJ2aGFSQv1Tpw1NSSt22giRsEiLy6dOiUhiqFweMG2UigwWu242apRpUVmaYEaC1hPTqxt3g1DIGGLnLd60hbqr00BjOyFY04"
);
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
require("../db/connect");

{
	/*<-------------------------HOME HANDLE ------------------------------------>*/
}

const homeHandle = (req, res) => {
	res.send("This is my home");
};

// <------------------------- SIGNUP HANDLE ------------------------------------>

const signupHandle = async (req, res) => {
	const { name, email, password, cpassword } = req.body;
	console.log({ name, email, password, cpassword });
	if (!name || !email || !password || !cpassword) {
		return res.status(422).json({ error: "Some fields are empty" });
	}

	try {
		const userExist = await User.findOne({ email: email });

		if (userExist) {
			return res.status(422).json({ error: "Email Exists" });
		} else if (password != cpassword) {
			return res.status(422).json({ error: "passwords don't match" });
		} else {
			const user = new User({
				name,
				email,
				password,
				cpassword,
			});

			await user.save();
			res.status(201).json({
				message: "user registered successfully",
			});
		}
	} catch (err) {
		console.log(err);
	}
};

// <-------------------------LOGIN HANDLE ------------------------------------>

const loginHandle = async (req, res) => {
	// main try block
	try {
		const { email, password } = req.body;
		// console.log(`This login is from  ${(email, password)}`);
		if (!email || !password) {
			return res.status(400).json({ error: "Fill all the fields" });
		}

		const userFound = await User.findOne({ email: email });
		console.log(`User Found ${userFound}`);
		//if else start
		if (userFound) {
			//compare usign bcryptjs
			const isMatch = Boolean(password === userFound.password);
			console.log(`Passwords Matched??? ${isMatch}`);
			//jwt
			const token = await userFound.generateAuthToken();
			// console.log(token);

			//cookies setting
			res.cookie("jwtoken", token, {
				expires: new Date(Date.now() + 25892000000),
				httpOnly: true,
			});

			if (!isMatch) {
				res.status(400).json({ error: "invalid credentials" });
			} else {
				res.status(200).json({
					message: "user signed in successfully",
				});
			}
		} else {
			res.status(400).json({ error: "invalid credentials" });
		}
		//else if end
	} catch (err) {
		res.json({ message: "not working" });
		console.log(err);
	}
	// console.log(userLogin);
};

//<-------------------------------- Check if loggedIn ------------------------->

const isSignedIn = async (req, res) => {
	try {
		const token = req.cookies.jwtoken;
		if (!token) {
			res.status(300).json({ message: "Token not found", bool: "false" });
			return console.log("Token not found", token);
		}

		const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

		const rootUser = await User.findOne({
			_id: verifyToken._id,
			"tokens.token": token,
		});
		if (!rootUser) {
			return res
				.status(399)
				.json({ message: "User not found", bool: "false" });
		}

		if (rootUser) {
			return res
				.status(200)
				.json({ message: "User found", bool: "true" });
		}
		// const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
	} catch (err) {
		console.log(err);
	}
};

//<-------------------------------- Setting buyed courses to database ------------------------->

const getCourses = async (req, res) => {
	try {
		const token = req.cookies.jwtoken;
		if (!token) {
			res.status(300).json({ message: "Token not found", bool: "false" });
			return console.log("Token not found", token);
		}

		const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

		const rootUser = await User.findOne({
			_id: verifyToken._id,
			"tokens.token": token,
		});
		if (!rootUser) {
			return res
				.status(399)
				.json({ message: "User not found", bool: "false" });
		}

		if (rootUser) {
			console.log(rootUser);
			return res.send(rootUser);
		}
		// const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
	} catch (err) {
		console.log(err);
	}
};

// <-------------------------Module Export ------------------------------------>
module.exports = {
	homeHandle,
	paymentHandle,
	signupHandle,
	loginHandle,
	isSignedIn,
	getCourses,
};
