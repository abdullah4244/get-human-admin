import React from "react";
import "./SearchPage.scss";
import { useState } from "react";
import axios from "axios";
import DebounceSelect from "../DebounceSelect/DebounceSelect";

async function fetchOrganizationList(username) {
  console.log('fetching user', username);
  return axios
  .get(`http://localhost:8000/api/organizations/?name=${username}`)
  .then(function ({data}) {
     const structure =data.data.organizations.map((organization)=>({
      label: `${organization.CompanyName}`,
      value: organization._id,
    }))
    return structure
  });
}
const SearchPage = () => {

  const [value, setValue] = useState('');



  return (
    <DebounceSelect
    value={value} 
    fetchOptions={fetchOrganizationList}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
  );
};

export default SearchPage;
