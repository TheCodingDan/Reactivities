import React, { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivituListItem from "./ActivityListItem";

export default observer(function ActivityList(){
    
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore
    
    return(
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color="purple">
                        {group}
                    </Header>
                        {activities.map(activity => (
                            <ActivituListItem key={activity.id} activity={activity}/>
                ))}

                </Fragment>
            ))}
        </>
    
    )
})