import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const date = searchParams.get('date');
  const passengers = searchParams.get('passengers') || '1';

  if (!origin || !destination || !date) {
    return NextResponse.json(
      { error: 'Missing required parameters: origin, destination, date' },
      { status: 400 }
    );
  }

  // For now, redirect to Google Flights with search parameters
  // This provides immediate functionality while API integration is set up
  const googleFlightsUrl = new URL('https://www.google.com/travel/flights');
  googleFlightsUrl.searchParams.append('q', `flights from ${origin} to ${destination} on ${date}`);
  googleFlightsUrl.searchParams.append('tpp', '1'); // Enable price tracking
  
  // Alternative: Skyscanner redirect
  const skyscannerUrl = new URL('https://www.skyscanner.net/transport/flights');
  skyscannerUrl.searchParams.append('from', origin);
  skyscannerUrl.searchParams.append('to', destination);
  skyscannerUrl.searchParams.append('date', date);
  skyscannerUrl.searchParams.append('adults', passengers);

  // Return both options for the user to choose
  return NextResponse.json({
    success: true,
    searchParams: {
      origin,
      destination,
      date,
      passengers
    },
    externalLinks: {
      googleFlights: googleFlightsUrl.toString(),
      skyscanner: skyscannerUrl.toString()
    },
    message: 'API integration requires credentials. Redirecting to external search engines.'
  });
}

// TODO: Implement Amadeus API integration
// 1. Get API credentials from https://developers.amadeus.com
// 2. Add AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to .env.local
// 3. Implement OAuth2 token retrieval
// 4. Call Amadeus Flight Offers Search API

// TODO: Implement Kiwi/Tequila API integration  
// 1. Get API key from https://tequila.kiwi.com
// 2. Add KIWI_API_KEY to .env.local
// 3. Call Kiwi search endpoint with parameters
