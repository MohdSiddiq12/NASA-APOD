const https = require('https');
const { URL } = require('url');

exports.handler = async (event) => {
  const date = event.queryStringParameters?.date || '';
  const nasaKey = process.env.NASA_API_KEY || 'DEMO_KEY';
  const apiUrl = new URL('https://api.nasa.gov/planetary/apod');

  apiUrl.searchParams.set('api_key', nasaKey);
  if (date) apiUrl.searchParams.set('date', date);

  const response = await fetchFromNasa(apiUrl.toString());
  const payload = typeof response === 'string' ? JSON.parse(response) : response;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      ...payload,
      imageUrl: payload.hdurl || payload.url || ''
    })
  };
};

function fetchFromNasa(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
  });
}
