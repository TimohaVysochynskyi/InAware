import css from "./IdeaSection.module.css";
import { useState } from "react";
import { useFormik } from "formik";
import {
  getIdeaFormFirstError,
  ideaFormInitialValues,
  ideaFormValidationSchema,
  type IdeaFormValues,
} from "./model/ideaForm";

const IdeaSection = () => {
  const [focusedField, setFocusedField] = useState<keyof IdeaFormValues | null>(
    null,
  );

  const formik = useFormik<IdeaFormValues>({
    initialValues: ideaFormInitialValues,
    validationSchema: ideaFormValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, helpers) => {
      // TODO: integrate with API when ready
      void values;
      helpers.resetForm();
      setFocusedField(null);
    },
  });

  const isFormFilled = Object.values(formik.values).every(
    (value) => value.trim().length > 0,
  );

  const shouldShowError =
    formik.submitCount > 0 || Object.keys(formik.touched).length > 0;

  const submitError = shouldShowError
    ? getIdeaFormFirstError(formik.errors)
    : undefined;

  const getLabelClassName = (fieldName: keyof IdeaFormValues) => {
    const isActive =
      focusedField === fieldName || formik.values[fieldName].trim().length > 0;

    return `${css.label} ${isActive ? css.activeLabel : ""}`;
  };

  return (
    <>
      <section className={css.sectionWrapper}>
        <div className={css.section}>
          <form
            className={css.form}
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <div className={css.formGroup}>
              <label htmlFor="name" className={getLabelClassName("name")}>
                Твоє ім'я
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={css.input}
                value={formik.values.name}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  setFocusedField((prev) => (prev === "name" ? null : prev));
                }}
              />
            </div>
            <div className={css.formGroup}>
              <label htmlFor="phone" className={getLabelClassName("phone")}>
                Номер телефону
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                className={css.input}
                value={formik.values.phone}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("phone")}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  setFocusedField((prev) => (prev === "phone" ? null : prev));
                }}
              />
            </div>
            <div className={css.formGroup}>
              <label htmlFor="idea" className={getLabelClassName("idea")}>
                Ідея
              </label>
              <textarea
                id="idea"
                name="idea"
                className={`${css.input} ${css.textarea}`}
                value={formik.values.idea}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("idea")}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  setFocusedField((prev) => (prev === "idea" ? null : prev));
                }}
              />
            </div>
            <div className={css.formBottom}>
              <button
                type="submit"
                className={`${css.submitButton} ${
                  isFormFilled ? css.submitButtonActive : ""
                }`}
                disabled={!isFormFilled || formik.isSubmitting}
              >
                <div
                  className={`${css.buttonContent} ${
                    isFormFilled ? css.buttonContentActive : ""
                  }`}
                >
                  Надіслати
                  <svg viewBox="0 0 6 15" fill="none" className={css.arrow}>
                    <path d="M6.67628e-07 3.88889L2.83638 7.5L-6.67628e-07 11.1111L0 15L6 7.5L0 -9.53674e-07L6.67628e-07 3.88889Z" />
                  </svg>
                </div>
              </button>

              <div className={css.formError} aria-live="polite">
                {submitError}
              </div>
            </div>
          </form>
          <div className={css.content}>
            <h2 className={css.title}>
              Запропонувати
              <br />
              <div className={css.titleRow}>
                <div className={css.line} />
                ідею
              </div>
            </h2>
            <p className={css.description}>
              Допоможіть нам зробити цей продукт ще кращим і зручнішим для вас,
              поділившись своїм досвідом, враженнями та пропозиціями щодо його
              покращення.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default IdeaSection;
