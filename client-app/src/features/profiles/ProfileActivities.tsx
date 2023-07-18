import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useEffect } from 'react';
import { useStore } from '../../app/stores/store';
import { Card, Grid, Header, Image, Tab, TabProps } from 'semantic-ui-react';
import { UserActivity } from '../../app/models/profile';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default observer(function ProfileActivities(){

    const panes = [
        {menuItem: "Future Activities", pane: {key: "future"}},
        {menuItem: "Past Activities", pane: {key: "past"}},
        {menuItem: "Hosting", pane: {key: "hosting"}}
    ];

    const {profileStore} = useStore();
    const {profile, userActivities, loadUserActivities, loadingActivities} = profileStore;

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadUserActivities(profile!.username, panes[data.activeIndex as number].pane.key);
    }

    useEffect(() => {
        loadUserActivities(profile!.username, "future");
    }, [loadUserActivities, profile]);


    return(
        <Tab.Pane loading={loadingActivities}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated='left'
                        content='Activities'
                        icon='calendar'
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        menu={{secondary: true, pointing: true}}
                        panes={panes}
                        onTabChange={(e,data) => handleTabChange(e , data)}
                    />
                    <br/>
                    <Card.Group itemsPerRow={4}>
                        {userActivities.map((activity: UserActivity) => (
                            <Card as={Link} to={`/activities/${activity.id}`} key={activity.id}>
                                <Image 
                                    src={`/assets/categoryImages/${activity.category}.jpg`}
                                    style={{minHeight: 100, objectFit: "cover" }}
                                />
                                <Card.Content>
                                <Card.Header textAlign='center'>{activity.title}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>
                                            {format(new Date(activity.date), 'do LLL')}
                                        </div>
                                        <div>
                                            {format(new Date(activity.date), 'h:mm a')}
                                        </div>
                                        
                                    </Card.Meta>
                                </Card.Content>
                                
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>

    )
})