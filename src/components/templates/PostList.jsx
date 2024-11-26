import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

import Loader from "components/modules/Loader";
import { deletePost } from "services/user";
import { getPosts } from "services/user";
import { sp } from "utils/numbers";

import styles from "./PostList.module.css";

function PostList() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["my-post-list"], getPosts);

  const { mutate,isLoading:isLoadingDelete } = useMutation(deletePost, {
    onSuccess: () => queryClient.invalidateQueries("my-post-list"),
  });

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
                <button
                  onClick={() =>
                    mutate(
                      post._id,
                      { onSuccess: (res) => toast.success(res.data.message) },
                      { onError: (err) => toast.error("مشکلی پیش آمده است") }
                    )
                  }
                >
                  <FaRegTrashAlt />
                </button>
                <div>
                  <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                  <span>{sp(post.amount)} تومان</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
