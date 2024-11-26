import { Link } from "react-router-dom";

import { sp } from "utils/numbers";

import styles from "./Main.module.css";

function Main({ filteredCategory }) {
  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <div className={styles.container}>
      {filteredCategory?.map((post) => (
        <Link to={`/${post._id}`}>
          <div key={post._id} className={styles.card}>
            <div className={styles.info}>
              <p>{post.options.title}</p>
              <div>
                <p>{sp(post.amount)} تومان</p>
                <span>{post.options.city}</span>
              </div>
            </div>
            <img src={`${baseURL}${post.images[0]}`} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Main;
