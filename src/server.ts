import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`🚀 server listen on port ${PORT}`);
});
