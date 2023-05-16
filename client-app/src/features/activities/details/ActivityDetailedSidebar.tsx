import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

export default observer(function ActivityDetailedSidebar () {
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='violet'
            >
                3 People Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    <Item style={{ position: 'relative' }}>
                        <Label
                            style={{ position: 'absolute' }}
                            color='pink'
                            ribbon='right'
                        >
                            Host
                        </Label>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as={Link} to={`#`}>
                                <h3>Boras</h3>
                            </Item.Header>
                            <Item.Extra style={{ color: 'violet' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style={{ position: 'relative' }}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as={Link} to={`#`}>
                                <h3>Calas</h3>
                            </Item.Header>
                            <Item.Extra style={{ color: 'violet' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style={{ position: 'relative' }}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as={Link} to={`#`}>
                                <h3>Jacas</h3>
                            </Item.Header>
                            <Item.Extra style={{ color: 'violet' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                </List>
            </Segment>
        </>

    )
})