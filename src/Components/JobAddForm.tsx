import { Button, Form, TextArea, Input, DropdownProps, Message } from 'semantic-ui-react';
import {
    useFormik
} from 'formik';
import { SyntheticEvent } from 'react';
import JobService from '../Services/JobService';

//We're gonna need Yup for validation
import * as Yup from 'yup';

const JobSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Otsikko on liian lyhyt!')
      .max(50, 'Otsikko on liian pitkä!')
      .required('Otsikko on pakollinen'),
    description: Yup.string()
      .min(15, 'Kuvaus on liian lyhyt.')
      .max(1000, 'Kuvaus on liian pitkä.')
      .required('Kuvaus on pakollinen'),
    contactInfo: Yup.string()
    .min(2, "Yhteystiedot ovat liian lyhyet.")
    .max(200, "Yhteystiedot ovat liian pitkät!")
    .required("Yhteystiedot ovat pakolliset")
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