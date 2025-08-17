import { getHeaders, getPostHeaders, header, headers } from "../Utilities/getHeaders";

describe('Header Utility Functions', () => {
  beforeAll(() => {
    process.env.VITE_USER = 'testuser';
    process.env.VITE_PASSWORD = 'testpass';
  });

  test('basicAuthToken should be encoded correctly', () => {
    const expectedToken = btoa('testuser:testpass');
    expect(basicAuthToken).toBe(expectedToken);
  });

  test('getHeaders returns correct GET headers', () => {
    const result = getHeaders();
    expect(result).toEqual({
      method: 'GET',
      headers: {
        Authorization: `Basic ${btoa('testuser:testpass')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  });

  test('getPostHeaders returns correct POST headers with body', () => {
    const body = { key: 'value' };
    const result = getPostHeaders(body);
    expect(result).toEqual({
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa('testuser:testpass')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  });

  test('header returns correct plain header object', () => {
    const result = header();
    expect(result).toEqual({
      Authorization: `Basic ${btoa('testuser:testpass')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    });
  });

  test('headers returns correct headers object', () => {
    const result = headers();
    expect(result).toEqual({
      headers: {
        Authorization: `Basic ${btoa('testuser:testpass')}`,
        'Content-Type': 'application/json',
      },
    });
  });
});
