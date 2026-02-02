import * as Sentry from "@sentry/node";
import { sentryDsn  } from "../config/env";
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,

    // Environment (optional but strongly recommended)
    environment:  "development",

    // Error Monitoring
    // enabled by default once init() runs

    // Logs
    enableLogs: true,

    // Tracing
    tracesSampleRate: 1.0, // reduce in production

    // Profiling
    profileSessionSampleRate: 1.0, // evaluated once per process
    profileLifecycle: "trace",

    // PII (IP address, user-agent, etc.)
    sendDefaultPii: true,
  });
}
export { Sentry };
