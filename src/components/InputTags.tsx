import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Chip, Box } from "@mui/material";

interface TagInputProps{
  setTexted:(value:string[]) => void;
}

const TagInput:React.FC<TagInputProps> = ({setTexted}) => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(()=>{
    setTexted(tags)
  },[tags]);

  const handleTagChange = (newTags: string[]) => {
    setTags(newTags);
  };

  return (
    <Box>
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={tags}
        onChange={(_, newValue) => handleTagChange(newValue)}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={option}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Add Tags"
            placeholder="Type and press Enter"
          />
        )}
      />
    </Box>
  );
}

export default TagInput;
