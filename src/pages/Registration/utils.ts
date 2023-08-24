import validator from "validator";

const fillAnswer = (
  value: string = "",
  error: boolean = false,
  text: string = ""
) => ({ value, error, text });

const editNumberAccordingToTheTemplate = (
  numbers: RegExpMatchArray | string[]
): string => {
  let phone = "+7";

  numbers.forEach((number, index) => {
    if (index === 0) phone = `+7(`;
    else if (index === 3) phone = `${phone}${number}) `;
    else if (index === 6) phone = `${phone}${number} `;
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
    case 2:
      numberIndex = 1;
      break;
    case 6:
      numberIndex = 3;
      break;
    case 7:
      numberIndex = 3;
      break;
    case 11:
      numberIndex = 6;
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
): { value: string; error: boolean; text: string } => {
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
    } else if (getOnlyNumbersFromValue.length > 11)
      return fillAnswer(phoneNumberFromStore);
    return fillAnswer(
      editNumberAccordingToTheTemplate(getOnlyNumbersFromValue)
    );
  } else return fillAnswer();
};

export const getCyrillicStringAccordingToTheTemplate = (
  value: string
): { value: string; error: boolean; text: string } => {
  if (/[^А-Яа-я]/g.test(value)) {
    return {
      value,
      error: true,
      text: "В это поле можно ввести только буквы из Кириллицы",
    };
  }
  const stringWithCapitalLetter =
    value.charAt(0).toUpperCase() + value.toLocaleLowerCase().slice(1);

  return fillAnswer(stringWithCapitalLetter);
};

export const getPasswordAccordingToTheTemplate = (
  value: string
): { value: string; error: boolean; text: string } => {
  return /[^A-Za-z\d_-]/g.test(value)
    ? {
        value,
        error: true,
        text: "Могут использоваться только Латинские буквы, цифры и подчеркивание",
      }
    : fillAnswer(value);
};

export const getEmailAccordingToTheTemplate = (
  value: string
): { value: string; error: boolean; text: string } => {
  if (!validator.isEmail(value))
    // validator принимает email типа hi.hi@gmail.com , считает их корректными
    return {
      value,
      error: true,
      text: "Формат email неверный",
    };
  if (/[^\w@.]/g.test(value))
    return {
      value,
      error: true,
      text: "Формат email неверный",
    };
  return fillAnswer(value.toLowerCase());
};
