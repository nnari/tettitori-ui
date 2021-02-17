import React, { Dispatch, SetStateAction } from "react";
import { Dropdown, Header, Menu } from "semantic-ui-react";

interface Props {
  orientations: ActivityOrientation[];
  jobs: Job[];
  setFiltered: any;
}

const DropdownExampleMultipleSearchSelection = ({
  orientations,
  jobs,
  setFiltered,
}: Props) => {
  //Filters jobs by their relevant orientations
  //Works by removing returning items that do match the pattern
  const performFilterOrientations = (
    e: React.SyntheticEvent,
    { value }: any
  ) => {
    let filtered = jobs.filter((j: Job) => {
      //Return jobs when relevantOrientations contains every item of search array
      return j.relevantOrientations.some((o: ActivityOrientation) => {
        let found = value.find((e: any) => {
          return e === o._id;
        });
        return found;
      });
    });
    setFiltered(filtered);
  };

  const SearchOrientationsMap = orientations.map((o) => ({
    key: o._id,
    value: o._id,
    text: o.title,
  }));
  return (
    <Menu>
      <Menu.Item position="right">
        <Dropdown
          placeholder="Orientaatio"
          multiple
          search
          selection
          onChange={performFilterOrientations}
          options={SearchOrientationsMap}
        />
      </Menu.Item>
    </Menu>
  );
};

export default DropdownExampleMultipleSearchSelection;
