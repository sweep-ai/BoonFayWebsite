import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function brevoDevProxy(brevoApiKey: string): Plugin {
  return {
    name: 'brevo-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/subscribe', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const body = JSON.parse(Buffer.concat(chunks).toString());

        const { email, name, goal, q1, q2, q3 } = body;
        if (!email || !name) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Email and name are required' }));
          return;
        }

        try {
          const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'content-type': 'application/json',
              'api-key': brevoApiKey,
            },
            body: JSON.stringify({
              email,
              listIds: [7],
              attributes: {
                FIRSTNAME: name,
                GOAL: goal ?? '',
                QUIZ_Q1: q1 ?? '',
                QUIZ_Q2: q2 ?? '',
                QUIZ_Q3: q3 ?? '',
              },
              updateEnabled: true,
            }),
          });

          const data = await response.json().catch(() => ({}));
          res.statusCode = response.ok ? 200 : response.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(response.ok ? { success: true } : { error: 'Brevo error', details: data }));
        } catch (err) {
          console.error('Brevo dev proxy error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal server error' }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      mode === 'development' && env.BREVO_API_KEY && brevoDevProxy(env.BREVO_API_KEY),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
