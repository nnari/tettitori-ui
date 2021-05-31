import {
  Button,
  Form,
  TextArea,
  Input,
  DropdownProps,
  Message,
  Header,
} from "semantic-ui-react";
import { useFormik } from "formik";
import { SyntheticEvent, useEffect } from "react";
import JobService from "../Services/JobService";
import { snackbarNotify } from "./Snackbar";

//We're gonna need Yup for validation
import * as Yup from "yup";

const jobSchemaValues = {
  title: {
    min: 3,
    max: 50,
  },
  description: {
    min: 3,
    max: 1000,
  },
  contactInfo: {
    min: 3,
    max: 200,
  },
};

const { title: t, description: d, contactInfo: c } = jobSchemaValues;

//yeah get rid of this
const phoneRegExp = /^(?=.*[0-9])[- +()0-9]+$/;

const JobSchema = Yup.object().shape({
  title: Yup.string()
    .min(t.min, `Otsikko on liian lyhyt! ${t.min}-${t.max} merkkiä.`)
    .max(t.max, `Otsikko on liian pitkä! ${t.min}-${t.max} merkkiä.`)
    .required(`Otsikko on pakollinen`),
  companyName: Yup.string().required("Yrityksen nimi on pakollinen."),
  description: Yup.string()
    .min(d.min, `Kuvaus on liian lyhyt. ${d.min}-${d.max} merkkiä.`)
    .max(d.max, `Kuvaus on liian pitkä. ${d.min}-${d.max} merkkiä.`)
    .required(`Kuvaus on pakollinen`),
  contactInfo: Yup.object().shape({
    email: Yup.string()
      .email("Sähköposti on virheellinen")
      .required("Sähköposti on pakollinen"),
    phoneNumber: Yup.string()
      .trim()
      .matches(phoneRegExp, {
        message: "Puhelinnumero ei ole sallitussa muodossa",
      })
      .required("Puhelinnumero on pakollinen"),
  }),
  address: Yup.object().shape({
    zipcode: Yup.string()
      .trim()
      .test(
        "len",
        "Postinumeron pitää olla viisimerkkinen",
        (val) => val?.length === 5
      ),
  }),
});

interface Props {
  degrees: Degree[];
  orientations: ActivityOrientation[];
  user: User;
  currentJob?: Job;
  setEditTarget: React.Dispatch<React.SetStateAction<Job | undefined>>;
}

