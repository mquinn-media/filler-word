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
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  Mic as MicIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
  RecordVoiceOver as VoiceIcon,
} from '@mui/icons-material';
import firefliesService from './services/firefilesService';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [userName, setUserName] = useState('');
  const [inputName, setInputName] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [userAnalytics, setUserAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState(null);

  useEffect(() => {
    // Check if user name exists in localStorage
    const storedName = localStorage.getItem('teamsUserName');
    if (storedName) {
      setUserName(storedName);
    } else {
      setOpenModal(true);
    }
  }, []);

  useEffect(() => {
    // Fetch analytics from Fireflies API for the last 30 days
    const fetchAnalytics = async () => {
      setLoadingAnalytics(true);
      setAnalyticsError(null);
      try {
        // Calculate date range for last 30 days
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        
        const startTime = startDate.toISOString();
        const endTime = endDate.toISOString();
        
        console.log('Fetching analytics from', startTime, 'to', endTime);
        
        const data = await firefliesService.getAnalytics(startTime, endTime);
        console.log('Analytics Response:', data);
        setAnalytics(data.analytics);
        
        // If userName is set, fetch user-specific analytics
        if (userName) {
          const userData = await firefliesService.getUserAnalytics(userName, startTime, endTime);
          console.log('User Analytics:', userData);
          setUserAnalytics(userData);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        setAnalyticsError(error.message);
      } finally {
        setLoadingAnalytics(false);
      }
    };

    fetchAnalytics();
  }, [userName]);

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
            Please enter your name as it appears in Teams meetings.
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
          background: 'linear-gradient(135deg, #9ec1fa 0%, #7ba7f7 100%)',
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
            Improve your speaking clarity and confidence
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="600" sx={{ mb: 6 }}>
          Your meeting analysis will apppear below:
        </Typography>
        
        <Grid container spacing={4}>
          {/* Feature Card 1 */}
          <Grid item xs={12}>
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
        </Grid>

        {/* Analytics Container */}
        <Box sx={{ mt: 4 }}>
          <Card elevation={2}>
            <CardContent sx={{ minHeight: '200px', p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Analytics - Last 30 Days
              </Typography>
              
              {loadingAnalytics && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              )}

              {analyticsError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Error loading analytics: {analyticsError}
                </Alert>
              )}

              {!loadingAnalytics && !analyticsError && !analytics && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  No analytics data available.
                </Typography>
              )}

              {!loadingAnalytics && !analyticsError && analytics && (
                <Box>
                  {/* Team Analytics */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                      Team Overview
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Total Meetings
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            {analytics.team?.conversation?.total_meetings_count || 0}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Avg Filler Words
                          </Typography>
                          <Typography variant="h4" fontWeight="bold" color="error.main">
                            {analytics.team?.conversation?.average_filler_words?.toFixed(1) || 0}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Avg Words/Min
                          </Typography>
                          <Typography variant="h4" fontWeight="bold" color="success.main">
                            {analytics.team?.conversation?.average_words_per_minute?.toFixed(0) || 0}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Avg Questions
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            {analytics.team?.conversation?.average_questions?.toFixed(1) || 0}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Avg Monologues
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            {analytics.team?.conversation?.average_monologues_count?.toFixed(1) || 0}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Avg Talk/Listen Ratio
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            {analytics.team?.conversation?.average_talk_listen_ratio?.toFixed(2) || 0}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Team Members
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            {analytics.team?.conversation?.teammates_count || 0}
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                    
                    {/* Sentiment */}
                    {analytics.team?.conversation?.average_sentiments && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                          Average Sentiment
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="h5" color="success.main" fontWeight="bold">
                                {analytics.team.conversation.average_sentiments.positive_pct?.toFixed(1) || 0}%
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Positive
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="h5" color="text.secondary" fontWeight="bold">
                                {analytics.team.conversation.average_sentiments.neutral_pct?.toFixed(1) || 0}%
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Neutral
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="h5" color="error.main" fontWeight="bold">
                                {analytics.team.conversation.average_sentiments.negative_pct?.toFixed(1) || 0}%
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Negative
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>

                  {/* User Analytics */}
                  {userAnalytics && (
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Your Performance ({userAnalytics.user_name || userName})
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Card variant="outlined" sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                            <Typography variant="body2" gutterBottom>
                              Your Filler Words
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {userAnalytics.conversation?.user_filler_words || 0}
                            </Typography>
                            {userAnalytics.conversation?.user_filler_words_diff_pct && (
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {userAnalytics.conversation.user_filler_words_diff_pct > 0 ? '▲' : '▼'} 
                                {Math.abs(userAnalytics.conversation.user_filler_words_diff_pct).toFixed(1)}%
                              </Typography>
                            )}
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Card variant="outlined" sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                            <Typography variant="body2" gutterBottom>
                              Your Words/Min
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {userAnalytics.conversation?.user_words_per_minute?.toFixed(0) || 0}
                            </Typography>
                            {userAnalytics.conversation?.user_words_per_minute_diff_pct && (
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {userAnalytics.conversation.user_words_per_minute_diff_pct > 0 ? '▲' : '▼'} 
                                {Math.abs(userAnalytics.conversation.user_words_per_minute_diff_pct).toFixed(1)}%
                              </Typography>
                            )}
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Card variant="outlined" sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                            <Typography variant="body2" gutterBottom>
                              Your Questions
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {userAnalytics.conversation?.user_questions || 0}
                            </Typography>
                            {userAnalytics.conversation?.user_questions_diff_pct && (
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {userAnalytics.conversation.user_questions_diff_pct > 0 ? '▲' : '▼'} 
                                {Math.abs(userAnalytics.conversation.user_questions_diff_pct).toFixed(1)}%
                              </Typography>
                            )}
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Card variant="outlined" sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                            <Typography variant="body2" gutterBottom>
                              Your Monologues
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {userAnalytics.conversation?.user_monologues_count || 0}
                            </Typography>
                            {userAnalytics.conversation?.user_monologues_count_diff_pct && (
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {userAnalytics.conversation.user_monologues_count_diff_pct > 0 ? '▲' : '▼'} 
                                {Math.abs(userAnalytics.conversation.user_monologues_count_diff_pct).toFixed(1)}%
                              </Typography>
                            )}
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Card variant="outlined" sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                            <Typography variant="body2" gutterBottom>
                              Your Talk/Listen %
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {userAnalytics.conversation?.talk_listen_pct?.toFixed(1) || 0}%
                            </Typography>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Card variant="outlined" sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                            <Typography variant="body2" gutterBottom>
                              Your Meetings
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {userAnalytics.meeting?.count || 0}
                            </Typography>
                            {userAnalytics.meeting?.count_diff_pct && (
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {userAnalytics.meeting.count_diff_pct > 0 ? '▲' : '▼'} 
                                {Math.abs(userAnalytics.meeting.count_diff_pct).toFixed(1)}%
                              </Typography>
                            )}
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* All Users List */}
                  {analytics.users && analytics.users.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        All Team Members
                      </Typography>
                      <List>
                        {analytics.users.map((user, idx) => (
                          <ListItem 
                            key={user.user_id || idx}
                            sx={{ 
                              borderBottom: '1px solid #e0e0e0',
                              '&:last-child': { borderBottom: 'none' },
                              bgcolor: user.user_name === userName ? 'primary.light' : 'transparent',
                            }}
                          >
                            <ListItemText
                              primary={
                                <Typography fontWeight={user.user_name === userName ? 'bold' : 'normal'}>
                                  {user.user_name || 'Unknown User'} {user.user_name === userName && '(You)'}
                                </Typography>
                              }
                              secondary={
                                <React.Fragment>
                                  <Grid container spacing={2} sx={{ mt: 0.5 }}>
                                    <Grid item xs={6} sm={3}>
                                      <Typography variant="body2" color="text.secondary" component="span" display="block">
                                        Filler Words: <strong>{user.conversation?.user_filler_words || 0}</strong>
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                      <Typography variant="body2" color="text.secondary" component="span" display="block">
                                        Words/Min: <strong>{user.conversation?.user_words_per_minute?.toFixed(0) || 0}</strong>
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                      <Typography variant="body2" color="text.secondary" component="span" display="block">
                                        Questions: <strong>{user.conversation?.user_questions || 0}</strong>
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                      <Typography variant="body2" color="text.secondary" component="span" display="block">
                                        Meetings: <strong>{user.meeting?.count || 0}</strong>
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </React.Fragment>
                              }
                              secondaryTypographyProps={{ component: 'div' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

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
