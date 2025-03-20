import { account, VALIDATION_RULES, BLANK, FIELD_IDS } from "./constants.js";

export const getValidationMessage = (id, value) => {
  if (value === BLANK) return VALIDATION_RULES[id].emptyMessage;

  if (id === FIELD_IDS.passwordConfirm && value !== account.password)
    return VALIDATION_RULES[id].errorMessage;

  if (!value.match(VALIDATION_RULES[id]?.regex))
    return VALIDATION_RULES[id].errorMessage;
};
