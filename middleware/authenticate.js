const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
	try {
		// console.log(req.cookies);
		const token = req.cookies.jwtoken;
		if (!token) {
			return console.log("token not found", token);
		}
		const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

		const rootUser = await User.findOne({
			_id: verifyToken._id,
			"tokens.token": token,
		});
		if (!rootUser) {
			return new Error("user not found");
		}

		// req.token = token;
		// req.rootUser = rootUser;
		// req.userId = rootUser._id;

		next();
	} catch (err) {
		console.log("Unauthorized: No token provided");
		console.log(err);
	}
};

module.exports = Authenticate;
