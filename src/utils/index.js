export const findMatchingUser = (sameTravelByCountry, country, username) => {
  const result = sameTravelByCountry.filter((x) => x._id.includes(country));
  const usersResult = result[0].users;
  const finalResult = usersResult.filter((x) => x !== username);
  return finalResult;
};
