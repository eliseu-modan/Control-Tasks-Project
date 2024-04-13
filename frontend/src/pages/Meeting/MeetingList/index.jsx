import React from "react";
import { MeetingCreate, MeetingList } from "../../../components/Meeting";

const Meetings = () => {
  return (
    <>
      <MeetingList></MeetingList>
      <MeetingCreate></MeetingCreate>
    </>
  );
};

export default Meetings;
