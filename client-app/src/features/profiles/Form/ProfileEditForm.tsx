import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { Profile } from "../../../app/models/profile";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Button } from "semantic-ui-react";

interface Props{
    setProfileEditMode: (ProfileEditMode: boolean) => void;
}

export default observer (function ProfileEditForm({setProfileEditMode}: Props){

    const {profileStore} = useStore();
    const {updateProfile, profile} = profileStore;

    const validationSchema = Yup.object({
        displayName: Yup.string().required()
    })

    function handleFormSubmit(profile: Partial<Profile>) {
        updateProfile(profile).then(() => {
            setProfileEditMode(false);
        })
    }

    return(
        <Formik
            validationSchema={validationSchema}
            initialValues={{displayName: profile?.displayName, bio: profile?.bio}}
            onSubmit={values => handleFormSubmit(values)}>
            {({isValid, isSubmitting, dirty, handleSubmit}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput placeholder={"DisplayName"} name={"displayName"}/>
                    <MyTextArea placeholder={"Add your bio."} name={"bio"} rows={3}/>
                    <Button
                        color="violet"
                        content='Update Profile'
                        loading={isSubmitting}
                        disabled={!isValid || !dirty || isSubmitting}
                        type="submit"
                      
                    />
                </Form>
            )}
        
        </Formik>
    )
})