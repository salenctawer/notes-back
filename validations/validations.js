import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать минимум 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать минимум 5 символов").isLength({
    min: 5,
  }),
];

export const notesCreateValidation = [
  body("title", "Введите заголовок задачи").isLength({ min: 3 }).isString(),
  body("deadline", "Введите дату дедлайна").isLength({ min: 2 }).isString(),
  body("text", "Введите описание задачи").isLength({ min: 5 }).isString(),
  body("important", "Неверный формат объявления важности")
    .optional()
    .isString(),
];
