import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const origin = searchParams.get('origin'); // IATA code
  const destination = searchParams.get('destination'); // IATA code
  const date = searchParams.get('date');
  const passengers = searchParams.get('passengers') || '1';
  const tripType = searchParams.get('tripType') || 'one-way';
  const returnDate = searchParams.get('returnDate');

  if (!origin || !destination || !date) {
    return NextResponse.json(
      { error: 'Missing required parameters: origin, destination, date' },
      { status: 400 }
    );
  }

  if (tripType === 'round-trip' && !returnDate) {
    return NextResponse.json(
      { error: 'Return date is required for round-trip flights' },
      { status: 400 }
    );
  }

  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  const marker = process.env.TRAVELPAYOUTS_MARKER;

  if (!token) {
    return NextResponse.json(
      { error: 'Travelpayouts API token not configured' },
      { status: 500 }
    );
  }

  try {
    // Step 1: Initialize flight search with Travelpayouts
    const searchParamsFlight = new URLSearchParams({
      token,
      marker: marker || '',
      currency: 'usd',
      locale: 'en',
      trip_class: '0', // Economy
      passengers: passengers,
    });

    // Build segments based on trip type
    const segments = [
      {
        origin,
        destination,
        date,
      }
    ];

    if (tripType === 'round-trip' && returnDate) {
      segments.push({
        origin: destination,
        destination: origin,
        date: returnDate,
      });
    }

    searchParamsFlight.append('segments', JSON.stringify(segments));

    const searchResponse = await fetch(
      `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${searchParamsFlight.toString()}`,
      {
        headers: {
          'X-Access-Token': token,
          'Accept-Encoding': 'gzip, deflate',
        },
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`Travelpayouts API error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();

    // If we got flight data, return it
    if (searchData && searchData.success !== false) {
      return NextResponse.json({
        success: true,
        data: searchData,
        searchParams: {
          origin,
          destination,
          date,
          passengers,
          tripType,
          returnDate
        },
        message: 'Flight search results from Travelpayouts'
      });
    }

    // Fallback: If no direct results, generate Travelpayouts affiliate link
    let affiliateUrl = `https://www.aviasales.com/search?marker=${marker || ''}&currency=usd&locale=en&origin_iata=${origin}&destination_iata=${destination}&depart_date=${date}&adults=${passengers}`;

    if (tripType === 'round-trip' && returnDate) {
      affiliateUrl += `&return_date=${returnDate}`;
    }

    return NextResponse.json({
      success: true,
      searchParams: {
        origin,
        destination,
        date,
        passengers,
        tripType,
        returnDate
      },
      affiliateLink: affiliateUrl,
      message: 'Redirecting to Travelpayouts affiliate search'
    });

  } catch (error) {
    console.error('Travelpayouts API error:', error);

    // Fallback to Travelpayouts affiliate link on error
    const marker = process.env.TRAVELPAYOUTS_MARKER || '';
    let affiliateUrl = `https://www.aviasales.com/search?marker=${marker}&currency=usd&locale=en&origin_iata=${origin}&destination_iata=${destination}&depart_date=${date}&adults=${passengers}`;

    if (tripType === 'round-trip' && returnDate) {
      affiliateUrl += `&return_date=${returnDate}`;
    }

    return NextResponse.json({
      success: true,
      searchParams: {
        origin,
        destination,
        date,
        passengers,
        tripType,
        returnDate
      },
      affiliateLink: affiliateUrl,
      message: 'Using fallback affiliate link due to API error'
    });
  }
}
