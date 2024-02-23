import { FavoriteBorder } from '@mui/icons-material';
import {
  Button,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#000',
    },
  },
});

theme.typography.h1 = {
  fontWeight: 300,
  lineHeight: 1.167,
  letterSpacing: '-0.01562em',
  marginBottom: '1rem',
  fontSize: '2rem',
  '@media (min-width:480px)': {
    fontSize: '3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '6rem',
  },
};

interface QuestionBlockProps {
  question: string;
  onClick: (answer: boolean) => void;
}

const QuestionBlock = ({ question, onClick }: QuestionBlockProps) => (
  <>
    <Typography variant="h1" marginBottom={2} textAlign="center">
      {question}
    </Typography>
    <Stack flexDirection="row" justifyContent="center" marginTop={2}>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => onClick(true)}
      >
        Ja
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        sx={{ marginLeft: 2 }}
        onClick={() => onClick(false)}
      >
        Nei
      </Button>
    </Stack>
  </>
);

interface TryAgainButtonProps {
  onClick: () => void;
}

const TryAgainButton = ({ onClick }: TryAgainButtonProps) => (
  <Button
    variant="outlined"
    color="primary"
    size="large"
    sx={{ marginLeft: 2 }}
    onClick={onClick}
  >
    Prøv igjen
  </Button>
);

const NotASourdoughDadBlock = ({ onClick }: TryAgainButtonProps) => (
  <>
    <Typography variant="h1" marginBottom={2} textAlign="center">
      Du er ikke surdeigspappa!
    </Typography>
    <TryAgainButton onClick={onClick} />
  </>
);

const ASourdoughDadBlock = ({ onClick }: TryAgainButtonProps) => (
  <>
    <Typography variant="h1" marginBottom={2} textAlign="center">
      Du er surdeigspappa!{' '}
      <FavoriteBorder sx={{ fontSize: 'inherit', verticalAlign: 'middle' }} />
    </Typography>
    <TryAgainButton onClick={onClick} />
  </>
);

const App = () => {
  const [isDad, setIsDad] = useState<boolean | null>(null);
  const [hasSourdough, setHasSourdough] = useState<boolean | null>(null);

  const reset = () => {
    setIsDad(null);
    setHasSourdough(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Stack alignItems="center">
          {isDad === null && hasSourdough === null && (
            <QuestionBlock question="Er du pappa?" onClick={setIsDad} />
          )}
          {isDad && hasSourdough === null && (
            <QuestionBlock
              question="Har du surdeig?"
              onClick={setHasSourdough}
            />
          )}
          {isDad && hasSourdough && <ASourdoughDadBlock onClick={reset} />}
          {isDad === false && <NotASourdoughDadBlock onClick={reset} />}
          {hasSourdough === false && <NotASourdoughDadBlock onClick={reset} />}
        </Stack>
      </main>
    </ThemeProvider>
  );
};

export default App;
