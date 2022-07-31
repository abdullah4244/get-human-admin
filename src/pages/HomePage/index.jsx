import React from "react";
import RecentSearch from "../../components/RecentSearch/RecentSearch";
import SearchPage from "../../components/SearchPage/SearchPage";
import "./index.scss";

const HomePage = () => {
  return (
    <div className="homePageWrapper">
      <div className="searchSection">
        <div className="search-elements">
          <h1>Fix Your Customer Service Issues Faster.</h1>
          <h2>Get a rep on the phone faster & get better help.</h2>
        </div>
        <div className="autoCompleteSection">
            <SearchPage  />
        </div>
      </div>
      <RecentSearch/>
      <div className="footer">
        <a href="#">Test</a>
        <span>@ Get Human</span>
      </div>
    </div>
  );
};

export default HomePage;
