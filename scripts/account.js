import { getValidationMessage } from "./validation.js";
import { account, BLANK, CSS_CLASSES, DISPLAY_STATES } from "./constants.js";

const inputs = document.querySelectorAll(`.${CSS_CLASSES.inputAccount}`);
const submitBtn = document.querySelector(`.${CSS_CLASSES.btnSubmit}`);

const updateSubmitButtonState = () => {
  let isReadyToSubmit = true;
  for (let input of inputs) {
    isReadyToSubmit = !getValidationMessage(input.id, account[input.id]);
  }
  if (isReadyToSubmit) submitBtn.disabled = false;
};

const handleValidation = (input) => {
  const errorMsg = input.parentNode.querySelector(`.${CSS_CLASSES.msgError}`);
  const message = getValidationMessage(input.id, input.value);
  const hasError = Boolean(message);

  input.classList.toggle(CSS_CLASSES.error, hasError);
  errorMsg.textContent = hasError ? message : BLANK;
  errorMsg.style.display = hasError
    ? DISPLAY_STATES.block
    : DISPLAY_STATES.none;

  if (!hasError) updateSubmitButtonState();
};

const handleChange = (event) => {
  account[event.target.id] = event.target.value;
};

const handleBlur = (event) => {
  const input = event.target;
  handleValidation(input);
};

inputs.forEach((input) => {
  input.addEventListener("change", handleChange);
  input.addEventListener("blur", handleBlur);
});
