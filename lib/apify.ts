import { apify } from './config';
import { ApifyClient } from 'apify-client';

export const client = new ApifyClient({
  token: apify.apiKey,
});

export const scrapeLinkedInProfile = async (profileUrl: string) => {
  const input = {
    username: profileUrl,
    includeEmail: false,
  };

  const run = await client.actor(apify.linkedin.linkedinProfileScraperActorId).call(input);

  if (!run?.defaultDatasetId) {
    throw new Error('No dataset ID returned from Apify actor run.');
  }

  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  return items[0] ?? null;
};