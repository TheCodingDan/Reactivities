import React, { useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceHolder";

export default observer(function ActivityDashboard(){

    const {activityStore} = useStore();
    const {loadActivities, loadingInitial, setPagingParams, pagination} = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);
 

    useEffect(() => {
        loadActivities();
    }, [loadActivities])

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Column width='10'>
                {(loadingInitial && !loadingNext) ? (
                    <>
                        <ActivityListItemPlaceholder/>
                        <ActivityListItemPlaceholder/>
                    </>
                ) : (
                    <InfiniteScroll 
                        pageStart={0} 
                        loadMore={handleGetNext} 
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}>

                        <ActivityList/>
                </InfiniteScroll>
                )}
                
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters/>
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>

        </Grid>
    )
})