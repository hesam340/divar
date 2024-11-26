import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Loader from "components/modules/Loader";
import { getCategory } from "services/admin";
import { getPostDetails } from "services/user";
import findCategory from "utils/categoryName";
import { sp } from "utils/numbers";

import styles from "./DetailsPage.module.css"

function DetailsPage() {
  const { id } = useParams();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const queryKey = ["post-details", id];
  const queryFn = () => getPostDetails(id);
  const { isLoading, data } = useQuery({ queryKey, queryFn });
  const { data: categoriesData } = useQuery(["get-categories"], getCategory);

  console.log({ data, id });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div>
            <h3>عنوان آگهی : {data.data.post.options.title}</h3>
            <span>شهر : {data.data.post.options.city}</span>
            <span>دسته بندی : {findCategory(categoriesData, data.data.post.category)}</span>
            <span>قیمت : {sp(data.data.post.amount)}</span>
            <p>{data.data.post.options.content}</p>
          </div>
          <img src={`${baseURL}${data.data.post.images}`} />
        </div>
      )}
    </>
  );
}

export default DetailsPage;
