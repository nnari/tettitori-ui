import {
    Segment, Container, Grid, List, Header, Divider, Image
} from 'semantic-ui-react';

export const Footer = () => {
    return (
        <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
            <Container textAlign='center'>
                <Grid divided inverted stackable>

                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Group 3' />
                        <List link inverted>
                            <List.Item as='a'>Link One</List.Item>
                            <List.Item as='a'>Link Two</List.Item>
                            <List.Item as='a'>Link Three</List.Item>
                            <List.Item as='a'>Link Four</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={10} textAlign='center'>
                        <Header inverted as='h4' content='Footer Header'/>
                        <p>
                            Extra space for a call to action inside the footer that could help re-engage users.
                  </p>
                    </Grid.Column>
                </Grid>

                <Divider inverted section />
                <List horizontal inverted divided link size='small'>
                    <List.Item as='a' href='#'>
                        Privacy Policy
                </List.Item>
                </List>
            </Container>
        </Segment>
    )
}
