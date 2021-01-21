import React from 'react'
import { Label, Icon } from 'semantic-ui-react';
import { DegreeLabel } from './DegreeLabel';

interface Props {
  degrees: Degree[],
  limit?: number
}

let style = {
  marginTop: "1em"
}

export const DegreeLabelGroup = ({ degrees, limit = 5}: Props) => {
    if(degrees.length > limit) {
        let limited = degrees.slice(0, limit).map((d) =>
            <DegreeLabel labelTitle={d.title}/>
        )
        return (
            <Label.Group style={style}>
            {limited} ... {degrees.length - limit} liitettyä tutkintoa lisää
            </Label.Group>
        )
    }

  return (
    <Label.Group style={style} size='small'>
      {degrees.map(d => <DegreeLabel labelTitle={d.title}/>)}
    </Label.Group>
  )
}
