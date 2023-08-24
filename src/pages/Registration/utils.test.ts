import {
  getCyrillicStringAccordingToTheTemplate,
  getEmailAccordingToTheTemplate,
  getPasswordAccordingToTheTemplate,
  getPhoneNumberAccordingToTheTemplate,
} from "./utils";

describe("getPhoneNumberAccordingToTheTemplate()", () => {
  test("с некорректными значениями аргументов", () => {
    expect(getPhoneNumberAccordingToTheTemplate("Test", "Test")).toEqual({
      value: "",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("", "")).toEqual({
      value: "",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("", "+799")).toEqual({
      value: "",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("+799", "")).toEqual({
      value: "+7(99",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("9", "")).toEqual({
      value: "+7(",
      error: false,
      text: "",
    });
    expect(
      getPhoneNumberAccordingToTheTemplate(
        "+7(999) 999 9999",
        "+7(999) 999 9999 "
      )
    ).toEqual({
      value: "+7(999) 999 999",
      error: false,
      text: "",
    });
  });

  test("eсли пользователь пытается ввести номер более 11 символов", () => {
    expect(
      getPhoneNumberAccordingToTheTemplate("+7123456789011", "+7(123) 456 7890")
    ).toEqual({
      value: "+7(123) 456 7890",
      error: false,
      text: "",
    });
  });

  test("процесс ввода номера", () => {
    expect(getPhoneNumberAccordingToTheTemplate("+79", "+7")).toEqual({
      value: "+7(9",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("+799", "+79")).toEqual({
      value: "+7(99",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("+7999", "+799")).toEqual({
      value: "+7(999) ",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("+79999", "+7999")).toEqual({
      value: "+7(999) 9",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("+7999999", "+799999")).toEqual(
      {
        value: "+7(999) 999 ",
        error: false,
        text: "",
      }
    );
    expect(
      getPhoneNumberAccordingToTheTemplate("+79999999", "+7999999")
    ).toEqual({
      value: "+7(999) 999 9",
      error: false,
      text: "",
    });
    expect(
      getPhoneNumberAccordingToTheTemplate("+79999999999", "+7999999999")
    ).toEqual({
      value: "+7(999) 999 9999",
      error: false,
      text: "",
    });
  });

  test("процесс удаления символов", () => {
    expect(
      getPhoneNumberAccordingToTheTemplate(
        "+7(999) 999 999",
        "+7(999) 999 9999"
      )
    ).toEqual({
      value: "+7(999) 999 999",
      error: false,
      text: "",
    });
    expect(
      getPhoneNumberAccordingToTheTemplate("+7(999) 999 9", "+7(999) 999 999")
    ).toEqual({
      value: "+7(999) 999 9",
      error: false,
      text: "",
    });
    expect(
      getPhoneNumberAccordingToTheTemplate("+7(999) 999 ", "+7(999) 999 9")
    ).toEqual({
      value: "+7(999) 999 ",
      error: false,
      text: "",
    });
    expect(
      getPhoneNumberAccordingToTheTemplate("+7(999) 999", "+7(999) 999 ")
    ).toEqual({
      value: "+7(999) 99",
      error: false,
      text: "",
    });
    expect(
      getPhoneNumberAccordingToTheTemplate("+7(999) 9", "+7(999) 999")
    ).toEqual({
      value: "+7(999) 9",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("+7(999)", "+7(999) ")).toEqual(
      {
        value: "+7(99",
        error: false,
        text: "",
      }
    );
    expect(getPhoneNumberAccordingToTheTemplate("+7(9", "+7(99")).toEqual({
      value: "+7(9",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("+7(", "+7(9")).toEqual({
      value: "+7(",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("+7(999", "+7(999)")).toEqual({
      value: "+7(99",
      error: false,
      text: "",
    });

    expect(getPhoneNumberAccordingToTheTemplate("+7", "+7(")).toEqual({
      value: "+7(",
      error: false,
      text: "",
    });
    expect(getPhoneNumberAccordingToTheTemplate("", "+7")).toEqual({
      value: "",
      error: false,
      text: "",
    });
  });
});

describe("getCyrillicStringAccordingToTheTemplate()", () => {
  test("Если вводится не Кириллица", () => {
    expect(getCyrillicStringAccordingToTheTemplate("Hi")).toEqual({
      value: "Hi",
      error: true,
      text: "В это поле можно ввести только буквы из Кириллицы",
    });
    expect(getCyrillicStringAccordingToTheTemplate("456")).toEqual({
      value: "456",
      error: true,
      text: "В это поле можно ввести только буквы из Кириллицы",
    });
    expect(getCyrillicStringAccordingToTheTemplate("Привет!")).toEqual({
      value: "Привет!",
      error: true,
      text: "В это поле можно ввести только буквы из Кириллицы",
    });
    expect(getCyrillicStringAccordingToTheTemplate("Федя Петров")).toEqual({
      value: "Федя Петров",
      error: true,
      text: "В это поле можно ввести только буквы из Кириллицы",
    });
  });
  test('Если " "', () => {
    expect(getCyrillicStringAccordingToTheTemplate("")).toEqual({
      value: "",
      error: false,
      text: "",
    });
  });
  test("Если вводится Кирилица", () => {
    expect(getCyrillicStringAccordingToTheTemplate("тест")).toEqual({
      value: "Тест",
      error: false,
      text: "",
    });
    expect(getCyrillicStringAccordingToTheTemplate("Тест")).toEqual({
      value: "Тест",
      error: false,
      text: "",
    });
  });
});

describe("getPasswordAccordingToTheTemplate()", () => {
  test("параметр Цифра", () => {
    expect(getPasswordAccordingToTheTemplate("0000")).toEqual({
      value: "0000",
      error: false,
      text: "",
    });
    expect(getPasswordAccordingToTheTemplate("00_00")).toEqual({
      value: "00_00",
      error: false,
      text: "",
    });
    expect(getPasswordAccordingToTheTemplate("go0")).toEqual({
      value: "go0",
      error: false,
      text: "",
    });
    expect(getPasswordAccordingToTheTemplate("тест0")).toEqual({
      value: "тест0",
      error: true,
      text: "Могут использоваться только Латинские буквы, цифры и подчеркивание",
    });
    expect(getPasswordAccordingToTheTemplate("12 34")).toEqual({
      value: "12 34",
      error: true,
      text: "Могут использоваться только Латинские буквы, цифры и подчеркивание",
    });
  });
  test('параметр ""', () => {
    expect(getPasswordAccordingToTheTemplate("")).toEqual({
      value: "",
      error: false,
      text: "",
    });
  });
  test("параметр Латинские буквы", () => {
    expect(getPasswordAccordingToTheTemplate("Go")).toEqual({
      value: "Go",
      error: false,
      text: "",
    });
    expect(getPasswordAccordingToTheTemplate("wow")).toEqual({
      value: "wow",
      error: false,
      text: "",
    });
    expect(getPasswordAccordingToTheTemplate("woW")).toEqual({
      value: "woW",
      error: false,
      text: "",
    });
    expect(getPasswordAccordingToTheTemplate("Go_Go")).toEqual({
      value: "Go_Go",
      error: false,
      text: "",
    });
    expect(getPasswordAccordingToTheTemplate("GoGo16")).toEqual({
      value: "GoGo16",
      error: false,
      text: "",
    });
    expect(getPasswordAccordingToTheTemplate("Go go")).toEqual({
      value: "Go go",
      error: true,
      text: "Могут использоваться только Латинские буквы, цифры и подчеркивание",
    });
    expect(getPasswordAccordingToTheTemplate("Goго")).toEqual({
      value: "Goго",
      error: true,
      text: "Могут использоваться только Латинские буквы, цифры и подчеркивание",
    });
    expect(getPasswordAccordingToTheTemplate("tt_ф")).toEqual({
      value: "tt_ф",
      error: true,
      text: "Могут использоваться только Латинские буквы, цифры и подчеркивание",
    });
    expect(getPasswordAccordingToTheTemplate("tt!")).toEqual({
      value: "tt!",
      error: true,
      text: "Могут использоваться только Латинские буквы, цифры и подчеркивание",
    });
  });
});

describe("getEmailAccordingToTheTemplate()", () => {
  test("корректные email адреса", () => {
    expect(getEmailAccordingToTheTemplate("Sss@gmail.com")).toEqual({
      value: "sss@gmail.com",
      error: false,
      text: "",
    });
    expect(getEmailAccordingToTheTemplate("ttt@gmail.com")).toEqual({
      value: "ttt@gmail.com",
      error: false,
      text: "",
    });
    expect(getEmailAccordingToTheTemplate("ttT_@gmail.com")).toEqual({
      value: "ttt_@gmail.com",
      error: false,
      text: "",
    });
    expect(getEmailAccordingToTheTemplate("ttT4@gmail.com")).toEqual({
      value: "ttt4@gmail.com",
      error: false,
      text: "",
    });
  });
  test("некорректные email адреса", () => {
    expect(getEmailAccordingToTheTemplate("Sss@gmailcom")).toEqual({
      value: "Sss@gmailcom",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate("tttgmail.com")).toEqual({
      value: "tttgmail.com",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate("ttt_.gmail@com")).toEqual({
      value: "ttt_.gmail@com",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate(".ttt_gmail@com")).toEqual({
      value: ".ttt_gmail@com",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate("@ttt_gmail.com")).toEqual({
      value: "@ttt_gmail.com",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate("ttt_gmail@com.")).toEqual({
      value: "ttt_gmail@com.",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate("ttt_gmail.com@")).toEqual({
      value: "ttt_gmail.com@",
      error: true,
      text: "Формат email неверный",
    });
  });
  test("проверка на буквы НЕ из Латинского алфавита", () => {
    expect(getEmailAccordingToTheTemplate("ttФ@gmail.com")).toEqual({
      value: "ttФ@gmail.com",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate("44ф@gmail.com")).toEqual({
      value: "44ф@gmail.com",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate("_ф@gmail.com")).toEqual({
      value: "_ф@gmail.com",
      error: true,
      text: "Формат email неверный",
    });
  });
  test("проверка на недопустимые символы", () => {
    expect(getEmailAccordingToTheTemplate("tt!@gmail.com")).toEqual({
      value: "tt!@gmail.com",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate("44&@gmail.com")).toEqual({
      value: "44&@gmail.com",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate("ss @gmail.com")).toEqual({
      value: "ss @gmail.com",
      error: true,
      text: "Формат email неверный",
    });
  });
  test("проверка на задвоенные @ и точки", () => {
    expect(getEmailAccordingToTheTemplate("t@t@gmail.com")).toEqual({
      value: "t@t@gmail.com",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate(".ss@gmail.com")).toEqual({
      value: ".ss@gmail.com",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate("ss@@gmail.com")).toEqual({
      value: "ss@@gmail.com",
      error: true,
      text: "Формат email неверный",
    });
    expect(getEmailAccordingToTheTemplate("ss@gmail..com")).toEqual({
      value: "ss@gmail..com",
      error: true,
      text: "Формат email неверный",
    });
  });
});
