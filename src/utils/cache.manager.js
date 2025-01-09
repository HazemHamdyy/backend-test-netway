import { createCache } from 'cache-manager';


const cache = createCache({
  store: 'memory',  // In-memory cache
  ttl: 1800,        // Cache TTL (Time to Live) in seconds (1 hour)
});

export default cache;