import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Card, Segment, Header, Placeholder } from 'semantic-ui-react';
import { DegreeLabelGroup } from './Degree/DegreeLabelGroup';
import JobService from '../Services/JobService';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function QueryParamsDemo() {
    let query = useQuery();
}

export const JobFullView = () => {
    const [job, setJob] = useState<Job>({} as Job);
    const [loading, setLoading] = useState(true);
    const query = useQuery();

    useEffect(() => {
        const id = query.get("id");
        console.log(id);
        JobService.getSingleJob(id)?.then(j => {
            console.log(j);
            setJob(j);
            setTimeout(() => {
                setLoading(false);
            }, 3000)
        })
    }, [])

    return (
        !loading && job.author !== undefined ? (
            <Segment>
                <Header as='h2'>{job.title}</Header>
                <Header as='h3'>Tettipaikan kuvaus</Header>
                <Header as='h3'>Yhteystiedot</Header>
                <Header as='h3'>Osoite</Header>
                <Card.Content><DegreeLabelGroup degrees={job.relevantDegrees} limit={100} /></Card.Content>
            </Segment>)
            : renderPlaceHolder()
    );
}

const renderPlaceHolder = () => (
    <Segment>
    <Placeholder>
    {/* Title header */}
    <Placeholder.Header>
        <Placeholder.Line />
        <Placeholder.Line />
    </Placeholder.Header>
    {/* Description header */}
    <Placeholder.Header>
        <Placeholder.Line />
        <Placeholder.Line />
    </Placeholder.Header>
    {/* Description */}
    <Placeholder.Paragraph>
        <Placeholder.Line length='very long'/>
        <Placeholder.Line length='very long'/>
    </Placeholder.Paragraph>
    <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
    </Placeholder.Paragraph>
</Placeholder>
</Segment> 
)