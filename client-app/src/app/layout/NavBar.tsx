import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar()
{
    return(
        <Menu inverted fixed='top' className='my-navbar'>
            <Container>
                <Menu.Item as={NavLink} to='/' header className="custom-link">
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities" className="custom-link"/>
                <Menu.Item>
                    <Button content='Create Activity' as={NavLink} to='/createActivity'/>
                </Menu.Item>

            </Container>

        </Menu>
    )
}