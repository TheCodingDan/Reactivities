import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import { Photo, Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';

interface Props{
    profile: Profile;
}


export default observer (function ProfilePhotos({profile}: Props){

    const {profileStore:{isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    function handlePhotoUpload(file: Blob){
        uploadPhoto(file).then(() => setAddPhotoMode(false))
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement> ){
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handlePhotoDelete(photo: Photo, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
        
    }

    return(
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos'/>
                    {isCurrentUser && (
                        <Button floated='right' basic 
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)} 
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>
                    ) : (
                            <Card.Group itemsPerRow={5}>
                                {profile.photos?.map(photo => (
                                    <Card key={photo.id}>
                                        <Image src={photo.url}/>
                                        {isCurrentUser && (
                                            <Button.Group widths={2} fluid style={{paddingTop: '1px'}}>
                                                <Button
                                                    color='violet'
                                                    content='Main'
                                                    name={'main' + photo.id}
                                                    basic 
                                                    loading={target === 'main' + photo.id && loading}
                                                    disabled={photo.isMain || loading}
                                                    onClick={e => handleSetMainPhoto(photo, e)}
                                                />
                                                <Button
                                                    color='purple'
                                                    icon='trash'
                                                    name={photo.id}
                                                    basic 
                                                    loading={target === photo.id && loading}
                                                    disabled={photo.isMain || loading}
                                                    onClick={e => handlePhotoDelete(photo, e)}
                                                />
                                            </Button.Group>
                                        )}
                                    </Card>
                                                         
                                ))}
                            </Card.Group>
                        )}
                </Grid.Column>
            </Grid>
            
        </Tab.Pane>
    )
})