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
  const [state, setState] = useState({
    searchTerm: '',
    kcalRange: [0, 9999],
    timeRange: [0, 3600],
    carbs: 0,
    fat: 0,
    protein: 0,
    createdAt: dayjs(),
  });

  const [data, setData] = useState(initialData);

  const { kcalRange, searchTerm, timeRange, carbs, fat, protein, createdAt } = state;

  const onFieldChange = (event) => {
    const { value, name } = event.target;
    setState((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const onDatePick = (value, name) => {
    setState((prevValue) => ({ ...prevValue, [name]: value }));
  };

  useEffect(() => {
    const filteredData = filterByDate(
      filterDataByTimeCooking(filterDataByKcal(filterDataBySearch(initialData, searchTerm), kcalRange), timeRange),
      createdAt
    );

    setData(filteredData);
  }, [timeRange, kcalRange, searchTerm, createdAt, initialData]);

  return { onFieldChange, searchTerm, data, kcalRange, timeRange, carbs, fat, protein, createdAt, onDatePick };
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
  const filtered = data.filter((element) => dayjs(element.createdAt).isSame(dayjs(createdAt), 'day'));

  return filtered;
};
