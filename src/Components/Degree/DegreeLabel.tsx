import React from "react";
import { Label, Icon, LabelProps } from "semantic-ui-react";

interface Props {
  labelTitle: String;
}

export const DegreeLabel = ({ labelTitle }: Props) => {
  return <Label>{labelTitle}</Label>;
};
