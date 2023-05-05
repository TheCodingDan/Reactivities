import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';


function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  //Essa linha define um estado para armazenar a atividade selecionada
  //em um componente React e define seu tipo como Activity ou undefined
  //isso permite que o componente renderize diferentes informações com
  //base na atividade selecionada
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    if(id){
      handleSelectActivity(id)
      setEditMode(true);
    }
    else{
      handleCancelSelectActivity();
    }
    
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    activity.id 
      // código para editar uma atividade existente
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      //código para criar uma nova atividade
      : setActivities([...activities, {...activity, id: uuid()}]);

      setEditMode(false);
      setSelectedActivity(activity);

  }
//a função filter vai criar uma nova lista de atividades sem a atividade com o id selecionado 
  function handleRemoveActivity(id: string){
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <>
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop:'7em'}}>
          <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          removeActivity={handleRemoveActivity}
          />
        </Container>
    </>
  );
}

export default App;
