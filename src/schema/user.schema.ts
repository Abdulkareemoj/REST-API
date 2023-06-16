import { z } from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required" }),
      password: z.string({ required_error: "Password is required" }),
    })
    .min(6, "Password is too short")
    .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain letters"),
  passwordConfirmation: z
    .string()
    .oneOf([ref("password"), null], "Password must match"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Must be a valid email"),
});

export const createUserSessionSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    password: z
      .string({ required_error: "Password is required" })

      .min(6, "Password is too short - 6 Characters Minimum")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain letters"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Must be a valid email"),
  }),
});
