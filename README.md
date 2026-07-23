# NASA APOD Viewer

A simple web app that displays NASA's Astronomy Picture of the Day (APOD) directly in the browser. Users can view today's image, search for a specific date, or explore a random APOD.

## Features
- View today's NASA APOD
- Search APOD by date
- Explore a random APOD
- Clean and responsive UI
- Works as a static site on GitHub Pages

## Tech Used
- HTML5
- CSS3
- JavaScript
- NASA APOD API
- AWS Lambda
- Amazon API Gateway
- Amazon CloudFront
- Amazon S3
- GitHub Pages

## How to Use
1. Open the site in your browser.
2. Click the date picker to select a date.
3. Press the search button to load that APOD.
4. Use the random button to view a different image.

## Project Structure
- index.html - Main webpage and UI
- README.md - Project information

## AWS Free-Tier Improvement Plan
If the images feel slow, the best low-cost AWS approach is to stop fetching NASA images directly from the browser and instead route them through a lightweight proxy that is cached closer to users.

Recommended setup:
1. Use AWS Lambda + API Gateway to proxy the NASA APOD API.
2. Enable CloudFront in front of the API Gateway endpoint for faster global delivery.
3. Optionally store the image responses in S3 or use CloudFront caching for repeated requests.
4. Keep the frontend on GitHub Pages and point it to your AWS endpoint.

Why this helps:
- Lower latency because the request is served from a nearby AWS edge location.
- Better caching for repeated APOD requests.
- Free-tier friendly for small traffic and personal projects.

To use it in this app:
- Set the AWS_PROXY_URL value in index.html to your deployed API Gateway URL.
- Deploy the sample Lambda function from lambda/apod-proxy.js.
- Add a NASA API key in the Lambda environment variables for production use.

## Notes
This project uses the public NASA APOD API and is designed to be hosted as a static website. The frontend now supports an optional AWS proxy endpoint for faster image delivery.
