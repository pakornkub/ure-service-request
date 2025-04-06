import { ThemeProvider } from '@mui/material/styles';
import theme from '@/themes'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="text-primary">
        <h1>Hello World</h1>
        <p>This is a simple React app with MUI theme provider.</p>
        <Button variant="contained" color="primary" className="bg-amber-500">
          บันทึกข้อมูล
        </Button>
        <TextField
          label="test"
          disabled
          slotProps={{
            inputLabel: {
              className: 'text-indigo-200',
            },
          }}
        ></TextField>
      </div>
    </ThemeProvider>
  );
}

export default App;
