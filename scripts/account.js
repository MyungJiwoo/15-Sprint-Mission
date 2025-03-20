const VALIDATION_RULES = {
  email: {
    regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
    emptyMessage: "이메일을 입력해주세요.",
    errorMessage: "잘못된 이메일 형식입니다.",
  },
  nickname: {
    emptyMessage: "닉네임을 입력해주세요.",
  },
  password: {
    regex: "^.{8,}$",
    emptyMessage: "비밀번호를 입력해주세요.",
    errorMessage: "비밀번호를 8자 이상 입력해주세요.",
  },
  "password-confirm": {
    emptyMessage: "비밀번호를 다시 입력해주세요.",
    errorMessage: "비밀번호가 일치하지 않습니다.",
  },
};

const account = {
  email: "",
  nickname: "",
  password: "",
  "password-confirm": "",
};

const inputs = document.querySelectorAll(".input-account");
const submitBtn = document.querySelector(".btn-submit");

const isValidate = (id, value) => {
  if (value === "") return VALIDATION_RULES[id].emptyMessage;

  if (id === "password-confirm" && value !== account.password)
    return VALIDATION_RULES[id].errorMessage;

  if (!value.match(VALIDATION_RULES[id]?.regex))
    return VALIDATION_RULES[id].errorMessage;
};

const handleChange = (event) => {
  account[event.target.id] = event.target.value;
};

const handleBlur = (event) => {
  const input = event.target;
  const errorMsg = input.parentNode.querySelector(".msg-error");

  // 유효성 검사
  const message = isValidate(input.id, input.value);
  if (message) {
    input.classList.add("error");
    errorMsg.innerHTML = message;
    errorMsg.style.display = "block";
  } else {
    input.classList.remove("error");
    errorMsg.style.display = "none";

    // 제출 버튼 활성화
    let isReadyToSubmit = true;
    for (let field of inputs) {
      isReadyToSubmit = !isValidate(field.id, account[field.id]);
    }
    if (isReadyToSubmit) submitBtn.disabled = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("change", handleChange);
  input.addEventListener("blur", handleBlur);
});
