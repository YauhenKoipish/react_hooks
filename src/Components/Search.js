import React, { useContext, useState } from "react";
import { AlertContext } from "../context/alert/alertContext";
import { GitHubContext } from "../context/giHub/gitHubContext";

export const Search = () => {
  const [value, setValue] = useState("");
  const alert = useContext(AlertContext);
  const github = useContext(GitHubContext);

  const onSubmit = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    if (value.trim()) {
      alert.hide();
      github.search(value.trim());
    } else {
      alert.show("Enter user data!");
      github.clearUsers();
    }
  };

  return (
    <div className="form-group">
      <input
        name="form-control"
        placeholder="Enter name"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={onSubmit}
      />
    </div>
  );
};
