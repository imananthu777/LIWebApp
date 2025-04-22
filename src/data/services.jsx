import {
  CreditCard,
  CreditScore,
  DownloadForOffline,
  AccountBalance,
  Description,
  ShowChart,
  Chat,
  FileCopy,
  Security,
  ContactSupport,
  SwapHoriz,
  Receipt,
  Edit,
  Person,
  Email,
  Phone,
  LocationOn,
  AccountCircle,
  Payment
} from '@mui/icons-material';

export const services = [
  { icon: <CreditCard />, name: 'Premium Payment', path: '/payment' },
  { 
    icon: <Edit />, 
    name: 'Update Policy Information', 
    path: '/update-policy',
    subMenu: [
      { icon: <Person />, name: 'Update Name', path: '/update-policy/name' },
      { icon: <Email />, name: 'Update Email', path: '/update-policy/email' },
      { icon: <Phone />, name: 'Update Mobile', path: '/update-policy/mobile' },
      { icon: <LocationOn />, name: 'Update Address', path: '/update-policy/address' },
      { icon: <AccountCircle />, name: 'Update Nominee', path: '/update-policy/nominee' },
      { icon: <AccountBalance />, name: 'Update Bank Account', path: '/update-policy/bank' },
      { icon: <Payment />, name: 'Change Premium Frequency', path: '/update-policy/premium-frequency' }
    ]
  },
  { icon: <CreditScore />, name: 'Apply Policy Loan', path: '/apply-policy-loan' },
  {
    icon: <DownloadForOffline />,
    name: 'Download Policy Documents',
    path: '/documents',
    subMenu: [
      { name: 'Premium Paid Certificate', path: '/documents/premium-certificate' },
      { name: 'Renewal Receipt', path: '/documents/renewal-receipt' },
      { name: 'E-Policy Document', path: '/documents/e-policy' },
      { name: 'Account Statement (ULIP)', path: '/documents/account-statement' }
    ]
  },
  { icon: <AccountBalance />, name: 'Update Bank Account', path: '/update-policy/bank' },
  { icon: <Description />, name: 'Initiate a Claim', path: '/claim' },
  { icon: <ShowChart />, name: 'Fund Value (ULIP)', path: '/fund-value' },
  { icon: <Chat />, name: 'View Service Requests', path: '/service-requests' },
  { icon: <FileCopy />, name: 'Policy Document', path: '/documents' },
  { icon: <Security />, name: 'Update Nominee', path: '/nominee' },
  { icon: <ContactSupport />, name: 'Contact Us', path: '/contact' },
  { icon: <SwapHoriz />, name: 'Fund Switch', path: '/fund-switch' },
  { icon: <Receipt />, name: 'Premium Receipt', path: '/receipt' }
];