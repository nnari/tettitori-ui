import React from "react"
import { Container, Divider, Header, Segment, Image } from 'semantic-ui-react'

/* Import images we will use in this component
   Slightly dirty, but we aren't dealing with that many images.
*/
import Img1 from '../Images/carousel/1.jpg';
import Img2 from '../Images/carousel/2.jpg';
import Img3 from '../Images/carousel/3.jpg';

export const FrontPage = () => {
    return (
        <Container style={{ marginTop: '2em' }}>
            <Header as='h1' style={{ fontSize: '4.5em', textAlign: 'center' }}>Tettilä</Header>
            <Divider />
            <Segment clearing>
                <Image src={Img1} size='large' floated='left' />
                <p>
                    <b>Tettilä</b> on helppo tapa löytää itsellesi työelämän tutustumisjakso. Palvelussa Hämeen alueen yritykset voivat listata
                </p>
                <p>
                    Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine
                    definitiones. Quot wisi nulla ex duo. Vis sint solet expetenda ne, his te
                    phaedrum referrentur consectetuer. Id vix fabulas oporteat, ei quo vide
                    phaedrum, vim vivendum maiestatis in.
                </p>
                <p>
                    Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut
                    facer dolores adolescens, no illum aperiri quo, usu odio brute at. Qui te
                    porro electram, ea dico facete utroque quo. Populo quodsi te eam, wisi
                    everti eos ex, eum elitr altera utamur at. Quodsi convenire mnesarchum eu
                    per, quas minimum postulant per id.
                </p>
            </Segment>

        </Container >
    )
}

