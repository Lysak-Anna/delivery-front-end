import * as yup from "yup";

export const schema = yup
  .object({
    name: yup
      .string()
      .required("Required field")
      .matches(
        /^(?=.{2,30}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
        "Invalid name format"
      ),
    email: yup
      .string()
      .required("Required field")
      .email("Invalid email format"),
    phone: yup
      .string()
      .required("Required field")
      .matches(/^[0-9]+$/, "Invalid number format")
      .min(10, "Phone must be at least 10 characters")
      .max(12, "Phone should be at most 12 characters"),
    address: yup
      .string()
      .required("Required field")
      .min(10, "Address must be at least 10 characters"),
  })
  .required();
