export const check = async () => {
	const res = await fetch("http://localhost:5000/backend/isSignedIn", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});

	// console.log("this is response", res.status);
	return await res;
};

export const getCourses = async () => {
	const res = await fetch("http://localhost:5000/backend/getCourses");
	const data = await res.json();
	console.log("This console log is from getCourses function", data);
	return await data;
};
