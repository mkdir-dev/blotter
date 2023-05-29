import { useState, MouseEvent, ChangeEvent } from 'react';
import { InfiniteData } from 'react-query';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  Chip,
  Switch,
} from '@mui/material';

import { ResponseUser, ResponseUsersPagination } from '@/common/types/users.api.types';
import { DataUserTable } from '../types/users.table.types';
import { createDataUserTable } from '../helpers/createDataUserTable';
import { UsersTableHead } from './UsersTableHead';
import { UsersTableToolbar } from './UsersTableToolbar';
import { ResGetUserHook } from '../types/get-users.hook.types';

interface UsersTableProps {
  dataUsers: ResGetUserHook | undefined; // InfiniteData<ResponseUsersPagination> | undefined;
  page: number;
  perPage: number;

  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangePerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const UsersTable = (props: UsersTableProps) => {
  const { dataUsers, page, perPage, handleChangePage, handleChangePerPage } = props;

  console.log('dataUsers', dataUsers);

  // const [order, setOrder] = useState<Order>('asc');
  // const [orderBy, setOrderBy] = useState<keyof DataUserTable>('');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [dense, setDense] = useState(true);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof DataUserTable) => {
    // const isAsc = orderBy === property && order === 'asc';
    // setOrder(isAsc ? 'desc' : 'asc');
    // setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n: { id: string }) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  /*
  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );
  */

  const rows =
    dataUsers && dataUsers?.pages.length > 0
      ? dataUsers?.pages.map((item) =>
          createDataUserTable(
            item.id,
            item.username,
            item.email,
            item.name,
            item.surname,
            item.birthday,
            item.phone,
            item.nationality,
            item.country,
            item.city,
            item.gender,
            item.role,
            item.status
          )
        )
      : [];

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <UsersTableToolbar title="Пользователи" numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750, mb: 2 }} size={dense ? 'small' : 'medium'}>
            <UsersTableHead
              numSelected={selected.length}
              // order={order}
              // orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length || 0}
            />
            <TableBody>
              {rows?.map((row) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `users-table-checkbox-${row.id}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor:
                        row.role === 'admin' ? 'rgba(141, 83, 52, 0.15);' : 'inherit',
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.surname}</TableCell>
                    <TableCell>{row.birthday}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.nationality}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.role}
                        color={row.role === 'admin' ? 'info' : 'default'}
                        size={dense ? 'small' : 'medium'}
                        variant={'outlined'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={row.status === 'block' ? 'error' : 'success'}
                        size={dense ? 'small' : 'medium'}
                        variant={'filled'}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          // @ts-ignore
          count={dataUsers?.pageParams[0]?.total ?? 0}
          rowsPerPage={perPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangePerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label={'Уменьшить таблицу'}
      />
    </Box>
  );
};
