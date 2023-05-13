import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar()
{
    return(
        <Menu inverted fixed='top' className='my-navbar'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities"/>
                <Menu.Item>
                    <Button positive content='Create Activity' as={NavLink} to='/createActivity'/>
                </Menu.Item>

            </Container>

        </Menu>
    )
}