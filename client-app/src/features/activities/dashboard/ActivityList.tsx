import React, { SyntheticEvent, useState } from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props{
    activities: Activity[];
    selectActivity: (id: string) => void;
    removeActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({activities, selectActivity, removeActivity, submitting}: Props){
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name)
        removeActivity(id);
    }
    return(
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                    name={activity.id}
                                    loading={submitting && target === activity.id} 
                                    floated="right" 
                                    content='Remove' 
                                    color="red" 
                                    onClick={(e) => handleActivityDelete(e, activity.id)}/>
                                <Button floated='right' content='View' color="blue" onClick={() => selectActivity(activity.id)}/>
                                <Label basic content={activity.category} color="purple"/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}