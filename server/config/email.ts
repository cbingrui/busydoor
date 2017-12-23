const config = {
  Service: process.env.SERVICE || 'SMTP',
  Account: {
    Username: process.env.USERNAME || 'youremail@ethereal.com',
    Password: process.env.PASSWORD || 'yourpassword'
  },
  Hostname: process.env.HOSTNAME || 'smtp.ethereal.com',
  Port: 465,
  Security: process.env.SECURITY || 'true',
  FromName: 'busydoor'
};

export default config;
