import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../AppContext";

const Navbar = () => {
  const [allLanguages, setAllLanguages] = useState<Array<string>>([]);
  const [usages, setUsages] = useState<Array<string>>([]);
  const navigate = useNavigate();
  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [whatToFatch, setWhatToFatch] = useState<number>(0);
  const [title, setTitle] = useState<number>(0);
  const [toggleIconStatus, SetToggleIconStatus] = useState<boolean>(false);
  const { menuFlag, setMenuFlag } = useContext(AppContext);
  const menuRef = useRef<HTMLInputElement>(null);
  const triggerIconRef = useRef<HTMLInputElement>(null);
  const [userStatus, setUserStatus] = useState<boolean>(false);
  const logout = useRef<HTMLInputElement>(null);
  const [registrationSwitch, setRegistrationSwitch] = useState<boolean>(false);

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

  useEffect(() => {
    if (menuFlag === 1) {
      setMenuStatus(true);
      SetToggleIconStatus(true);
      setTitle(1);
      setFetchStatus(true);
      getLanguages();
      setWhatToFatch(1);
      setMenuFlag(0);
    } else if (menuFlag === 2) {
      setMenuStatus(true);
      SetToggleIconStatus(true);
      setTitle(2);
      setFetchStatus(true);
      getUsages();
      setWhatToFatch(2);
      setMenuFlag(0);
    } else if (menuFlag === 3) {
      setMenuStatus(true);
      SetToggleIconStatus(true);
      setTitle(3);
      setFetchStatus(true);
      getLanguages();
      setWhatToFatch(3);
      setMenuFlag(0);
    }
  }, [menuFlag]);

  useEffect(() => {
    if (menuRef.current && menuRef.current) {
      document.addEventListener("mousedown", (event: any) => {
        if (
          !menuRef.current.contains(event.target) &&
          !triggerIconRef.current.contains(event.target)
        ) {
          setMenuStatus(false);
          SetToggleIconStatus(false);
        }
      });
    }
    if (logout.current) {
      document.addEventListener("mousedown", (event: any) => {
        if (!logout.current.contains(event.target)) {
          setUserStatus(false);
        }
      });
    }
  }, [menuRef.current, logout.current]);

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
      <div
        className={`menu ${fetchStatus ? "active" : "inactive"}`}
        ref={menuRef}
      >
        <div className="navbar">
          <FontAwesomeIcon
            icon={faHouse}
            onClick={() => {
              navigate("/");
              setMenuStatus(false);
              SetToggleIconStatus(false);
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
                      SetToggleIconStatus(false);
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
                        setMenuStatus(false);
                        SetToggleIconStatus(false);
                      }}
                    >
                      {elem}
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
                      SetToggleIconStatus(false);
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
          ref={triggerIconRef}
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
        {localStorage.getItem("jwt") ? (
          <div className="user-section">
            <button
              className="user-icon"
              onClick={() => {
                userStatus ? setUserStatus(false) : setUserStatus(true);
              }}
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            <div
              className={`user-interface ${userStatus ? "active" : "inactive"}`}
            >
              <p>{localStorage.getItem("username")}</p>
              <button
                className="logout"
                onClick={() => {
                  if (logout.current) {
                    logout.current.classList.add("inactive");
                  }
                  localStorage.removeItem("jwt");
                  if (registrationSwitch) {
                    setRegistrationSwitch(false);
                  } else {
                    setRegistrationSwitch(true);
                  }
                }}
              >
                logout
              </button>
            </div>
          </div>
        ) : (
          <div className="registration">
            <div className="signup-button">
              <p
                onClick={() => {
                  navigate("/signup");
                }}
              >
                SIGNUP
              </p>
            </div>
            <div className="login-button">
              <p
                onClick={() => {
                  navigate("/login");
                }}
              >
                LOGIN
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
