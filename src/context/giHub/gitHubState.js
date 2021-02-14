import React, { useReducer } from "react";
import axios from "axios";
import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
  SET_LOADING,
} from "../types";
import { GitHubContext } from "./gitHubContext";
import { gitHubReducer } from "./gitHubReducer";

const CLIET_ID = process.env.REACT_APP_CLIENT_ID;
const CLIET_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const withCreds = (url) => {
  return `${url}client_id=${CLIET_ID}&client_secret=${CLIET_SECRET}`;
};

export const GitHubState = ({ children }) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repos: [],
  };

  const [state, dispatch] = useReducer(gitHubReducer, initialState);

  const search = async (value) => {
    const response = await axios.get(
      withCreds(`https://api.github.com/search/users?q=${value}&`)
    );
    setLoading();
    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items,
    });
  };

  const getUser = async (name) => {
    setLoading();
    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}?`)
    );

    dispatch({
      type: GET_USER,
      payload: response.data,
    });
  };

  const getRepos = async (name) => {
    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`)
    );
    setLoading();
    dispatch({
      type: GET_REPOS,
      payload: response.data,
    });
  };

  const clearUsers = () => {
    setLoading();
    dispatch({
      type: CLEAR_USERS,
    });
  };

  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  const { user, users, repos, loading } = state;

  return (
    <GitHubContext.Provider
      value={{
        setLoading,
        clearUsers,
        getRepos,
        getUser,
        search,
        user,
        users,
        repos,
        loading,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};
