/** @format */

import { useState, useEffect } from 'react';
import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({ data, onSelect, selectedIngredients }) {
  const [ingredients, setIngredients] = useState(selectedIngredients);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setIngredients(typeof value === 'string' ? value.split(',') : value);

    onSelect();
  };

  useEffect(() => {
    setIngredients(selectedIngredients);
  }, [selectedIngredients]);

  useEffect(() => {
    onSelect(ingredients);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel>Ingredients</InputLabel>
        <Select
          multiple
          value={ingredients}
          onChange={handleChange}
          input={<OutlinedInput label='Ingredients' />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {data.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={ingredients.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
