import { getValidationMessage } from "./validation.js";
import {
  account,
  BLANK,
  CSS_CLASSES,
  DISPLAY_STATES,
  FIELD_IDS,
} from "./constants.js";

const inputs = document.querySelectorAll(`.${CSS_CLASSES.inputAccount}`);
const submitBtn = document.querySelector(`.${CSS_CLASSES.btnSubmit}`);

const updateSubmitButtonState = () => {
  let isReadyToSubmit = true;

  for (let input of inputs) {
    if (getValidationMessage(input.id, account[input.id]))
      isReadyToSubmit = false;
  }

  submitBtn.disabled = !isReadyToSubmit;
};

const updateErrorMessage = (input) => {
  const errorMsg = input.parentNode.querySelector(`.${CSS_CLASSES.msgError}`);
  const message = getValidationMessage(input.id, input.value);
  const hasError = Boolean(message);

  input.classList.toggle(CSS_CLASSES.error, hasError);
  errorMsg.textContent = hasError ? message : BLANK;
  errorMsg.style.display = hasError
    ? DISPLAY_STATES.block
    : DISPLAY_STATES.none;

  updateSubmitButtonState();
};

const handleBlur = (event) => {
  account[event.target.id] = event.target.value;
  const input = event.target;

  if (
    event.target.id === FIELD_IDS.password &&
    account[FIELD_IDS.passwordConfirm] !== BLANK
  )
    updateErrorMessage(document.querySelector(`#${FIELD_IDS.passwordConfirm}`));

  updateErrorMessage(input);
};

inputs.forEach((input) => {
  input.addEventListener("blur", handleBlur);
});
