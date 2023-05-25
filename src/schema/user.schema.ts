import {object, string, ref} from "yup"
export const createUserSchema = object({
    body: object({
        name: string().required("Name is required"),
        password: string().required("Password is required").min(6, "Password is too short").matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain letters"),
        passwordConfirmation: string().oneOf([ref("password"), null], "Password must match"),
email: string().email("Must be a valid email").required("Email is required"),
    }),
}) 