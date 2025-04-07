//* mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Credit: React.FC = () => {
  return (
    <Grid size={12} className="relative -top-5">
      <Stack spacing={1}>
        <Typography className="text-center text-text-primary !text-sm">
          Powered by <span className="text-info-main">Digital Transformation</span>
        </Typography>
        <Typography className="text-center text-text-secondary !text-xs">{import.meta.env.VITE_CREDIT}</Typography>
      </Stack>
    </Grid>
  );
};

export default Credit;
