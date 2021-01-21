import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Card, Segment, Header, TextArea, Form } from 'semantic-ui-react';
import { DegreeLabelGroup } from './Degree/DegreeLabelGroup';

interface Props {
    job: Job
}


/* declare interface Job {
    _id: string,
    title: string,
    relevantDegrees: Degree[],
    authorDisplayName: string,
    author: string,
    body: {
        description: string,
        contactInfo: string,
        address: string,
    },
} */

export const JobFullView = ({ job }: Props) => {
    const [updatedJob, setUpdatedJob] = useState<Job>({ ...job } as Job);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(updatedJob);
        setUpdatedJob((prevState: Job) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleUpdate = (e: any) => {

    }

    return (
        <Segment>
            <Form>
                <Header as='h2'>{job.title}</Header>
                <Header as='h3'>Tettipaikan kuvaus</Header>
                <TextArea name="body.description" onChange={handleInput}>{updatedJob.body.description}</TextArea>
                <Header as='h3'>Yhteystiedot</Header>
                <TextArea name="body.contactInfo" onChange={handleInput}>{updatedJob.body.contactInfo}</TextArea>
                <Header as='h3'>Osoite</Header>
                <TextArea name="body.address" onChange={handleInput}>{updatedJob.body.address}</TextArea>
                <Card.Content><DegreeLabelGroup degrees={job.relevantDegrees} limit={100} /></Card.Content>
            </Form>
        </Segment>
    );
}
