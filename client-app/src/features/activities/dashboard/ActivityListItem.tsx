import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
    activity: Activity
}

export default function ActivituListItem({activity}: Props) {

    const {activityStore} = useStore();
    const {deleteActivity, loading} = activityStore

    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name)
        deleteActivity(id);
    }
    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                <h3>{activity.title}</h3>
                            </Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='calendar alternate' color='violet'/> {activity.date}
                </span>
            </Segment>
            <Segment>
                <span>
                    <Icon name='marker' color="pink"/> {activity.venue}, {activity.city}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                </span>

                <Button  
                        name={activity.id}
                        loading={loading && target === activity.id}
                        color="violet"
                        floated="right"
                        icon='trash alternate'
                        onClick={(e) =>handleActivityDelete(e, activity.id)} />
                 <Button as={Link} to={`/activities/${activity.id}`} className="custom-link"
                        color='purple'
                        floated='right'
                        icon='eye'/>
            
                         
            </Segment>
        </Segment.Group>
    )
}