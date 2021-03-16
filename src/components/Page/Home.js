import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { getUserData, listFiles } from "../../utils/GraphQLUtils";
import Header from "../Header/Header";
import { ReactComponent as DirLogo } from "../../resources/files/folder.svg";
import { ReactComponent as TextLogo } from "../../resources/files/file-text.svg";
import { ReactComponent as ImgLogo } from "../../resources/files/file-img.svg";
import "./home.css";
import { Grid, makeStyles } from "@material-ui/core";
import FileNav from "../Header/FileNav";

function Home(props) {
  const [state, setState] = useState({
    email: "",
    userId: "",
    fileList: [],
    path: "",
    fileState: {},
    doRender: false,
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const onFileClick = (fileName) => {
    const fileStateAllFalse = state.fileList.map(() => false);
    const currentStateOfFile = state.fileState[fileName];
    console.log(fileStateAllFalse)
    console.log(currentStateOfFile)
    setState({
      ...state,
      doRender: true,
      fileState: { ...fileStateAllFalse, [fileName]: !currentStateOfFile },
    });
    console.log(state)
  };

  const goBackWards = (path) => {
    setState({ ...state, path, doRender: false });
  };

  const onFileDoubleClick = (fileName) => {
    if (fileName.indexOf("/")) {
      setState({
        ...state,
        path: state.path + fileName,
        doRender: false,
      });
    }
  };

  const cookies = new Cookies();
  const isAuthenticated = cookies.get("isAuthenticated");

  const fetchUserData = async (email, token) => {
    const userData = await getUserData(email, token);
    const fileList = await listFiles(email, token, state.path);
    const fileStateAllFalse = fileList.files.map(() => false);
    setState({
      ...state,
      email: userData.email,
      userId: userData.userId,
      doRender: true,
      fileList: fileList.files,
      fileState: fileStateAllFalse,
    });
  };

  const renderFileList = () => {
    const fileListForRender = state.fileList.map((fileName) => {
      if (fileName.indexOf("/") > 0) {
        return (
          <div id={`div-${fileName}`}>
            <Grid item xs={3}>
              <DirLogo
                id={{ fileName }}
                className={
                  state.fileState[fileName] ? "fileLogoSelected" : "fileLogo"
                }
                onClick={() => {
                  onFileClick(fileName);
                }}
                onDoubleClick={() => {
                  onFileDoubleClick(fileName);
                }}
              />
            </Grid>
            {fileName.replace("/", "")}
          </div>
        );
      } else if (fileName.indexOf(".png") > 0) {
        return (
          <div id={`div-${fileName}`}>
            <Grid item xs={3} id={`grid-${fileName}`}>
              <ImgLogo
                id={{ fileName }}
                className={
                  state.fileState[fileName] ? "fileLogoSelected" : "fileLogo"
                }
                onClick={() => {
                  onFileClick(fileName);
                }}
              />
            </Grid>
            {fileName}
          </div>
        );
      } else {
        return (
          <div id={`div-${fileName}`}>
            <Grid item xs={3} id={`grid-${fileName}`}>
              <TextLogo
                id={{ fileName }}
                className={
                  state.fileState[fileName] ? "fileLogoSelected" : "fileLogo"
                }
                onClick={() => {
                  onFileClick(fileName);
                }}
              />
            </Grid>
            {fileName}
          </div>
        );
      }
    });

    return <div>{fileListForRender}</div>;
  };

  if (isAuthenticated === "true") {
    const email = cookies.get("email");
    const token = cookies.get("token");

    if (!state.doRender) {
      fetchUserData(email, token);
      return <div />;
    } else {
      if (state.fileList.length === 0) {
        return <div />;
      }
      return (
        <div>
          <Header />
          <FileNav newPath={state.path} returnFunc={goBackWards} />
          <div className="container d-flex align-items-center flex-column">
            <div className="card col-14 col-lg-12 mt-2">
              <div className="fileList">
                <Grid container className={classes.root} spacing={3}>
                  {renderFileList()}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
}
export default Home;
