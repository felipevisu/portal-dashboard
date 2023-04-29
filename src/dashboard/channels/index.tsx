import React from "react";
import { Route, Routes } from "react-router-dom";

import ChannelCreate from "./views/ChannelCreate";
import { ChannelDetails } from "./views/ChannelDetails";
import ChannelList from "./views/ChannelList";

export const Channels = () => {
  return (
    <Routes>
      <Route path="/" element={<ChannelList />} />
      <Route path="/create" element={<ChannelCreate />} />
      <Route path="/details/:id" element={<ChannelDetails />} />
    </Routes>
  );
};

export default Channels;
