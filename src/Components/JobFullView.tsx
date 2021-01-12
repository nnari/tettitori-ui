import React from 'react';
import { Card } from 'semantic-ui-react';
import { DegreeLabelGroup } from './Degree/DegreeLabelGroup';

interface Props {
    job: Job
}

export const JobFullView = ({job}: Props) => {
    return (
        <Card>
            <Card.Header>{job.title}</Card.Header>
            <Card.Content>{job.body.description}</Card.Content>
            <Card.Content><DegreeLabelGroup degrees={job.relevantDegrees} limit={10}/></Card.Content>
        </Card>
    );
}