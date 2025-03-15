/** @format */

import { useEffect, useState } from 'react';

export default function useGetIngredients(data) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const uniqueIngredients = new Set();
    data.forEach((item) => item.ingredients.forEach((ingredient) => uniqueIngredients.add(ingredient)));

    const arrayIngredients = Array.from(uniqueIngredients);
    setIngredients(arrayIngredients);
  }, [data]);

  return [ingredients];
}
