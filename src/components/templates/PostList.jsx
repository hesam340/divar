import { useQuery, useQueryClient } from "@tanstack/react-query";

import Loader from "components/modules/Loader";
import { getPosts } from "services/user";
import { sp } from "utils/numbers";

import styles from "./PostList.module.css";
import { useEffect, useState } from "react";

function PostList() {
  const queryClient = useQueryClient();
  const getPost = () => {
    const { data, isLoading } = useQuery(["my-post-list"], getPosts, {
      onSuccess: () => queryClient.invalidateQueries(),
    });
    setData({ ...data });
    setIsLoading(isLoading);
  };
  useEffect(() => {
    getPost();
  }, []);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(null);
  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data?.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img src={`${baseURL}${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
