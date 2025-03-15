/** @format */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NoData, SingleCard } from '..';
import { Slider, IconButton, Tooltip } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import MultiSelect from './components/MultiSelect';
import { Button } from '../../components';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// icons
import { Close, AutoAwesome, FilterAltOff } from '@mui/icons-material';

import useFilteredCards, { KCAL_RANGE, TIME_RANGE } from '../../hooks/useFilteredCards';
import useGetIngredients from '../../hooks/useGetIngredients';

const Index = ({ mainTitle, tagline, type, data }) => {
  const [ingredients] = useGetIngredients(data);

  const {
    data: filteredData,
    searchTerm,
    kcalRange,
    timeRange,
    carbs,
    fat,
    protein,
    createdAt,
    onFieldChange,
    onResetFilters,
    onDatePick,
    onIngredientsMultiSelect,
  } = useFilteredCards(data);

  const [showFilterPage, setShowFilterPage] = useState(true);

  const onOpenFilterPage = () => {
    setShowFilterPage((prevValue) => !prevValue);
  };

  console.log(data);
  return (
    <>
      <AnimatePresence>
        {showFilterPage && (
          <motion.div
            initial={{ left: '-100vh', top: 0, opacity: 0 }}
            animate={{ left: 0, top: 0, opacity: 1 }}
            exit={{ left: '-100vh', opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              opacity: { duration: 0.3 },
            }}
            className='w-[300px] h-screen fixed bg-white z-50 flex justify-center'
          >
            <FilterContainer
              ingredients={ingredients}
              kcalRange={kcalRange}
              onFieldChange={onFieldChange}
              carbs={carbs}
              onResetFilters={onResetFilters}
              fat={fat}
              protein={protein}
              onIngredientsMultiSelect={onIngredientsMultiSelect}
              onToggleFilter={onOpenFilterPage}
              timeRange={timeRange}
              createdAt={createdAt}
              onDatePick={onDatePick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section className='box flex flex-col items-center'>
        <div className='flex flex-col items-center gap-5 w-full mb-10'>
          {/* Main heading */}
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-start'>{mainTitle}</h2>
          {/* Subtitle */}
          <p className='text-center'>{tagline}</p>
          {/* Search */}
          <div className='flex w-full items-center justify-center mt-4'>
            <div className=' border-gray-200 border-2 flex p-1 pl-4 rounded-lg  w-[80%] sm:w-[50%] md:w-[30%]'>
              <input
                type='text'
                value={searchTerm}
                name='searchTerm'
                onChange={onFieldChange}
                className='focus:outline-none w-full py-2'
                placeholder={`Search ${type}...`}
              />
            </div>

            <div className='w-fit ml-2'>
              <IconButton onClick={onOpenFilterPage}>
                <Tooltip title={'Filter recipes'}>
                  <AutoAwesome />
                </Tooltip>
              </IconButton>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-8 w-full'>
          {/* Sub heading */}
          <h3 className='font-bold text-xl w-full'>Recent {type}s</h3>
          {/* Cards container */}
          {filteredData?.length ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
              {filteredData?.map((singleData) => (
                <SingleCard key={singleData._id} singleData={singleData} type={type} />
              ))}
            </div>
          ) : (
            <NoData text={'Data'} />
          )}
        </div>
      </section>
    </>
  );
};

export default Index;

const FilterContainer = ({
  onDatePick,
  kcalRange,
  onFieldChange,
  timeRange,
  createdAt,
  onToggleFilter,
  ingredients,
  onResetFilters,
  onIngredientsMultiSelect,
}) => {
  return (
    <div id='filterContainer' className='p-6 bg-white rounded-2xl w-full relative flex flex-col'>
      <div className='flex-none'>
        <div className='absolute right-5 top-5'>
          <IconButton onClick={onToggleFilter}>
            <Close />
          </IconButton>
        </div>

        <div className='my-10'>
          <div className='flex justify-center '>
            <h1 className='font-bold uppercase'>Advanced filters</h1>
          </div>
          <div className='w-full h-[1px] bg-primary' />
        </div>
        <div className='my-8'>
          <h3 className='font-bold text-xs uppercase'>Dish Calories</h3>
          <Slider
            value={kcalRange}
            onChange={onFieldChange}
            name='kcalRange'
            step={20}
            valueLabelDisplay='auto'
            min={KCAL_RANGE.MIN}
            max={KCAL_RANGE.MAX}
            sx={{
              color: 'pink',
              '& .MuiSlider-thumb': { width: 18, height: 18 },
              '& .MuiSlider-track': { height: 4 },
              '& .MuiSlider-rail': { height: 4, backgroundColor: '#fbcfe8' },
            }}
          />
        </div>
        <div className='my-8'>
          <h3 className='font-bold text-xs uppercase'>Cooking time</h3>
          <Slider
            value={timeRange}
            onChange={onFieldChange}
            name='timeRange'
            step={20}
            valueLabelDisplay='auto'
            min={TIME_RANGE.MIN}
            max={TIME_RANGE.MAX}
            sx={{
              color: 'pink',
              '& .MuiSlider-thumb': { width: 18, height: 18 },
              '& .MuiSlider-track': { height: 4 },
              '& .MuiSlider-rail': { height: 4, backgroundColor: '#fbcfe8' },
            }}
          />
        </div>

        <div className='my-8'>
          <h3 className='font-bold text-xs uppercase'>Date recipe published</h3>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className='w-full'
              label='Select date:'
              name='createdAt'
              value={createdAt}
              onChange={(newValue) => onDatePick(newValue, 'createdAt')}
            />
          </LocalizationProvider>
        </div>
        <div className='my-8'>
          <h3 className='font-bold text-xs uppercase mb-1'>Ingredients</h3>

          <MultiSelect data={ingredients} onSelect={onIngredientsMultiSelect} />
        </div>
      </div>
      <div className='flex flex-col-reverse flex-1'>
        <Button
          content={'Reset filters'}
          customCss={'rounded text-sm px-4 py-1 w-full'}
          handleClick={onResetFilters}
          icon={<FilterAltOff />}
        />
      </div>
    </div>
  );
};
