import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function splitName(full: string): { first: string; last: string | undefined } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: "", last: undefined };
  if (parts.length === 1) return { first: parts[0], last: undefined };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

function parseListIds(raw: string | undefined): number[] {
  const s = raw ?? "7";
  const ids = s
    .split(/[,\s]+/)
    .map((x) => parseInt(x.trim(), 10))
    .filter((n) => !Number.isNaN(n));
  return ids.length > 0 ? ids : [7];
}

function brevoDevProxy(brevoApiKey: string, listIdEnv: string | undefined): Plugin {
  return {
    name: "brevo-dev-proxy",
    configureServer(server) {
      server.middlewares.use("/api/subscribe", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const body = JSON.parse(Buffer.concat(chunks).toString()) as {
          email?: string;
          name?: string;
        };

        const email = typeof body.email === "string" ? body.email.trim() : "";
        const name = typeof body.name === "string" ? body.name.trim() : "";
        if (!email || !name) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "Email and name are required" }));
          return;
        }

        const listIds = parseListIds(listIdEnv);
        const { first, last } = splitName(name);
        const base = { email, listIds, updateEnabled: true };

        const attempts: Record<string, unknown>[] = [
          {
            ...base,
            attributes: {
              FNAME: first,
              ...(last ? { LNAME: last } : {}),
            },
          },
          {
            ...base,
            attributes: {
              FIRSTNAME: first,
              ...(last ? { LASTNAME: last } : {}),
            },
          },
          { ...base },
        ];

        try {
          let lastStatus = 0;
          let lastData: unknown = {};

          for (const payload of attempts) {
            const response = await fetch("https://api.brevo.com/v3/contacts", {
              method: "POST",
              headers: {
                accept: "application/json",
                "content-type": "application/json",
                "api-key": brevoApiKey,
              },
              body: JSON.stringify(payload),
            });

            const data = await response.json().catch(() => ({}));
            lastStatus = response.status;
            lastData = data;

            if (response.ok) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true }));
              return;
            }

            if (response.status === 401 || response.status === 403) {
              res.statusCode = 502;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: "We could not complete your signup. Please try again in a moment.",
                  code: "BREVO_UNAUTHORIZED",
                })
              );
              return;
            }

            if (response.status !== 400 && response.status !== 404) {
              break;
            }
          }

          res.statusCode = 502;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: "Failed to add contact",
              code: "BREVO_REJECTED",
              details: lastData,
              brevoStatus: lastStatus,
            })
          );
        } catch (err) {
          console.error("Brevo dev proxy error:", err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Internal server error" }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      mode === "development" &&
        env.BREVO_API_KEY &&
        brevoDevProxy(env.BREVO_API_KEY, env.BREVO_LIST_ID),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
