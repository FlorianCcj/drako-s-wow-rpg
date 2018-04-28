import {AditionalCharacteristicsModel} from '../../models/aditional-characteristics.model';

export function calculTotalBonus(userData, userunitBonus, percentBonus) {
  const percentOfUser = new AditionalCharacteristicsModel();
  for (const carac in userData) {
    if (userData.hasOwnProperty(carac)) {
      const sumCarac = userData[carac].value + userunitBonus[carac].value;
      percentOfUser[carac].value = userunitBonus[carac].value
        + (percentBonus[carac].value * sumCarac / 100);
    }
  }
  return percentOfUser;
}

export function calculateBonus(bonusSource) {
  const newPercentBonus = new AditionalCharacteristicsModel();
  const newUnitBonus = new AditionalCharacteristicsModel();

  bonusSource.forEach((buff) => {
    for (const carac in buff.aditionalCharacteristics) {
      if (buff.aditionalCharacteristics.hasOwnProperty(carac)) {
        if (buff.aditionalCharacteristics[carac].unit === 'unit') {
          newUnitBonus[carac].value += buff.aditionalCharacteristics[carac].value;
        }
        if (buff.aditionalCharacteristics[carac].unit === '%') {
          newPercentBonus[carac].value += buff.aditionalCharacteristics[carac].value;
        }
      }
    }
  });
  return [newUnitBonus, newPercentBonus];
}
