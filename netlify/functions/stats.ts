export const handler = async (event: any) => {
  // Netlify functions are stateless, so we return mock stats or connect to a DB
  const stats = {
    totalRequests: 1250,
    activeUsers: 450,
    weatherQueries: 800,
    flightQueries: 450,
    lastUpdate: new Date().toISOString()
  };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stats)
  };
};
