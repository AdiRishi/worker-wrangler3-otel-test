import { PartialTraceConfig, instrument } from '@microlabs/otel-cf-workers';

export interface Env {}

const handler = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return new Response(JSON.stringify({ hello: 'world' }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  },
};

const config: PartialTraceConfig = {
  exporter: {
    url: 'https://api.honeycomb.io',
    headers: { // TODO use the simple way for testing
      'x-honeycomb-team': 'SECRET',
    },
  },
  service: { name: 'worker-greetings' },
};

export default instrument(handler, config);
