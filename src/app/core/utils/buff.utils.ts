import {AditionalCharacteristicsModel} from '../../models/aditional-characteristics.model';
import { CharacteristicsModel } from '../../models/characteristics.model';
import { BuffModel } from '../../models/buff.model';

export function reducBuffDuration(buffs: BuffModel[]) {
  return buffs
    .map((buff) => ({
      ...buff,
      duration: (buff.duration === -1 || buff.duration === 0)
        ? buff.duration
        : (buff.duration - 1),
      cooldown: (buff.cooldown === -1 || buff.cooldown === 0)
        ? buff.cooldown
        : (buff.cooldown - 1),
    }))
    .filter(buff => !(buff.duration === 0 && buff.cooldown === 0))
  ;
}

export function calculAditionalCharacTotalBonus(userData, userunitBonus, percentBonus) {
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

export function calculAditionalCharacBonus(bonusSource) {
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

export function calculCharacTotalBonus(userData, userunitBonus, percentBonus) {
  const percentOfUser = new CharacteristicsModel();
  for (const carac in userData) {
    if (userData.hasOwnProperty(carac)) {
      const sumCarac = userData[carac].value + userunitBonus[carac].value;
      percentOfUser[carac].value = userunitBonus[carac].value
        + (percentBonus[carac].value * sumCarac / 100);
    }
  }
  return percentOfUser;
}

export function calculCharacCharacBonus(bonusSource) {
  const newPercentBonus = new CharacteristicsModel();
  const newUnitBonus = new CharacteristicsModel();

  bonusSource.forEach((buff) => {
    for (const carac in buff.characteristics) {
      if (buff.characteristics.hasOwnProperty(carac)) {
        if (buff.characteristics[carac].unit === 'unit') {
          newUnitBonus[carac].value += buff.characteristics[carac].value;
        }
        if (buff.characteristics[carac].unit === '%') {
          newPercentBonus[carac].value += buff.characteristics[carac].value;
        }
      }
    }
  });
  return [newUnitBonus, newPercentBonus];
}
