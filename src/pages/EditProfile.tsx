import React from "react";
import CreateLayout from "../components/Layout/CreateLayout";
import EditProfileForm from "../components/Form/EditProfileForm/EditProfileForm";

const EditProfile = ({ signupCompleted }: any) => {
  console.log(signupCompleted);
  return (
    <CreateLayout breadcrumbLabel="Modifica dati" title="Profilo">
      <EditProfileForm />
    </CreateLayout>
  );
};

export default EditProfile;
