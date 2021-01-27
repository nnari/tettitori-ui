import { Button, Form, TextArea, Input, DropdownProps, Message } from 'semantic-ui-react';
import {
    useFormik
} from 'formik';
import { SyntheticEvent } from 'react';
import JobService from '../Services/JobService';

//We're gonna need Yup for validation
import * as Yup from 'yup';

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
    }
}

const {title: t, description: d, contactInfo: c} = jobSchemaValues;

const JobSchema = Yup.object().shape({
    title: Yup.string()
      .min(t.min, `Otsikko on liian lyhyt! ${t.min}-${t.max} merkkiä.`)
      .max(50, `Otsikko on liian pitkä! ${t.min}-${t.max} merkkiä.`)
      .required(`Otsikko on pakollinen`),
    description: Yup.string()
      .min(15, `Kuvaus on liian lyhyt. ${d.min}-${d.max} merkkiä.`)
      .max(1000, `Kuvaus on liian pitkä. ${d.min}-${d.max} merkkiä.`)
      .required(`Kuvaus on pakollinen`),
    contactInfo: Yup.string()
    .min(2, `Yhteystiedot ovat liian lyhyet. ${c.min}-${c.max} merkkiä.`)
    .max(200, `Yhteystiedot ovat liian pitkät! ${c.min}-${c.max} merkkiä.`)
    .required(`Yhteystiedot ovat pakolliset`)
  });
  

interface Props {
    degrees: Degree[],
    user: User,
}

export const JobAddForm = ({ degrees, user }: Props) => {
    const DropdownDegrees = degrees.map(d => ({
        key: d._id,
        value: d._id,
        text: d.title,
    }))

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            contactInfo: '',
            address: '',
            relevantDegrees: [],
        },
        validationSchema: JobSchema,
        onSubmit: values => {
            const data = {
                title: values.title,
                relevantDegrees: values.relevantDegrees,
                body: {
                    description: values.description,
                    contactInfo: values.contactInfo,
                    address: values.address,
                }
            }
            JobService.postNewJob(data, user);
        },
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Field
                id='title'
                control={Input}
                label='Otsikko'
                placeholder='Tettipaikan otsikko'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.title && formik.touched.title && { content: formik.errors.title}}
            />
            <Form.Field
                id='description'
                control={TextArea}
                label='Kuvaus'
                placeholder='Tettipaikan kuvaus'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.description && formik.touched.description && { content: formik.errors.description}}
            />
            <Form.Field
                id='contactInfo'
                control={TextArea}
                label='Yhteystiedot'
                placeholder='Tettipaikan yhteystiedot'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.contactInfo && formik.touched.contactInfo && { content: formik.errors.contactInfo}}
            />
            <Form.Field
                id='address'
                control={TextArea}
                label='Osoite'
                placeholder='Tettipaikan osoite'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.address && formik.touched.address && { content: formik.errors.address}}
            />
            <Form.Dropdown
                id='relevantDegrees'
                placeholder='Tettipaikkaan liittyvät koulutukset'
                onChange={(e: SyntheticEvent, {value}: DropdownProps) => {
                    formik.setFieldValue("relevantDegrees", value);
                }}
                onBlur={formik.handleBlur}
                multiple
                search
                selection
                options={DropdownDegrees}
            />
            <Button type="submit">Submit</Button>
        </Form>
    );
};