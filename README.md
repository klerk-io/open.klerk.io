# Welcome to Klerk Community Edition

This is a tool to save data temporarily on a storage system outside of your own infrastructure. You can leverage the power of serverless technology and secure locker IDs. We aim to provide integrations to major cloud function providers like Google Cloud Platform, Amazon Web Services. If you wish to do so, please expand the functionality to Microsoft Azure and Apache OpenWhisk.

## Configuration

To configure the service for your organization, copy the `example.env` file to `.env` and change the configuration to your specific needs. Most importantly, change the `LOCKER_SALT` value to a random string of your choice. This prevents attackers from guessing IDs within you service.

## Deployment

Depending on the platform there are different ways of deployment. Please refer to the platform documentation for details. For **Google Cloud Platform** enter `npm run gcloud-deploy` after setting up your credentials.

## Usage

You can send JSON data to the `https://your.deployment-example-url.com/lockers/yield` endpoint with a POST request and retrieve your data from `https://your.deployment-example-url.com/lockers/fetch/{{ LOCKER_ID }}` with a GET request.
