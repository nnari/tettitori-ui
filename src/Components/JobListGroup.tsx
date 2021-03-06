import React, { useEffect } from "react";
import { JobListItem } from "./JobListItem";
import { Container } from "semantic-ui-react";

interface Props {
  jobs: Job[];
}

export const JobListGroup = ({ jobs }: Props) => {
  return (
    <>
      {jobs
        .map((job: Job, idx: number) => <JobListItem job={job} key={idx} />)
        .sort()}
    </>
  );
};
