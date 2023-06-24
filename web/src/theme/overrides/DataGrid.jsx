// ----------------------------------------------------------------------

export default function DataGrid(theme) {
    return {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            "& .MuiDataGrid-columnHeaders": {
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.background.neutral,
            }
          }
        }
      },
    };
  }