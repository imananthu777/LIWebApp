import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack
} from '@mui/material';

// Sample data - in a real app, this would come from an API
const sampleRequests = [
  {
    id: 'SR001',
    type: 'Address Update',
    status: 'Pending',
    date: '2025-04-20',
    policyNumber: 'POL-123456'
  },
  {
    id: 'SR002',
    type: 'Bank Account Update',
    status: 'Completed',
    date: '2025-04-18',
    policyNumber: 'POL-123456'
  },
  {
    id: 'SR003',
    type: 'Name Change',
    status: 'In Progress',
    date: '2025-04-15',
    policyNumber: 'POL-123456'
  }
];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'success';
    case 'in progress':
      return 'primary';
    case 'pending':
      return 'warning';
    default:
      return 'default';
  }
};

// Mobile view card component
const RequestCard = ({ request }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Stack spacing={1}>
        <Typography variant="subtitle2" color="text.secondary">
          Request ID: {request.id}
        </Typography>
        <Typography variant="body1" fontWeight="medium">
          {request.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Policy: {request.policyNumber}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {new Date(request.date).toLocaleDateString()}
          </Typography>
          <Chip
            label={request.status}
            color={getStatusColor(request.status)}
            size="small"
          />
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default function ServiceRequestsPage() {
  const [requests] = useState(sampleRequests);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ p: 2, pb: 7 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Service Requests
      </Typography>

      {isMobile ? (
        // Mobile view - cards
        <Box>
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </Box>
      ) : (
        // Desktop view - table
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Policy Number</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.policyNumber}</TableCell>
                  <TableCell>
                    {new Date(request.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={request.status}
                      color={getStatusColor(request.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}