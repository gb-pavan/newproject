// import React from "react";
// import { Controller, useForm } from "react-hook-form";
// import {
//   TextField,
//   Autocomplete,
//   Checkbox,
//   Chip,
//   Grid,
//   FormControl,
// } from "@mui/material";
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

// const sampleOptions = [
//   { _id: "1", name: "Alice" },
//   { _id: "2", name: "Bob" },
//   { _id: "3", name: "Charlie" },
//   { _id: "4", name: "Diana" },
// ];

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;


// interface MultiSelectFormProps{
//   label:string;
//   options:string[]
//   onChange:(value:string[])=>void;
// }


// const MultiSelectForm:React.FC<MultiSelectFormProps> = ({label,options, onChange}) => {

//   console.log("options filters",options);
//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       reporting: [],
//     },
//   });

//   function mapToSampleOptions(options: string[]) {
//     return options.map((name, index) => ({
//       _id: (index + 1).toString(),
//       name,
//     }));
//   }


//   const onSubmit = (data:unknown) => {
//     console.log("Form Data:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <FormControl fullWidth>
//             <Controller
//               name="reporting"
//               control={control}
//               render={({ field }) => (
//                 <Autocomplete
//                   multiple
//                   disableCloseOnSelect
//                   // options={sampleOptions}
//                   options={mapToSampleOptions(options)}
//                   getOptionLabel={(option) => option.name}
//                   onChange={(_, value) => field.onChange(value)}
//                   value={field.value}
//                   isOptionEqualToValue={(option, value) => option._id === value._id}
//                   renderOption={(props, option, { selected }) => (
//                     <li {...props} key={option._id}>
//                       <Checkbox
//                         icon={icon}
//                         checkedIcon={checkedIcon}
//                         style={{ marginRight: 8 }}
//                         checked={selected}
//                       />
//                       {option.name}
//                     </li>
//                   )}
//                   renderTags={(value, getTagProps) =>
//                     value.map((option, index) => (
//                       <Chip
//                         label={option.name}
//                         {...getTagProps({ index })}
//                         key={option._id}
//                       />
//                     ))
//                   }
//                   renderInput={(params) => (
//                     <TextField {...params} label="Reporting" placeholder="Select users" />
//                   )}
//                 />
//               )}
//             />
//           </FormControl>
//         </Grid>
//       </Grid>
//     </form>
//   );
// }

// export default MultiSelectForm;

import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Autocomplete,
  Checkbox,
  Chip,
  Grid,
  FormControl,
  Popper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Styled Popper to control the dropdown width
const StyledPopper = styled(Popper)({
  width: '250px !important', // adjust width as needed
});

interface MultiSelectFormProps {
  label: string;
  options: string[];
  onChange: (value: string[]) => void;
}

const MultiSelectForm: React.FC<MultiSelectFormProps> = ({ label, options, onChange }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      reporting: [],
    },
  });

  function mapToSampleOptions(options: string[]) {
    return options.map((name, index) => ({
      _id: (index + 1).toString(),
      name,
    }));
  }

  const onSubmit = (data: unknown) => {
    console.log("Form Data:", data);
  };

  console.log("options filtered asent",mapToSampleOptions(options));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Controller
              name="reporting"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  options={mapToSampleOptions(options)}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => {
                    field.onChange(value);
                    onChange(value.map((item: any) => item.name)); // trigger external onChange with names
                  }}
                  value={field.value}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  PopperComponent={StyledPopper}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} key={option.name}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        key={option.name}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label={label} placeholder="Select users" />
                  )}
                />
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default MultiSelectForm;

