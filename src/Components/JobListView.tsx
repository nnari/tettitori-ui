import React from 'react';
import { JobView } from './JobView';
import { Container } from 'semantic-ui-react';


interface Props {
    jobs: Job[]
}

export const JobListView = ({jobs}: Props) => {
    return (
        <Container fluid>
            {jobs.map((job: Job) => <JobView job={job}/>)}
        </Container>
    );
}