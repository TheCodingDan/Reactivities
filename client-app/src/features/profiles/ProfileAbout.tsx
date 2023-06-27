import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/profile";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import React, { useState } from 'react';
import { useStore } from "../../app/stores/store";
import ProfileEditForm from "./Form/ProfileEditForm";

interface Props{
    profile: Profile;
}


export default observer (function ProfileAbout({profile}: Props){

    const {profileStore} = useStore();
    const {isCurrentUser} = profileStore;
    const [ProfileEditMode, setProfileEditMode] = useState(false);

    

    return(
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon='user' content={'About ' + profile.displayName}/>
                    {isCurrentUser && (
                      <Button
                        basic
                        content={ProfileEditMode ? 'Cancel' : 'Edit Profile'}
                        floated="right"
                        onClick={() => setProfileEditMode(!ProfileEditMode)}
                      />  
                            
                    )}
                </Grid.Column>

                <Grid.Column width={16}>
                    {!ProfileEditMode ? (
                        <span style={{whiteSpace: 'pre-wrap'}}>{profile.bio}</span>
                    ) : (
                        <ProfileEditForm setProfileEditMode={setProfileEditMode}/>
                    )}

                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})