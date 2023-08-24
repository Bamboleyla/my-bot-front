import { registrationFormSlice } from ".";
import { initialState } from "./initialState";

describe("registrationFormSlice", () => {
  const {
    reset,
    setLastName,
    setFirstName,
    setMiddleName,
    setPhoneNumber,
    setEmail,
    setCountry,
    setCity,
    setTgToken,
    setPassword,
    setRepeatPassword,
    setEmailCode,
    addLoadingProcess,
    deleteLoadingProcess,
    setActiveStep,
  } = registrationFormSlice.actions;

  const state = {
    data: {
      firstName: { value: "Иван", error: false, errorText: "" },
      lastName: {
        value: "Smith",
        error: true,
        errorText: "В это поле можно ввести только буквы из Кириллицы",
      },
      middleName: { value: "", error: false, errorText: "" },
      phoneNumber: { value: "+7", error: false, errorText: "" },
      email: { value: "", error: false, errorText: "" },
      country: { value: "Россия", error: false, errorText: "" },
      city: { value: "", error: false, errorText: "" },
      tgToken: { value: "", error: false, errorText: "" },
      password: { value: "", error: false, errorText: "" },
      repeatPassword: { value: "", error: false, errorText: "" },
      emailCode: { value: "", error: false, errorText: "" },
    },
    isLoading: [],
    activeStep: 0,
  };

  it("При отсутствия в аргументах state должен вернуть initialstate", () => {
    const result = registrationFormSlice.reducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });
  it("При присутствии в аргументах state должен вернуть state", () => {
    const result = registrationFormSlice.reducer(state, { type: "" });
    expect(result).not.toEqual(initialState);
  });
  test("reset", () => {
    const action = { type: reset.type };
    const result = registrationFormSlice.reducer(state, action);
    expect(result).toEqual(initialState);
    expect(result).not.toEqual(state);
  });
  test("setLastName", () => {
    const action = {
      type: setLastName.type,
      payload: { value: "Кузнецов", error: false, text: "" },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.data.lastName).toEqual({
      value: "Кузнецов",
      error: false,
      errorText: "",
    });
  });
  test("setFirstName", () => {
    const action = {
      type: setFirstName.type,
      payload: {
        value: "Devid",
        error: true,
        text: "В это поле можно ввести только буквы из Кириллицы",
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.data.firstName).toEqual({
      value: "Devid",
      error: true,
      errorText: "В это поле можно ввести только буквы из Кириллицы",
    });
  });
  test("setMiddleName", () => {
    const action = {
      type: setMiddleName.type,
      payload: {
        value: "Junior",
        error: true,
        text: "В это поле можно ввести только буквы из Кириллицы",
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.data.middleName).toEqual({
      value: "Junior",
      error: true,
      errorText: "В это поле можно ввести только буквы из Кириллицы",
    });
  });
  test("setPhoneNumber", () => {
    const action = {
      type: setPhoneNumber.type,
      payload: {
        value: "+7 (999)",
        error: false,
        text: "",
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.data.phoneNumber).toEqual({
      value: "+7 (999)",
      error: false,
      errorText: "",
    });
  });
  test("setEmail", () => {
    const action = {
      type: setEmail.type,
      payload: {
        value: "google@gmail.com",
        error: true,
        text: "Этот адресс уже занят",
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.data.email).toEqual({
      value: "google@gmail.com",
      error: true,
      errorText: "Этот адресс уже занят",
    });
  });
  test("setCountry", () => {
    const action = {
      type: setCountry.type,
      payload: {
        value: "Монголия",
        error: false,
        text: "",
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.data.country).toEqual({
      value: "Монголия",
      error: false,
      errorText: "",
    });
  });
  test("setCity", () => {
    const action = {
      type: setCity.type,
      payload: {
        value: "Уфа",
        error: false,
        text: "",
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.data.city).toEqual({
      value: "Уфа",
      error: false,
      errorText: "",
    });
  });
  test("setTgToken", () => {
    const action = {
      type: setTgToken.type,
      payload: {
        value: "5531500989:AAyXa8wwQUIW96_42xn-iS7yqfon8OXHz11",
        error: false,
        text: "",
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.data.tgToken).toEqual({
      value: "5531500989:AAyXa8wwQUIW96_42xn-iS7yqfon8OXHz11",
      error: false,
      errorText: "",
    });
  });
  test("setPassword", () => {
    const action = {
      type: setPassword.type,
      payload: {
        value: "Secret123",
        error: false,
        text: "",
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.data.password).toEqual({
      value: "Secret123",
      error: false,
      errorText: "",
    });
  });
  test("setRepeatPassword", () => {
    const action = {
      type: setRepeatPassword.type,
      payload: {
        value: "Secret123",
        error: false,
        text: "",
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.data.repeatPassword).toEqual({
      value: "Secret123",
      error: false,
      errorText: "",
    });
  });
  test("setEmailCode", () => {
    const action = {
      type: setEmailCode.type,
      payload: {
        value: "5050",
        error: false,
        text: "",
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.data.emailCode).toEqual({
      value: "5050",
      error: false,
      errorText: "",
    });
  });
  test("addLoadingProcess", () => {
    const action = {
      type: addLoadingProcess.type,
      payload: {
        value: "CheckEmail",
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.isLoading[0]).toBe("CheckEmail");
    expect(result.isLoading).toHaveLength(1);
  });
  test("deleteLoadingProcess", () => {
    const addAction = {
      type: addLoadingProcess.type,
      payload: {
        value: "CheckEmail",
      },
    };
    const deleteAction = {
      type: deleteLoadingProcess.type,
      payload: {
        value: "CheckEmail",
      },
    };
    const stateAfterAdd = registrationFormSlice.reducer(state, addAction);
    expect(stateAfterAdd.isLoading[0]).toBe("CheckEmail");
    expect(stateAfterAdd.isLoading).toHaveLength(1);
    const result = registrationFormSlice.reducer(stateAfterAdd, deleteAction);
    expect(result.isLoading[0]).not.toBe("CheckEmail");
    expect(result.isLoading).toHaveLength(0);
  });
  test("setActiveStep", () => {
    const action = {
      type: setActiveStep.type,
      payload: {
        value: 1,
      },
    };
    const result = registrationFormSlice.reducer(state, action);
    expect(result.activeStep).toBe(1);
  });
});
