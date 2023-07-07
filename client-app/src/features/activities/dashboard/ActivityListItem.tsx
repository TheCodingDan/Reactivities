import React from "react";
import { Link} from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
    activity: Activity
}

export default function ActivityListItem({activity}: Props) {


    return(
        <Segment.Group>
            <Segment>
                {activity.isCancelled &&
                    <Label attached="top" color="violet" content = 'Cancelled' style={{textAlign: 'center'}}/>
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBottom: 3}} size='tiny' circular src={activity.host?.image || '/assets/user.png'}/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                <h3>{activity.title}</h3>
                            </Item.Header>
                            <Item.Description>Hosted by <Link to={`/profiles/${activity.hostUsername}`}>
                                    {activity.host?.displayName}
                                </Link>
                            </Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label basic color="pink">
                                        You are hosting this activity
                                    </Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color="violet">
                                        You are going to this activity
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='calendar alternate' color='violet'/> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment>
                <span>
                    <Icon name='marker' color="pink"/> {activity.venue}, {activity.city}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!}   />
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                </span>
                 <Button as={Link} to={`/activities/${activity.id}`} className="custom-link"
                        color='purple'
                        floated='right'
                        content='See Activity'
                        />
                        
            
                         
            </Segment>
        </Segment.Group>
    )
}