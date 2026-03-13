import { BaziRequest, BaziResponse } from '../types';

export async function fetchBaziData(request: BaziRequest, retries = 3): Promise<BaziResponse> {
  const fullRequest = {
    tz: "Europe/Berlin",
    lon: 13.405,
    lat: 52.52,
    standard: ["CIVIL"],
    boundary: ["midnight"],
    ambiguousTime: ["earlier"],
    nonexistentTime: ["error"],
    ...request
  };

  for (let i = 0; i < retries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

    try {
      const response = await fetch('https://bafe-production.up.railway.app/calculate/bazi', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullRequest),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (i === retries - 1) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error('Request timed out after 5 seconds');
        }
        throw new Error(`Failed to fetch Bazi data: ${error instanceof Error ? error.message : String(error)}`);
      }
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Failed to fetch Bazi data after retries');
}
