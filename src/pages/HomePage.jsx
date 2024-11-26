import { useQuery, useQueryClient } from "@tanstack/react-query";

import Sidebar from "components/templates/Sidebar";
import Main from "components/templates/Main";
import Loader from "components/modules/Loader";
import { getAllPosts } from "services/user";
import { getCategory } from "services/admin";
import { useEffect, useState } from "react";

const style = { display: "flex" };

function HomePage() {
  const { isLoading: categoryLoading, data: categories } = useQuery(
    ["get-categories"],
    getCategory
  );
  const { refetch,isLoading: postLoading, data: posts } = useQuery(
    ["all-posts"],
    getAllPosts,
    { onSuccess: (res) => setFilteredCategory(res?.data.posts)},
  );

  useEffect(()=>{
    refetch();
  },[])

  const [filteredCategory, setFilteredCategory] = useState();

  const filterCategories = (category) => {
    const filtered = posts.data.posts.filter(
      (post) => post.category === category._id
    );
    setFilteredCategory([...filtered]);
  };

  const allCategories = (event) => {
    if (event.target.tagName !== "P") return;
    const filtered = posts.data.posts;
    setFilteredCategory([...filtered]);
  };

  console.log(filteredCategory);
  return (
    <>
      {postLoading ||
        (categoryLoading ? (
          <Loader />
        ) : (
          <div style={style}>
            <Sidebar
              categories={categories}
              filterCategories={filterCategories}
              allCategories={allCategories}
            />
            <Main filteredCategory={filteredCategory} />
          </div>
        ))}
    </>
  );
}

export default HomePage;
