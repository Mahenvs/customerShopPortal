import { checkFieldEmpty } from "./checkFieldEmpty";

export const validatingInputs = (formData) => {
  if (!checkFieldEmpty(formData?.email)) {
    return "Email cannot be empty";
  } else if (!checkFieldEmpty(formData?.password)) {
    return "Password cannot be empty";
  } else if (
    !checkFieldEmpty(formData?.firstName) ||
    !checkFieldEmpty(formData?.lastName) ||
    !checkFieldEmpty(formData?.address) ||
    !checkFieldEmpty(formData?.phoneNumber)
  ) {
    return "All the fields are mandatory";
  }
  return "";
};
