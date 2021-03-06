import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

export default function CategoryField({setCategory, setBillObject, userData }) {
  const classes = useStyles();
  const categoryData = userData ? userData.map(({ category }) => category) : []
  const billsArray = userData 

  const uniqueCategoryFunction = (a) => {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

  const uniqueCategory = uniqueCategoryFunction(categoryData)


  const getBillsData = (data, category) => {
    let selectedCategory = category

    const dataOutput = data.filter(function(bill) {
        return bill.category === selectedCategory
    })
    setBillObject(dataOutput)
  }

  const handleChange = (e) => {
    setCategory(e)
    getBillsData(billsArray, e)
  }
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined" 
          onChange={(e) => handleChange(e.target.value)}
          label="Category"
        >
          {uniqueCategory.map((catName) => (
            <MenuItem value={catName}>{catName}</MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
}
