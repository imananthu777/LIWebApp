import { useState } from 'react';
import { Box, Paper, Typography, Button, TextField } from '@mui/material';

function generatePDF(title, policyNumber) {
  const doc = [
    `%PDF-1.3`,
    `1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj`,
    `2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj`,
    `3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R /Resources << >> >> endobj`,
    `4 0 obj << /Length 44 >> stream\nBT /F1 24 Tf 50 100 Td (${title}) Tj 50 70 Td (Policy: ${policyNumber}) Tj ET\nendstream endobj`,
    `xref 0 5 0000000000 65535 f 0000000010 00000 n 0000000079 00000 n 0000000178 00000 n 0000000297 00000 n trailer << /Size 5 /Root 1 0 R >> startxref 410 %%EOF`
  ].join('\n');
  const blob = new Blob([doc], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}

export default function DocumentDownloadPage({ title = "Policy Document", customer }) {
  const [policyNumber, setPolicyNumber] = useState(customer.policies[0]?.number || '');
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleDownload = () => {
    const url = generatePDF(title, policyNumber);
    setPdfUrl(url);
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '_')}_${policyNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 400, mx: 'auto' }}>
      <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        <TextField
          select
          fullWidth
          label="Policy Number"
          value={policyNumber}
          onChange={e => setPolicyNumber(e.target.value)}
          sx={{ mb: 2 }}
          SelectProps={{ native: true }}
        >
          {customer.policies.map((p) => (
            <option key={p.number} value={p.number}>{p.number} - {p.name}</option>
          ))}
        </TextField>
        <Button
          fullWidth
          variant="contained"
          onClick={handleDownload}
          sx={{ py: 1.5, borderRadius: 1 }}
        >
          Download PDF
        </Button>
      </Paper>
    </Box>
  );
}
