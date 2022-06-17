const getAccountExistenceTime = (creationDate) => {
	const accountExistenceInMilisec = Date.now() - creationDate.getTime();
	const accountExistTimeInDays = Math.round(accountExistenceInMilisec / (1000 * 60 * 60 * 24));

	const accountExistYears = Math.floor(accountExistTimeInDays / 365);
	const accountExistMonths = Math.floor((accountExistTimeInDays - accountExistYears * 365) / 30);
	const accountExistDays = Math.floor(
		accountExistTimeInDays - accountExistYears * 365 - accountExistMonths * 30
	);
	return { accountExistYears, accountExistMonths, accountExistDays };
};

export default getAccountExistenceTime;
