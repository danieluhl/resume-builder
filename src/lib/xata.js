import { XataClient } from './xata.codegen';

const apiKey = import.meta.env.PUBLIC_XATA_API_KEY;

export const xata = new XataClient({
  enableBrowser: true,
  apiKey: apiKey,
});
