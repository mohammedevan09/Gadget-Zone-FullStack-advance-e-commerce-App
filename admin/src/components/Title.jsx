import { Typography, Box } from '@mui/material'

const Title = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography
        variant={'h4'}
        color={'#539eff'}
        fontWeight="bold"
        sx={{ mb: '5x' }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color={'#6fddff'}>
        {subtitle}
      </Typography>
    </Box>
  )
}

export default Title
