import React from 'react';
import './App.css';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Mic as MicIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
  RecordVoiceOver as VoiceIcon,
} from '@mui/icons-material';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <MicIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Filler Words Analyzer
          </Typography>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <VoiceIcon sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Eliminate Filler Words
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.95 }}>
            Improve your speaking clarity and confidence with real-time analysis
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: '#667eea',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Start Recording
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="600" sx={{ mb: 6 }}>
          How It Works
        </Typography>
        
        <Grid container spacing={4}>
          {/* Feature Card 1 */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <MicIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="600">
                  Record
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Speak naturally while our app listens and records your voice in real-time
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature Card 2 */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'secondary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <AssessmentIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="600">
                  Analyze
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our AI detects filler words like "um", "uh", "like", and "you know"
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature Card 3 */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'success.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main' }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="600">
                  Improve
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Get detailed insights and track your progress over time to speak more confidently
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Card elevation={3} sx={{ py: 4, bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Common Filler Words We Detect
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {['um', 'uh', 'like', 'you know', 'so', 'actually', 'basically', 'literally'].map(
                  (word) => (
                    <Chip
                      key={word}
                      label={word}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontSize: '1rem',
                        px: 1,
                      }}
                    />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 4, mt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © 2025 Filler Words Analyzer. Improve your communication skills.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
