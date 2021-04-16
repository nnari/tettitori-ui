import { Button, Form, Input, Container } from "semantic-ui-react";
import { useFormik } from "formik";
import { snackbarNotify } from "./Snackbar";
import ReCAPTCHA from "react-google-recaptcha";
//We're gonna need Yup for validation
import * as Yup from "yup";
import RegistrationService from "../Services/RegistrationService";
import { useEffect, useState } from "react";

const registrationFormSchema = {
  username: {
    min: 5,
    max: 20,
  },
  email: {
    min: 3,
    max: 30,
  },
};

const { username: u } = registrationFormSchema;

const RegistrationFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(u.min, `Käyttäjänimi on liian lyhyt! ${u.min}-${u.max} merkkiä.`)
    .max(u.max, `Käyttäjänimi on liian pitkä! ${u.min}-${u.max} merkkiä.`)
    .required(`Käyttäjänimi on pakollinen`),
  email: Yup.string()
    .email("Sähköposti on virheellinen")
    .required("Sähköposti on pakollinen"),
  recaptcha: Yup.string().required(),
});

export const CompanyInfoPage = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      recaptcha: "",
    },
    validationSchema: RegistrationFormSchema,
    onSubmit: (values) => {
      const data = {
        username: values.username.trim(),
        email: values.email.trim(),
        recaptcha: values.recaptcha,
      };
      setLoading(true);
      RegistrationService.RequestAccount(data).then((e) => {
        snackbarNotify("Tunnukset lähetetty. Tarkista antamasi sähköposti.");
        formik.resetForm();
        setLoading(false);
      });
    },
  });

  return (
    <Container style={{ marginTop: "2em" }}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group grouped={true} widths="equal">
          <Form.Field
            id="username"
            control={Input}
            label="Käyttäjätunnus"
            placeholder="Käyttäjätunnusta käytetään palveluun kirjautumiseen."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.username &&
              formik.touched.username && { content: formik.errors.username }
            }
          />
          <Form.Field
            id="email"
            control={Input}
            fluid
            label="Sähköposti"
            placeholder="Sähköposti yhteydenottoa varten"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.email &&
              formik.touched.email && {
                content: formik.errors.email,
              }
            }
          />
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY || ""}
            onChange={(value) => formik.setFieldValue("recaptcha", value)}
          />
        </Form.Group>
        <Button
          color="green"
          loading={loading}
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          content="Lähetä pyyntö"
          icon="save"
          labelPosition="left"
        />
      </Form>
    </Container>
  );
};
