import {Offcanvas, Button, ListGroup} from "react-bootstrap";
import {React, useState} from "react";
import Player from '../components/tracks/Player'

function SideBar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const menuItems = [
        {text: 'Главная', href: '/'},
        {text: 'Список треков', href: '/tracks'},
        {text: 'Список альбомов', href: '/albums'},
        {text: 'Создать трек', href: '/create-track'}
    ]
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        {menuItems.map(item => <ListGroup.Item action href={item.href}
                                                               key={item.text}>{item.text}</ListGroup.Item>)}
                    </ListGroup>

                </Offcanvas.Body>
            </Offcanvas>
            <Player/>
        </>
    );
}

export default SideBar
