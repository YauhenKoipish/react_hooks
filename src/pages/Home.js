import React, { useContext } from "react";
import { Card } from "../Components/Card";
import { Search } from "../Components/Search";
import { GitHubContext } from "../context/giHub/gitHubContext";

export const Home = () => {
  const { loading, users } = useContext(GitHubContext);

  return (
    <>
      <Search />
      <div className="row">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="col-sm-4 mb-4">
              <Card user={user} />
            </div>
          ))
        )}
      </div>
    </>
  );
};
