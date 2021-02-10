import React from "react";
import { Label, Icon } from "semantic-ui-react";
import { JsxChild } from "typescript";
import { ActivityOrientationLabel } from "./ActivityOrientationLabel";

interface Props {
  activityOrientations: ActivityOrientation[];
  limit?: number;
}

let style = {
  marginTop: "1em",
};

export const ActivityOrientationLabelGroup = ({
  activityOrientations,
  limit = 5,
}: Props) => {
  if (activityOrientations.length > limit) {
    let limited = activityOrientations
      .slice(0, limit)
      .map((d) => <ActivityOrientationLabel labelTitle={d.title} />);
    return (
      <Label.Group style={style}>
        {limited} ... {activityOrientations.length - limit} liitettyä
        työprofiilia lisää
      </Label.Group>
    );
  }

  return (
    <Label.Group style={style} color="orange" size="medium">
      {activityOrientations.map((d) => (
        <ActivityOrientationLabel labelTitle={d.title} />
      ))}
    </Label.Group>
  );
};
