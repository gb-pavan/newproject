import React, { useState } from "react";
import { Button, TextField, MenuItem, Select, Typography, IconButton, Box } from "@mui/material";
import { Edit, GroupAdd, AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import styled from "styled-components";

const Container = styled(Box)`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
`;

const StatusBadge = styled(Button)`
  background: #f8d7da;
  color: #721c24;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 16px;
  cursor: pointer;
  &:hover {
    background: #f1b0b7;
  }
`;

const ProceedButton = styled(Button)`
  background: #8b5cf6;
  color: #fff;
  &:hover {
    background: #7c3aed;
  }
`;

const BulkEdit = () => {
  const [selectedLeads, setSelectedLeads] = useState(602);
  const [leadStatus, setLeadStatus] = useState("Stage");
  const [leadRating, setLeadRating] = useState(0);
  const [selectedField, setSelectedField] = useState("");

  return (
    <Container>
      <Typography variant="h6">
        Selected leads: <strong>{selectedLeads}</strong>
        <IconButton size="small" color="primary">
          <Edit fontSize="small" />
        </IconButton>
      </Typography>
      
      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <Typography>Update Lead/s Status:</Typography>
        <StatusBadge>{leadStatus}</StatusBadge>
      </Box>
      
      <Box display="flex" alignItems="center" gap={1} mt={2}>
        <Typography>Update Lead/s Rating:</Typography>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ cursor: "pointer", color: leadRating > i ? "#ffcc00" : "#ccc" }}>
            ★
          </span>
        ))}
      </Box>
      
      <Box display="flex" gap={2} mt={2}>
        <Button startIcon={<GroupAdd />} size="small">Re/assign leads to</Button>
        <Button startIcon={<AddCircleOutline />} size="small">Add Lead to</Button>
        <Button startIcon={<RemoveCircleOutline />} size="small">Remove Lead from</Button>
      </Box>
      
      <Box mt={2}>
        <Select
          fullWidth
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Select a field</MenuItem>
          <MenuItem value="Field 1">Field 1</MenuItem>
          <MenuItem value="Field 2">Field 2</MenuItem>
        </Select>
      </Box>
      
      <Box mt={2} textAlign="center">
        <ProceedButton variant="contained" fullWidth>
          ✓ PROCEED WITH {selectedLeads} LEADS
        </ProceedButton>
      </Box>
    </Container>
  );
};

export default BulkEdit;
