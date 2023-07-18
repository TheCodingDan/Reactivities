import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilters(){

    const {activityStore} = useStore();
    const {predicate, setPredicate} = activityStore;

    return (
        <>
        <Menu vertical size="large" style={{width: '100%', marginTop: 28}}>
            <Header icon='filter' attached color="violet" content='Filters'/>
            <Menu.Item 
                content='All Activities'
                active={predicate.has('all')}
                onClick={() => setPredicate('all', 'true')}
            />
            <Menu.Item 
                content="I'm going"
                active={predicate.has('isGoing')}
                onClick={() => setPredicate('isGoing', 'true')}
            />
            <Menu.Item 
                content="I'm hosting"
                active={predicate.has('isHost')}
                onClick={() => setPredicate('isHost', 'true')}
            />
        </Menu>
        <Header />
        <Calendar
            onChange={(date: any) => setPredicate('startDate', date as Date)}
            value={predicate.get('startDate') || new Date()}
        />
        
        </>

    )

})