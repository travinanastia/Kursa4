import React from "react";
import { AllCards, ComponentLoading } from "../../components";
import { useGetRecipesQuery } from "../../features/recipe/recipeApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const index = () => {
  const { data, isLoading } = useGetRecipesQuery();
  const user = useAuth();
  useTitle("Gazdyna - My Recipes");

  const updatedData = data?.filter((obj) => obj.author._id === user?.userId);

  return (
    <>
      {isLoading ? (
        <ComponentLoading />
      ) : (
        <AllCards
          mainTitle={"Your original creations"}
          tagline={
            "Welcome to your space where your imagination takes the lead."
          }
          type={"recipe"}
          data={updatedData}
        />
      )}
    </>
  );
};

export default index;
