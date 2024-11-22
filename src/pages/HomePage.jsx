import { useQuery } from "@tanstack/react-query";

import Sidebar from "components/templates/Sidebar";
import Main from "components/templates/Main";
import Loader from "components/modules/Loader";
import { getAllPosts } from "services/user";
import { getCategory } from "services/admin";

const style = { display: "flex" };

function HomePage() {
  const { isLoading: categoryLoading, data: categories } = useQuery(
    ["get-categories"],
    getCategory
  );
  const { isLoading: postLoading, data: posts } = useQuery(
    ["all-posts"],
    getAllPosts
  );
  return (
    <>
      {postLoading ||
        (categoryLoading ? (
          <Loader />
        ) : (
          <div style={style}>
            <Sidebar categories={categories} />
            <Main posts={posts} />
          </div>
        ))}
    </>
  );
}

export default HomePage;
