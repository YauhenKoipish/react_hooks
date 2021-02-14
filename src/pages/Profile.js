import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Repos } from "../Components/Repos";
import { GitHubContext } from "../context/giHub/gitHubContext";

export const Profile = ({ match }) => {
  const { getUser, getRepos, loading, user, repos } = useContext(GitHubContext);
  const urlName = match.params.name;

  useEffect(() => {
    getUser(urlName);
    getRepos(urlName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    public_repos,
    public_gists,
    following,
  } = user;

  return (
    <Fragment>
      <Link to="/" className="btn btn-link"></Link>

      <div className="card mb-4">
        <div className="cad-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img src={avatar_url} alt="name" style={{ width: "150px" }} />
              <h1>{name}</h1>
              {location && <p>Location: {location}</p>}
            </div>
            <div className="col">
              {bio && (
                <>
                  <h3>BIO</h3>
                  <p>{bio}</p>
                </>
              )}
              <a
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
              >
                Open profile
              </a>
              <ul>
                {login && (
                  <li>
                    <strong>Username: </strong> {login}
                  </li>
                )}
                {company && (
                  <li>
                    <strong>Company: </strong> {company}
                  </li>
                )}
                {blog && (
                  <li>
                    <strong>Website: </strong> {blog}
                  </li>
                )}
              </ul>
              <div className="badge badge-primary mr-2">
                Followers: {followers}
              </div>
              <div className="badge badge-success mr-2">
                Following: {following}
              </div>
              <div className="badge badge-info mr-2">Repos: {public_repos}</div>
              <div className="badge badge-dark mr-2">Gists: {public_gists}</div>
            </div>
          </div>
        </div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};
