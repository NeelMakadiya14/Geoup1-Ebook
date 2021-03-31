import React from "react";
import SearchBar from "material-ui-search-bar";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";
import { genres } from "../utils/Constant";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: "25px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  row: {
    display: "inline-flex",
  },
}));

export default function Search() {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(event.target.value);
    navigate(`/genres/${event.target.value}`);
  };

  return (
    <div className={classes.row}>
      <SearchBar
        //onChange={(value) => console.log(value)} //when search text changes
        onRequestSearch={(value) => {
          console.log(value);
          navigate(`/search/${value}`);
        }}
        style={{ maxWidth: 400, marginTop: "10px", marginRight: "10px" }}
      />

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Genre</InputLabel>
        <Select
          native
          //value={age}
          onChange={(event) => handleChange(event)}
          //defaultValue={this.state.selectValue}

          inputProps={{
            name: "age",
            id: "age-native-simple",
          }}
        >
          <option> None </option>
          {genres.map((x, i) => (
            <option key={i} value={x}>
              {x}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
