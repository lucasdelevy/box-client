import React, { useState } from "react";
import Button from "@material-ui/core/Button";

function FileNav(props) {
  const [state] = useState({
    path: props.newPath,
  });

  const goBackwards = () => {
    let newPath = state.path.split("/");
    newPath = newPath.slice(0, -2).join("/");
    newPath === ""
      ? props.returnFunc(newPath)
      : props.returnFunc(newPath + "/");
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-secondary">
        <div className="row col-12 d-flex justify-content-center text-white">
          <Button
            color="primary"
            variant="contained"
            onClick={goBackwards}
            disabled={state.path === "" ? true : false}
          >
            Back
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default FileNav;
