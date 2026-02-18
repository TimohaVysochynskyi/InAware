import * as yup from "yup";

export const ideaFormFieldOrder = ["name", "phone", "idea"] as const;
export type IdeaFormFieldName = (typeof ideaFormFieldOrder)[number];

export type IdeaFormValues = Record<IdeaFormFieldName, string>;

export const ideaFormInitialValues: IdeaFormValues = {
    name: "",
    phone: "",
    idea: "",
};

export const ideaFormValidationSchema: yup.ObjectSchema<IdeaFormValues> = yup
    .object({
        name: yup.string().trim().required("Вкажіть ім'я"),
        phone: yup.string().trim().required("Вкажіть номер телефону"),
        idea: yup.string().trim().required("Опишіть ідею"),
    })
    .required();

export const getIdeaFormFirstError = (errors: Record<string, unknown>) => {
    for (const fieldName of ideaFormFieldOrder) {
        const fieldError = errors[fieldName];
        if (typeof fieldError === "string" && fieldError.trim().length > 0) {
            return fieldError;
        }
    }

    return undefined;
};
