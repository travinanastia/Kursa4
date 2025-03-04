import React from "react";
import { Hero, HomeCategories} from "../../components";
import { useGetRecipesQuery } from "../../features/recipe/recipeApiSlice";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const user = useAuth();
  const recipes = useGetRecipesQuery();

  return (
    <>
      <Hero />
      <HomeCategories
        title={"recipe"}
        data={recipes?.data}
        isLoading={recipes?.isLoading}
      />
    </>
  );
};

export default Home;
