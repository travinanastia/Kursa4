/** @format */

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { NoData, SingleCard } from '..';
import { Slider, Typography, TextField, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import useFilteredCards, { KCAL_RANGE, TIME_RANGE } from '../../hooks/useFilteredCards';

const Index = ({ mainTitle, tagline, type, data }) => {
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
    onDatePick,
  } = useFilteredCards(data);

  return (
    <section className='box flex flex-col items-center'>
      <div className='flex flex-col items-center gap-5 w-full mb-10'>
        {/* Main heading */}
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-start'>{mainTitle}</h2>
        {/* Subtitle */}
        <p className='text-center'>{tagline}</p>
        {/* Search */}
        <div className='border-gray-200 border-2 flex p-1 pl-4 rounded-lg mt-4 w-[80%] sm:w-[50%] md:w-[30%]'>
          <input
            type='text'
            value={searchTerm}
            name='search'
            onChange={onFieldChange}
            className='focus:outline-none w-full py-2'
            placeholder={`Search ${type}...`}
          />
        </div>

        <FilterContainer
          kcalRange={kcalRange}
          onFieldChange={onFieldChange}
          carbs={carbs}
          fat={fat}
          protein={protein}
          timeRange={timeRange}
          createdAt={createdAt}
          onDatePick={onDatePick}
        />
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
  );
};

export default Index;

const FilterContainer = ({ onDatePick, kcalRange, onFieldChange, timeRange, protein, fat, carbs, createdAt }) => {
  return (
    <Accordion className='w-full'>
      <AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls='panel1-content' id='panel1-header'>
        <Typography component='span'>Advanced Filter</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className='p-6 bg-white  rounded-2xl w-full '>
          {/* Title */}
          <Typography id='input-slider' gutterBottom className='text-3xl font-semibold '>
            Select Nutritional Range
          </Typography>
          {/* Kcal Range */}
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <Typography className=' font-medium'>Kcal value</Typography>
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
            </Grid>

            <Grid item xs={6}>
              <Typography className='font-medium'>Time range</Typography>
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
            </Grid>
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Controlled picker'
              name='createdAt'
              value={createdAt}
              onChange={(newValue) => onDatePick(newValue, 'createdAt')}
            />
          </LocalizationProvider>
          Macronutrients Input Fields
          <div className='grid grid-cols-3 gap-3'>
            <TextField
              label='Protein (g)'
              variant='outlined'
              type='number'
              value={protein}
              onChange={onFieldChange}
              name='protein'
              className='w-full'
            />
            <TextField
              label='Fat (g)'
              variant='outlined'
              type='number'
              value={fat}
              onChange={onFieldChange}
              name='fat'
              className='w-full'
            />
            <TextField
              label='Carbs (g)'
              variant='outlined'
              type='number'
              value={carbs}
              onChange={onFieldChange}
              name='carbs'
              className='w-full'
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
