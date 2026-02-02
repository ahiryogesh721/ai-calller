import express from 'express';
import bodyParser from 'body-parser';
import { twilioRouter } from './routes/twilio.routes';
import { startSheetPolling } from './jobs/pollSheets.job';
import { port } from './config/env';

export function startServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/twilio', twilioRouter);
  app.get('/', (req, res) => {
    res.send('AI Real Estate Caller is running ');
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  startSheetPolling();
}
