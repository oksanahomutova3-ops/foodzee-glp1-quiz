/* Analytics shim — logs events to console */

const Analytics = {
  trackEvent(event: string, action?: string, params?: Record<string, any>) {
    if (typeof window !== 'undefined') {
      console.log('[Analytics]', event, action, params);
    }
  },
};

export default Analytics;
