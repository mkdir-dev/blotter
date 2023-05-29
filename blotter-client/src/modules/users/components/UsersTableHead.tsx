import { MouseEvent, ChangeEvent } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel, Checkbox } from '@mui/material';

import { headCellUserTable } from '../utils/constants.table';
import { DataUserTable } from '../types/users.table.types';

interface UsersTableHeadProps {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof DataUserTable) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export const UsersTableHead = (props: UsersTableHeadProps) => {
  const {
    onSelectAllClick,
    numSelected,
    rowCount,
    // onRequestSort
  } = props;
  /*
  const createSortHandler =
    (property: keyof DataUserTable) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
    */

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCellUserTable.map((headCell) => (
          <TableCell
            key={headCell.id}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
            // active={orderBy === headCell.id}
            // direction={orderBy === headCell.id ? order : 'asc'}
            // onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/*
              orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null
              */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
