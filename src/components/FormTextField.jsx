import { TextField } from '@mui/material';

export default function FormTextField({ 
  fullWidth = true,
  size = 'medium',
  margin = 'normal',
  ...props 
}) {
  return (
    <TextField
      fullWidth={fullWidth}
      size={size}
      margin={margin}
      sx={{
        '& .MuiInputBase-root': {
          borderRadius: theme => ({
            xs: theme.shape.borderRadius,
            sm: theme.shape.borderRadius * 1.5
          }),
          minHeight: {
            xs: 48,
            sm: 56
          }
        },
        '& .MuiInputLabel-root': {
          fontSize: theme => ({
            xs: theme.typography.body2.fontSize,
            sm: theme.typography.body1.fontSize
          })
        },
        '& .MuiInputBase-input': {
          fontSize: theme => ({
            xs: theme.typography.body2.fontSize,
            sm: theme.typography.body1.fontSize
          }),
          padding: {
            xs: '12px 16px',
            sm: '16px 20px'
          }
        }
      }}
      {...props}
    />
  );
}