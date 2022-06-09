const accountExistenceTime = (creationDate) => {
	const accountExistenceInMilisec = Date.now() - creationDate.getTime();
	const accountExstTimeInDays = Math.round(accountExistenceInMilisec / (1000 * 60 * 60 * 24));

	const accountExstYears = Math.floor(accountExstTimeInDays / 365);
	const accountExstMonths = Math.floor((accountExstTimeInDays - accountExstYears * 365) / 30);
	const accountExstDays = Math.floor(
		accountExstTimeInDays - accountExstYears * 365 - accountExstMonths * 30
	);
	return { accountExstYears, accountExstMonths, accountExstDays };
};

export default accountExistenceTime;
