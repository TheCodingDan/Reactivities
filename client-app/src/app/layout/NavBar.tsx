import React from "react";
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, Image, Menu} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar()
{
    const {userStore: {user, logout}} = useStore();
    return(
        <Menu inverted fixed='top' className='my-navbar'>
            <Container>
                <Menu.Item as={NavLink} to='/' header className="custom-link">
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities" className="custom-link"/>
                <Menu.Item as={NavLink} to='/errors' name="Errors" className="custom-link"/>
                <Menu.Item>
                    <Button content='Create Activity' as={NavLink} to='/createActivity'/>
                </Menu.Item>
                <Menu.Item position="right">
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right'/>
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <DropdownMenu>
                            <DropdownItem as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user'/>
                            <DropdownItem onClick={logout} text='Logout' icon='power'/>
                        </DropdownMenu>
                    </Dropdown>
                </Menu.Item>

            </Container>

        </Menu>
    )
})