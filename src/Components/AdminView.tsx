import React, { useState, useEffect } from "react";
import UserService, {
  AdminViewUser,
  AdminViewCreatedDTO,
  AdminDbView,
  AdminViewUserDeleteRequest,
} from "../Services/UserService";
import {
  Button,
  Image,
  List,
  Container,
  Divider,
  Header,
  Segment,
  Confirm,
  Input,
  Form,
} from "semantic-ui-react";
import { snackbarNotify } from "./Snackbar";

//We're gonna need Yup for validation
import * as Yup from "yup";
import { useFormik } from "formik";

interface Props {
  user: User;
}

const UserCreationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, `Käyttäjänimi on liian lyhyt! ${5}-${30} merkkiä.`)
    .max(30, `Käyttäjänimi on liian pitkä! ${5}-${30} merkkiä.`)
    .required(`Käyttäjänimi on pakollinen`),
  email: Yup.string()
    .email("Sähköposti on virheellinen")
    .required("Sähköposti on pakollinen"),
});

export const AdminView = ({ user }: Props) => {
  const [allUsers, setAllUsers] = useState<AdminDbView>([]);
  const [deleteTarget, setDeleteTarget] = useState<AdminViewUserDeleteRequest>(
    ""
  );
  const [isConfirming, setIsConfirming] = useState(false);
  const [addedUser, setAddedUser] = useState<AdminViewCreatedDTO | object>({});

  const init = async () => {
    let users = await UserService.getAllUsers(user);
    setAllUsers(users.filter((u) => u.username !== "admin"));
  };

  //#region Confirm handlers
  const handleConfirmCancel = () => {
    setIsConfirming(false);
  };

  const handleDeleteConfirm = () => {
    UserService.deleteUser(deleteTarget, user);
    //sync so no user confusion
    setAllUsers((prev) => prev.filter((a) => a._id !== deleteTarget));
    snackbarNotify(
      `Käyttäjä ${
        allUsers.find((e) => e._id === deleteTarget)?.username
      } poistettu.`
    );
    setIsConfirming(false);
  };

  const handleShowConfirm = (userToRemove: string) => {
    setDeleteTarget(userToRemove);
    setIsConfirming(true);
  };
  //#endregion

  //Load users
  useEffect(() => {
    init();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: UserCreationSchema,
    onSubmit: (values) => {
      const data = {
        username: values.username.trim(),
        email: values.email.trim(),
      };
      UserService.createUser(data, user).then((res) => {
        console.log(res);
        snackbarNotify(`Uusi käyttäjä lisätty: ${JSON.stringify(res)}`);
      });
      formik.resetForm();
    },
  });

  return (
    <Container style={{ marginTop: "2em" }}>
      <Header as="h1">Hallintapaneeli</Header>
      <Divider />
      <Header as="h1">Käyttäjät</Header>
      <Segment>
        <List divided>
          {allUsers.length > 0 &&
            allUsers.map((e) => (
              <List.Item>
                <List.Content floated="right">
                  <Button
                    compact
                    onClick={() => handleShowConfirm(e._id)}
                    color="red"
                  >
                    Poista
                  </Button>
                </List.Content>
                <List.Icon></List.Icon>
                <List.Content>{e.username}</List.Content>
              </List.Item>
            ))}
        </List>
      </Segment>
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h4">Lisää uusi käyttäjä</Header>
        <Form.Field
          id="username"
          control={Input}
          label="Käyttäjätunnus"
          placeholder="Käyttäjä kirjautuu tällä sisään."
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
          label="Sähköposti"
          placeholder="Sähköposti tallentuu tietokantaan myöhempää käyttöä varten."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors.email &&
            formik.touched.email && { content: formik.errors.email }
          }
        />
        <Button
          color="green"
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          content="Tallenna"
          icon="save"
          labelPosition="left"
        />
      </Form>
      <Confirm
        cancelButton="Ei, haluan pitää käyttäjän."
        confirmButton="Kyllä, haluan poistaa tämän käyttäjän."
        content="Käyttäjän poistaminen poistaa myös kaikki käyttäjän tettipaikat."
        open={isConfirming}
        onCancel={handleConfirmCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
};
