import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import { deleteCookie } from "utils/cookie";
import { getProfile } from "services/user";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Header() {
  const [show, setShow] = useState(false);
  const { refetch, data } = useQuery(["profile"], getProfile);

  const exitHandler = () => {
    deleteCookie();
    getProfile();
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        <button
          className={styles.menu}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <span>
            <img src="profile.svg" />
            <p>دیوار من</p>
          </span>
          {show && (
            <div className={styles.options}>
              {data && data?.data.role === "ADMIN" && (
                <Link
                  to={document.cookie ? "/admin" : "/auth"}
                  onClick={refetch}
                >
                  ورود به پنل ادمین
                </Link>
              )}
              <hr />
              <Link
                to={document.cookie ? "/dashboard" : "/auth"}
                onClick={refetch}
              >
                ورود به پنل کاربری
              </Link>
              <hr />
              <Link to="/" onClick={exitHandler}>
                خروج
              </Link>
            </div>
          )}
        </button>
        <Link
          to={document.cookie ? "/dashboard" : "/auth"}
          className={styles.button}
        >
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
