import React from "react";
import { AllCards, ComponentLoading } from "../../components";
import { useGetRecipesQuery } from "../../features/recipe/recipeApiSlice";
import useAuth from "../../hooks/useAuth";

const index = () => {
  const { data, isLoading } = useGetRecipesQuery();
  const user = useAuth();

  const updatedData = data?.filter((obj) =>
    user?.favorites?.includes(obj._id.toString())
  );

  return (
    <>
      {isLoading ? (
        <ComponentLoading />
      ) : (
        <AllCards
          mainTitle={"Your collection"}
          tagline={
            "Welcome to your personal favorite recipes!"
          }
          type={"recipe"}
          data={updatedData}
        />
      )}
    </>
  );
};

export default index;
