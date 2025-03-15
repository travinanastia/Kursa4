/** @format */

import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

export const KCAL_RANGE = {
  MIN: 20,
  MAX: 9999,
};

export const TIME_RANGE = {
  MIN: 20,
  MAX: 360,
};

const useFilteredCards = (initialData = []) => {
  const initialState = {
    searchTerm: '',
    kcalRange: [0, 9999],
    timeRange: [0, 3600],
    carbs: 0,
    fat: 0,
    protein: 0,
    ingredients: [],
    createdAt: null,
  };

  const [state, setState] = useState(initialState);
  const [data, setData] = useState(initialData);

  const { kcalRange, searchTerm, timeRange, carbs, fat, protein, createdAt, ingredients } = state;

  const onFieldChange = (event) => {
    const { value, name } = event.target;
    setState((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const onDatePick = (value, name) => {
    setState((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const onIngredientsMultiSelect = (ingredients) => {
    if (!ingredients) return;

    setState((prevValue) => ({ ...prevValue, ingredients }));
  };

  useEffect(() => {
    const filteredData = filterByIngredients(
      filterByDate(
        filterDataByTimeCooking(filterDataByKcal(filterDataBySearch(initialData, searchTerm), kcalRange), timeRange),
        createdAt
      ),
      ingredients
    );

    setData(filteredData);
  }, [timeRange, kcalRange, searchTerm, createdAt, ingredients, initialData]);

  const onResetFilters = () => {
    setState(initialState);
  };

  return {
    searchTerm,
    data,
    kcalRange,
    timeRange,
    carbs,
    fat,
    ingredients,
    protein,
    createdAt,
    onDatePick,
    onFieldChange,
    onResetFilters,
    onIngredientsMultiSelect,
  };
};

export default useFilteredCards;

const inNumberRange = (value, range) => {
  return value >= range[0] && value <= range[1];
};

const filterDataBySearch = (data, searchTerm) => {
  const filtered = data.filter((element) => element.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return filtered;
};

const filterDataByKcal = (data, kcalRange) => {
  const filtered = data.filter(({ calories }) => inNumberRange(+calories, kcalRange));

  return filtered;
};

const filterDataByTimeCooking = (data, timeRange) => {
  const filtered = data.filter(({ cookingTime }) => inNumberRange(+cookingTime, timeRange));

  return filtered;
};

const filterByDate = (data, createdAt) => {
  if (createdAt === null) return data;

  const filtered = data.filter((element) => dayjs(element.createdAt).isSame(dayjs(createdAt), 'day'));

  return filtered;
};

const filterByIngredients = (data, ingredients) => {
  if (ingredients.length == 0) return data;

  const filtered = [];

  data.forEach((data) => {
    const { ingredients: dataIngredient } = data;

    const inList = dataIngredient.some((ingredient) => ingredients.includes(ingredient));

    if (inList) filtered.push(data);
  });

  return filtered;
};
