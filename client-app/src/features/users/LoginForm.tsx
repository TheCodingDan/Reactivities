import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm(){
    const {userStore} = useStore();
    return(
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(() => 
                setErrors({error: 'Invalid Email or Password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Login To Reactivities' color="purple" textAlign="center"/>
                    <MyTextInput name="email" placeholder="Email"/>
                    <MyTextInput name="password" placeholder="Password" type="password"/>
                    <ErrorMessage
                        name="error" render={() => 
                        <Label style={{marginBottom: 10}} basic color='violet' content={errors.error}/>} 
                    />
                    <Button loading={isSubmitting} color="purple" content='Login' type='submit' fluid/>
                </Form>
            )}
        </Formik>
    )
})