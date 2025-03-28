import React, { useEffect } from "react";
import { AllCards, ComponentLoading } from "../../components";
import { useDispatch } from "react-redux";
import { setRecipes } from "../../features/recipe/recipeSlice";
import { useGetRecipesQuery } from "../../features/recipe/recipeApiSlice";
import useTitle from "../../hooks/useTitle";

const Recipe = () => {
  const { data, isLoading } = useGetRecipesQuery();
  const dispatch = useDispatch();
  useTitle("Gazdyna - All Recipes");

  useEffect(() => {
    if (!isLoading) {
      dispatch(setRecipes(data));
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <ComponentLoading />
      ) : (
        <AllCards
          mainTitle={"Discover creations"}
          tagline={
            "Dive into a diverse collection of mouthwatering recipes."
          }
          type={"recipe"}
          data={data}
        />
      )}
    </>
  );
};

export default Recipe;
