import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Loader from "components/modules/Loader";
import { getCategory } from "services/admin";

import styles from "./CategoryList.module.css";
import { deleteCategory } from "services/admin";
import toast from "react-hot-toast";

function CategoryList() {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery(["get-categories"], getCategory);

  const { mutate } = useMutation(deleteCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id} className={styles.container}>
            <div className={styles.title}>
              <img src={`${i.icon}.svg`} />
              <h5>{i.name}</h5>
            </div>
            <div className={styles.info}>
              <button
                onClick={() =>
                  mutate(
                    i._id,
                    { onSuccess: (res) => toast.success("دسته بندی با موفقیت حذف گردید") },
                    { onError: (res) => toast.error("مشکلی پیش آمده است") }
                  )
                }
              >
                حذف دسته بندی
              </button>
              <p>slug : {i.slug}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
