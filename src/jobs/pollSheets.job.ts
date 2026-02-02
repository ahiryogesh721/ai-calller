import cron from 'node-cron';
import { getNewLeads } from '../services/sheet.service';
import { startCall } from '../services/call.service';

export function startSheetPolling() {
  cron.schedule('*/2 * * * *', async () => {
    const leads = await getNewLeads();
    for (const lead of leads) {
      await startCall(lead.phone);
    }
  });
}
