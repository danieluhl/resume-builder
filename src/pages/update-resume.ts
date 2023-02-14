import type { APIRoute } from 'astro';
import { xata } from '../lib/xata';

export const post: APIRoute = async ({ request }) => {
  console.log({ request });
  console.log(request.headers.get('Content-Type'));
  if (request.headers.get('Content-Type') === 'application/json') {
    const body = await request.json();

    xata.db.resumes.update(body.id, { content: body.content });
    return new Response(
      JSON.stringify({
        message: `resume id ${body.id} content successfully updated`,
      }),
      {
        status: 200,
      }
    );
  }
  return new Response(null, { status: 400 });
};