export const JobAddForm = ({
  degrees,
  user,
  orientations,
  currentJob,
  setEditTarget,
}: Props) => {
  const DropdownOrientations = orientations.map((o) => ({
    key: o._id,
    value: o._id,
    text: o.title,
  }));
  const DropdownDegrees = degrees.map((d) => ({
    key: d._id,
    value: d._id,
    text: d.title,
  }));

  const initialFormData = currentJob
    ? {
        id: currentJob._id,
        title: currentJob.title,
        description: currentJob.body.description,
        companyName: currentJob.companyName,
        additionalInfo: currentJob.body.additionalInfo,
        contactInfo: currentJob.body.contactInfo,
        address: currentJob.body.address,
        relevantDegrees: currentJob.relevantDegrees,
        relevantOrientations: currentJob.relevantOrientations,
      }
    : {
        title: "",
        description: "",
        companyName: "",
        additionalInfo: "",
        contactInfo: {
          email: "",
          phoneNumber: "",
        },
        address: {
          streetaddress: "",
          zipcode: "",
          city: "",
        },
        relevantDegrees: [],
        relevantOrientations: [],
      };

  // In case there's existing job form data, use those as fields
  const formik = useFormik({
    initialValues: { ...initialFormData },
    enableReinitialize: true,
    validationSchema: JobSchema,
    onSubmit: (values) => {
      const data = {
        id: values.id,
        title: values.title.trim(),
        relevantDegrees: values.relevantDegrees,
        relevantOrientations: values.relevantOrientations,
        companyName: values.companyName.trim(),
        body: {
          description: values.description.trim(),
          contactInfo: {
            email: values.contactInfo.email.trim(),
            phoneNumber: values.contactInfo.phoneNumber.trim(),
          },
          additionalInfo: values.additionalInfo.trim(),
          address: {
            city: values.address.city.trim(),
            streetaddress: values.address.streetaddress.trim(),
            zipcode: values.address.zipcode,
          },
        },
      };
      if (currentJob) {
        JobService.editJob(data, user);
        formik.resetForm();
        setEditTarget(undefined);
      } else {
        JobService.postNewJob(data, user);
        formik.resetForm();
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        id="title"
        control={Input}
        label="Tehtävänimike"
        value={formik.values.title}
        placeholder="Tehtävänimike on kuvaus tettipaikalla tapahtuvista tehtävistä (Esim. Valokuvaaja, parturi-kampaaja)."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.errors.title &&
          formik.touched.title && { content: formik.errors.title }
        }
      />
      <Form.Field
        id="description"
        control={TextArea}
        label="Kuvaus"
        value={formik.values.description}
        placeholder="Tettipaikan / tehtävänimikkeen kuvaus. Tämän perusteella opiskelija todennäköisesti valitsee tettipaikkansa."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.errors.description &&
          formik.touched.description && { content: formik.errors.description }
        }
      />
      <Form.Field
        id="companyName"
        control={Input}
        label="Tettipaikkaa tarjoavan yrityksen nimi"
        value={formik.values.companyName}
        placeholder="Tettipaikkaa tarjoavan yrityksen nimi."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.errors.companyName &&
          formik.touched.companyName && { content: formik.errors.companyName }
        }
      />
      <Header as="h4">Tettipaikan yhteystiedot</Header>
      <Form.Group widths="equal">
        <Form.Field
          id="contactInfo.email"
          control={Input}
          fluid
          value={formik.values.contactInfo.email}
          label="Sähköposti"
          placeholder="Sähköposti yhteydenottoa varten"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors.contactInfo?.email &&
            formik.touched.contactInfo?.email && {
              content: formik.errors.contactInfo.email,
            }
          }
        />
        <Form.Field
          id="contactInfo.phoneNumber"
          control={Input}
          fluid
          value={formik.values.contactInfo.phoneNumber}
          label="Puhelinnumero"
          placeholder="Puhelinnumero yhteydenottoa varten"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors.contactInfo?.phoneNumber &&
            formik.touched.contactInfo?.phoneNumber && {
              content: formik.errors.contactInfo.phoneNumber,
            }
          }
        />
      </Form.Group>
      <Form.Field
        id="additionalInfo"
        control={TextArea}
        label="Lisätiedot"
        value={formik.values.additionalInfo}
        placeholder="Tettipaikan lisätiedot (esim. toivottu yhteenottotapa, verkko-osoite)"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Header as="h4">Tettipaikan osoitetiedot</Header>
      <Form.Field
        id="address.streetaddress"
        control={Input}
        value={formik.values.address.streetaddress}
        label="Katuosoite"
        placeholder="Tettipaikan katuosoite"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Form.Group widths="equal">
        <Form.Field
          id="address.city"
          control={Input}
          fluid
          value={formik.values.address.city}
          label="Kaupunki"
          placeholder="Kaupunki, missä tettipaikka sijaitsee"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Form.Field
          id="address.zipcode"
          control={Input}
          value={formik.values.address.zipcode}
          label="Postinumero"
          placeholder="Tettipaikan postinumero"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors.address?.zipcode &&
            formik.touched.address?.zipcode && {
              content: formik.errors.address.zipcode,
            }
          }
        />
      </Form.Group>
      {/* <Header as="h4">Tettipaikan lisätietokentät</Header> */}
      {/* Remove orientations for now since there is no use case */}
      {/* <Form.Dropdown
        id="relevantOrientations"
        label="Liittyvät työprofiilit"
        placeholder="Tettipaikkaan liittyvät työprofiilit"
        onChange={(e: SyntheticEvent, { value }: DropdownProps) => {
          formik.setFieldValue("relevantOrientations", value);
        }}
        onBlur={formik.handleBlur}
        multiple
        search
        selection
        options={DropdownOrientations}
      /> */}

      {/* Disabled because of no use case */}
      {/* <Form.Dropdown
        label="Liittyvät koulutukset"
        id="relevantDegrees"
        placeholder="Tettipaikkaan liittyvät koulutukset"
        onChange={(e: SyntheticEvent, { value }: DropdownProps) => {
          formik.setFieldValue("relevantDegrees", value);
        }}
        defaultSelectedLabel={"test"}
        onBlur={formik.handleBlur}
        multiple
        search
        selection
        options={DropdownDegrees}
      /> */}
      <Button
        color="green"
        type="submit"
        disabled={!(formik.isValid && formik.dirty)}
        content="Tallenna"
        icon="save"
        labelPosition="left"
      />
    </Form>
  );
};
