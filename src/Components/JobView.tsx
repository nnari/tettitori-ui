import React from 'react';
import { Header, Container, Divider, Segment } from 'semantic-ui-react';
import { DegreeLabelGroup } from './Degree/DegreeLabelGroup';

interface Props {
    job: Job
}

export const JobView = ({ job }: Props) => {
    return (
        <>
            <Segment>
                <Header as='h2'>{job.title}</Header>
                <Divider />
                <p>{job.body.description}</p>
                <DegreeLabelGroup degrees={job.relevantDegrees} limit={8}/>
            </Segment>
        </>
    );
}