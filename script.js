import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '2m', target: 200 }, // normal load
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '2m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function() {
  const BASE_URL = 'http://localhost:2555'; // make sure this is not production
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/1`,
      null,
      { tags: { name: '1' } },
    ],
    [
      'GET',
      `${BASE_URL}/100001`,
      null,
      { tags: { name: '100k' } },
    ],
    [
      'GET',
      `${BASE_URL}/500001`,
      null,
      { tags: { name: '500k' } },
    ],
    [
      'GET',
      `${BASE_URL}/1000000`,
      null,
      { tags: { name: '1mill' } },
    ],
  ]);
  responses.forEach((res) => {
    check(res, {
      'status was 200': r => r.status == 200,
      'transaction time OK': r => r.timings.duration < 2000,
    });
  });
  sleep(1);
}