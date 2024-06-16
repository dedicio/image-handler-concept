import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from "k6/metrics";
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

// const bunLatency = new Trend("bun_duration");
const fastifyLatency = new Trend("fastify_duration");
const expressLatency = new Trend("express_duration");

export const options = {
  noVUConnectionReuse: true,

  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(99)<1000'], // 99% of requests should be below 1s
  },

  scenarios: {
    // bun: {
    //   executor: 'ramping-arrival-rate',
    //   exec: "bun",
    //   startRate: 30,
    //   timeUnit: '1m',
    //   preAllocatedVUs: 30,
    //   stages: [
    //     { target: 30, duration: '1m' },
    //     { target: 100, duration: '2m' },
    //     { target: 100, duration: '4m' },
    //     { target: 20, duration: '2m' },
    //   ],
    // },

    // express: {
    //   executor: 'ramping-arrival-rate',
    //   exec: "express",
    //   startRate: 30,
    //   timeUnit: '1m',
    //   preAllocatedVUs: 30,
    //   stages: [
    //     { target: 30, duration: '1m' },
    //     { target: 100, duration: '2m' },
    //     { target: 100, duration: '4m' },
    //     { target: 20, duration: '2m' },
    //   ],
    // },

    // fastify: {
    //   executor: 'ramping-arrival-rate',
    //   exec: "fastify",
    //   startRate: 30,
    //   timeUnit: '1m',
    //   preAllocatedVUs: 30,
    //   stages: [
    //     { target: 30, duration: '1m' },
    //     { target: 100, duration: '2m' },
    //     { target: 100, duration: '4m' },
    //     { target: 20, duration: '2m' },
    //   ],
    // }

    // bun: {
    //   executor: 'ramping-vus',
    //   exec: 'bun',
    //   stages: [
    //     { duration: '10s', target: 20 },
    //     { duration: '50s', target: 20 },
    //     { duration: '5s', target: 0 },
    //   ],
    // },

    express: {
      executor: 'ramping-vus',
      exec: 'express',
      stages: [
        { duration: '10s', target: 10 },
        { duration: '50s', target: 10 },
        { duration: '5s', target: 0 },
      ],
    },

    fastify: {
      executor: 'ramping-vus',
      exec: 'fastify',
      stages: [
        { duration: '10s', target: 10 },
        { duration: '50s', target: 10 },
        { duration: '5s', target: 0 },
      ],
    },
  }
};

const LATENCIES = {
  // bun: bunLatency,
  express: expressLatency,
  fastify: fastifyLatency,
}

const image = open('downtown.jpg', 'b');

function request(url, api) {
  const fd = new FormData();

  fd.append('key', 'product');
  fd.append('account', 'my-store');
  fd.append('image', http.file(image, 'image.jpg', 'image/jpeg'));

  const res = http.post(url, fd.body(), {
    headers: { 'Content-Type': 'multipart/form-data; boundary=' + fd.boundary },
    tags: { api }
  });

  const latency = LATENCIES[api];

  latency.add(res.timings.duration);

  return res;
}

// export function bun() {
//   const res = request('http://localhost:4001/upload', 'bun');

//   check(res, {
//     'is status 200': (r) => r.status === 200,
//   });
// }

export function express() {
  const res = request('http://localhost:4002/upload', 'express');

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}

export function fastify() {
  const res = request('http://localhost:4003/upload', 'fastify');

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
