import React, { SyntheticEvent } from "react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { Button, Reveal } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

interface Props{
    profile: Profile;
}

export default observer(function FollowButton({profile}: Props){

    const {profileStore, userStore} = useStore();
    const {updateFollowing, loading} = profileStore;

    if (profile.username === userStore.user?.username) return null;

    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }



    return(
        <Reveal animated="move">
            <Reveal.Content visible style={{width: '100%'}}>
                <Button 
                    fluid 
                    color={profile.following ? "pink" : 'purple'} 
                    content={profile.following ? 'Following' : 'Not Following'}/>
            </Reveal.Content>
            <Reveal.Content hidden style={{width: '100%'}}>
                <Button 
                    fluid 
                    basic 
                    color={profile.following ? 'purple' : 'pink'}
                    content={profile.following ? 'Unfollow' : 'Follow'}
                    loading={loading}
                    onClick={(e) => handleFollow(e, profile.username)}/>
            </Reveal.Content>
        </Reveal>
    )
})