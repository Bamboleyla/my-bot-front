const editNumberAccordingToTheTemplate = (
  numbers: RegExpMatchArray | string[]
): string => {
  let phone = "";

  numbers.forEach((number, index) => {
    if (index === 0) phone = `(${number}`;
    else if (index === 2) phone = `${phone}${number}) `;
    else if (index === 5) phone = `${phone}${number} `;
    else phone = `${phone}${number}`;
  });

  return phone;
};

const getIndexOfDeletedCharacter = (
  fullString: string[],
  stringFromCharacterWasRemoved: string[]
): number =>
  fullString.findIndex(
    (character, index) => character !== stringFromCharacterWasRemoved[index]
  );

const removesDigitsFromPhoneNumber = (
  phoneNumber: string[],
  indexOfDeletedCharacter: number
): void => {
  let numberIndex = phoneNumber.length - 1;

  switch (indexOfDeletedCharacter) {
    case 0:
      numberIndex = 0;
      break;
    case 4:
      numberIndex = 2;
      break;
    case 5:
      numberIndex = 2;
      break;
    case 9:
      numberIndex = 5;
      break;
    default:
      console.error(
        `indexOfDeletedCharacter: ${indexOfDeletedCharacter} - неправильное значение`
      );
      break;
  }
  phoneNumber.splice(numberIndex, 1);
};

export const getPhoneNumberAccordingToTheTemplate = (
  phoneNumberFromEvent: string,
  phoneNumberFromStore: string
): { value: string } => {
  const getOnlyNumbersFromValue = phoneNumberFromEvent.match(/\d/g);

  if (getOnlyNumbersFromValue) {
    if (
      phoneNumberFromEvent.length < phoneNumberFromStore.length &&
      phoneNumberFromStore.match(/\d/g)?.length ===
        getOnlyNumbersFromValue.length
    ) {
      const indexOfDeletedCharacter = getIndexOfDeletedCharacter(
        [...phoneNumberFromStore],
        [...phoneNumberFromEvent]
      );

      removesDigitsFromPhoneNumber(
        getOnlyNumbersFromValue,
        indexOfDeletedCharacter
      );
    }

    return {
      value: editNumberAccordingToTheTemplate(getOnlyNumbersFromValue),
    };
  } else return { value: "" };
};
