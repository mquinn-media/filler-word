import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Mic as MicIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
  RecordVoiceOver as VoiceIcon,
} from '@mui/icons-material';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [userName, setUserName] = useState('');
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    // Check if user name exists in localStorage
    const storedName = localStorage.getItem('teamsUserName');
    if (storedName) {
      setUserName(storedName);
    } else {
      setOpenModal(true);
    }
  }, []);

  const handleSaveName = () => {
    if (inputName.trim()) {
      localStorage.setItem('teamsUserName', inputName.trim());
      setUserName(inputName.trim());
      setOpenModal(false);
      setInputName('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveName();
    }
  };

  const handleOpenSettings = () => {
    setInputName(userName);
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
    setInputName('');
  };

  const handleUpdateName = () => {
    if (inputName.trim()) {
      localStorage.setItem('teamsUserName', inputName.trim());
      setUserName(inputName.trim());
      setOpenSettings(false);
      setInputName('');
    }
  };

  const handleSettingsKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdateName();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Welcome Modal */}
      <Dialog 
        open={openModal} 
        onClose={() => {}} 
        disableEscapeKeyDown
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
          <VoiceIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="div" fontWeight="bold">
            Welcome to Filler Words Analyzer
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            To personalize your experience, please enter your name as it appears in Teams meetings.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Your Name"
            placeholder="e.g., John Smith"
            variant="outlined"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSaveName}
            disabled={!inputName.trim()}
          >
            Get Started
          </Button>
        </DialogActions>
      </Dialog>

      {/* Settings Modal */}
      <Dialog 
        open={openSettings} 
        onClose={handleCloseSettings}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" component="div" fontWeight="bold">
            Settings
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Update your name as it appears in Teams meetings
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Your Name"
            placeholder="e.g., John Smith"
            variant="outlined"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyPress={handleSettingsKeyPress}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseSettings}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdateName}
            disabled={!inputName.trim()}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* App Bar */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <MicIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Filler Words Analyzer
          </Typography>
          {userName && (
            <Typography variant="body2" sx={{ mr: 2 }}>
              Welcome, {userName}
            </Typography>
          )}
          <IconButton color="inherit" onClick={handleOpenSettings}>
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
