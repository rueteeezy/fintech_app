import React, { useEffect, useState, useCallback } from 'react';
import {
  Paper, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Button, Alert,
  CircularProgress, Box, Dialog, DialogTitle,
  DialogContent, DialogActions, Divider, Chip, TextField
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';

const API_BASE = 'http://localhost:8080';

export default function Subscribers({ token }) {
  const [subs, setSubs] = useState([]);
  const [filteredSubs, setFilteredSubs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch subscribers
  const fetchList = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`${API_BASE}/subscribers`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      if (!res.ok) throw new Error('Failed to fetch subscribers list');
      const data = await res.json();
      setSubs(data);
      setFilteredSubs(data);
      generateChartData(data);
    } catch (e) {
      setErr(e.message || 'Could not connect to backend');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchList(); }, [fetchList]);

  // Details
  async function viewOne(id) {
    try {
      const res = await fetch(`${API_BASE}/subscribers/${id}`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      if (!res.ok) throw new Error('Subscriber details not found');
      const data = await res.json();
      setSelected(data);
    } catch (e) {
      alert(e.message);
    }
  }

  // Chart data from ALL subs
  const generateChartData = (subs) => {
    const map = {};
    subs.forEach(s => {
      const date = new Date(s.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      map[key] = (map[key] || 0) + 1;
    });
    const data = Object.keys(map).sort().map(k => ({ month: k, total: map[k] }));
    setChartData(data);
  };

  // Search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredSubs(subs);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = subs.filter(s =>
        s.firstName.toLowerCase().includes(term) ||
        s.lastName.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term)
      );
      setFilteredSubs(filtered);
    }
  }, [searchTerm, subs]);

  const LoadingView = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
      <CircularProgress />
    </Box>
  );

  const ErrorView = () => (
    <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>
  );

  return (
    // Fills the viewport height (minus app bar)
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 64px)',   // adjust 64px based on your AppBar height
        px: 3,
        py: 2,
        boxSizing: 'border-box',
      }}
    >
      {loading && <LoadingView />}
      {err && <ErrorView />}

      {!loading && !err && (
        // Two panels row, taking ALL available height
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            width: '100%',
            height: '100%',
          }}
        >
          {/* LEFT PANEL – Chart */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              borderRadius: 2,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Subscribers Created Per Month
            </Typography>

            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 16, right: 24, left: 0, bottom: 24 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="total" fill="#1976d2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>

          {/* RIGHT PANEL – Subscribers Table */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              borderRadius: 2,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography
                variant="h4"
                component="h2"
                color="text.primary"
                sx={{ fontWeight: 'medium' }}
              >
                Subscribers
              </Typography>
            </Box>

            <TextField
              fullWidth
              size="small"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Divider sx={{ mb: 2 }} />

            <TableContainer
              sx={{
                flexGrow: 1,
                minHeight: 0,
                overflowY: 'auto',
              }}
            >
              <Table stickyHeader aria-label="subscribers table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>First Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Last Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Full Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Phone</TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSubs.map((s) => (
                    <TableRow hover key={s.id}>
                      <TableCell><Chip label={`#${s.id}`} size="small" /></TableCell>
                      <TableCell>{s.firstName}</TableCell>
                      <TableCell>{s.lastName}</TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>{s.phone}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => viewOne(s.id)}
                          sx={{ borderRadius: 5, textTransform: 'none' }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredSubs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No subscribers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}

      {/* Dialog */}
      <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <PersonIcon sx={{ mr: 1 }} /> Subscriber Details
        </DialogTitle>
        <DialogContent dividers sx={{ p: 4 }}>
          {selected && (
            <Box>
              <Chip label={`ID: ${selected.id}`} color="primary" variant="outlined" sx={{ mb: 2 }} />
              <Typography variant="subtitle2" color="text.secondary">Full Name</Typography>
              <Typography variant="h6" gutterBottom>{selected.name}</Typography>

              <Typography variant="subtitle2" color="text.secondary">Email</Typography>
              <Typography variant="body1" gutterBottom>{selected.email}</Typography>

              <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
              <Typography variant="body1">{selected.phone}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <Button onClick={() => setSelected(null)} variant="contained">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
