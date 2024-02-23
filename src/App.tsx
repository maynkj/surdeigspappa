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

interface QuestionBlockProps {
  question: string;
  onClick: (answer: boolean) => void;
}

const QuestionBlock = ({ question, onClick }: QuestionBlockProps) => (
  <>
    <Typography variant="h1" marginBottom={2}>
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
    <Typography variant="h1" marginBottom={2}>
      Du er ikke surdeigspappa!
    </Typography>
    <TryAgainButton onClick={onClick} />
  </>
);

const ASourdoughDadBlock = ({ onClick }: TryAgainButtonProps) => (
  <>
    <Typography
      variant="h1"
      display="flex"
      alignItems="center"
      marginBottom={2}
    >
      Du er surdeigspappa! <FavoriteBorder sx={{ fontSize: '5rem' }} />
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
