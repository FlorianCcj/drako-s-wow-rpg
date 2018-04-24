export function calculCaracAutoSucceed(numberOfDice) {
  const result = Math.floor((numberOfDice - 20) / 3);
  return result < 0 ? 0 : result;
}

export function calculDiceToLaunch(numberOfDice) {
  const result = Math.floor((numberOfDice - 20) / 3);
  return result < 0 ? numberOfDice : 20;
}
