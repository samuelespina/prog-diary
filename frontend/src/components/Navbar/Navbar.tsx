import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";

const Navbar = () => {
  const [allLanguages, setAllLanguages] = useState<Array<string>>([]);
  const [usages, setUsages] = useState<Array<string>>([]);
  const navigate = useNavigate();
  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const [relatedLanguages, setRelatedLanguages] = useState<Array<string>>([]);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [whatToFatch, setWhatToFatch] = useState<number>(0);
  const [title, setTitle] = useState<number>(0);
  const [toggleIconStatus, SetToggleIconStatus] = useState<boolean>(false);

  const getLanguages = () => {
    axios
      .get("http://localhost:8081/get-programming-languages")
      .then((res) => {
        setAllLanguages(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getUsages = () => {
    axios
      .get("http://localhost:8081/get-usages")
      .then((res) => setUsages(res.data))
      .catch((err) => console.log("DIOOOOOOO", err));
  };

  const getRelatedLanguages = (usage: string) => {
    axios
      .post("http://localhost:8081/get-related-languages", { usage })
      .then((res) => setRelatedLanguages(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <header
      className={`navbar-wrapper ${menuStatus ? "active" : "inactive"}`}
      style={
        window.location.pathname === "/signup" ||
        window.location.pathname === "/login" ||
        window.location.pathname === "/forgot-password" ||
        window.location.pathname === "/recovery-password" ||
        window.location.pathname === "/reset-password"
          ? { display: "none" }
          : {}
      }
    >
      <div className={`menu ${fetchStatus ? "active" : "inactive"}`}>
        <div className="navbar">
          <FontAwesomeIcon
            icon={faHouse}
            onClick={() => {
              navigate("/");
              setMenuStatus(false);
            }}
          />

          <h2
            className={`title ${title === 1 ? "active" : "inactive"}`}
            onClick={() => {
              getLanguages();
              setFetchStatus(true);
              setWhatToFatch(1);
              setTitle(1);
            }}
          >
            LANGUAGES
          </h2>

          <h2
            className={`title ${title === 2 ? "active" : "inactive"}`}
            onClick={() => {
              getUsages();
              setFetchStatus(true);
              setWhatToFatch(2);
              setTitle(2);
            }}
          >
            USAGES
          </h2>

          <h2
            className={`title ${title === 3 ? "active" : "inactive"}`}
            onClick={() => {
              getLanguages();
              setFetchStatus(true);
              setWhatToFatch(3);
              setTitle(3);
            }}
          >
            STATISTICS
          </h2>
        </div>
        <div className="fetch">
          {whatToFatch === 1 ? (
            <div>
              {allLanguages.map((elem) => {
                return (
                  <p
                    onClick={() => {
                      navigate(
                        "/programming-languages/" + encodeURIComponent(elem)
                      );
                      setMenuStatus(false);
                    }}
                  >
                    {elem}
                  </p>
                );
              })}
            </div>
          ) : (
            ""
          )}

          {whatToFatch === 2 ? (
            <div>
              {usages.map((elem) => {
                return (
                  <>
                    <p
                      onClick={() => {
                        navigate(
                          "/technical-field/" + encodeURIComponent(elem)
                        );
                        getRelatedLanguages(elem);
                        setMenuStatus(false);
                      }}
                    >
                      {elem}
                    </p>
                    <p>
                      {relatedLanguages.map((elem) => {
                        return (
                          <p
                            onClick={() => {
                              navigate(
                                "/programming-languages/" +
                                  encodeURIComponent(elem)
                              );
                            }}
                          >
                            {elem}
                          </p>
                        );
                      })}
                    </p>
                  </>
                );
              })}
            </div>
          ) : (
            ""
          )}
          {whatToFatch === 3 ? (
            <div>
              {allLanguages.map((elem) => {
                return (
                  <p
                    onClick={() => {
                      navigate("/statistics/" + encodeURIComponent(elem));
                      setMenuStatus(false);
                    }}
                  >
                    {elem}
                  </p>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className={`cover ${menuStatus ? "active" : "inactive"}`}>
        <div
          className={`toggle-icon-wrapper ${
            toggleIconStatus ? "active" : "inactive"
          }`}
          onClick={() => {
            toggleIconStatus
              ? SetToggleIconStatus(false)
              : SetToggleIconStatus(true);
            menuStatus ? setMenuStatus(false) : setMenuStatus(true);
          }}
        >
          <div className="toggle-icon">
            <div className="stick one"></div>
            <div className="stick two"></div>
            <div className="stick three"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
