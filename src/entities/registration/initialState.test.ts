import { initialState } from "./initialState";

test("Проверка initialState на отсутствие изменений", () => {
  const test = {
    firstName: { value: "", error: false, errorText: "" },
    lastName: { value: "", error: false, errorText: "" },
    middleName: { value: "", error: false, errorText: "" },
    phoneNumber: { value: "+7", error: false, errorText: "" },
    email: { value: "", error: false, errorText: "" },
    country: { value: "Россия", error: false, errorText: "" },
    city: { value: "", error: false, errorText: "" },
    tgToken: { value: "", error: false, errorText: "" },
    password: { value: "", error: false, errorText: "" },
    repeatPassword: { value: "", error: false, errorText: "" },
    emailCode: { value: "", error: false, errorText: "" },
  };

  expect(initialState.data).toEqual(test);
  expect(initialState.activeStep).toBe(0);
  expect(initialState.isLoading.length).toBe(0);
});
