import React from "react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

interface Props{
    profile: Profile;
}

export default observer(function ProfileCard({profile}: Props) {

    function truncate (bio: string | undefined) {
        if (bio){
            return bio.length > 40 ? bio.substring(0,37) + '...' : bio;
        }
    }


    return(
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'}/>
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{truncate(profile.bio)}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name="user"/>
                {profile.followersCount} {profile.followersCount === 1 ? 'follower' : 'followers'}
            </Card.Content>
            <FollowButton profile={profile}/>
        </Card>
    )
})