import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/** Must match api/subscribe.ts */
const BREVO_LIST_ID = 7;

function splitName(full: string): { first: string; last: string | undefined } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: "", last: undefined };
  if (parts.length === 1) return { first: parts[0], last: undefined };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

function brevoDevProxy(brevoApiKey: string): Plugin {
  return {
    name: "brevo-dev-proxy",
    enforce: "pre",
    configureServer(server) {
      // Match by URL — more reliable than connect path routing for /api/subscribe
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url !== "/api/subscribe" || req.method !== "POST") {
          next();
          return;
        }

        let rawBody = "";
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          rawBody = Buffer.concat(chunks).toString("utf8");
          const body = JSON.parse(rawBody || "{}") as { email?: string; name?: string };

          const email = typeof body.email === "string" ? body.email.trim() : "";
          const name = typeof body.name === "string" ? body.name.trim() : "";
          if (!email || !name) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Email and name are required" }));
            return;
          }

          const { first, last } = splitName(name);
          const base = {
            email,
            listIds: [BREVO_LIST_ID],
            updateEnabled: true,
          };

          const attempts: Record<string, unknown>[] = [
            { ...base },
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
          ];

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

            const text = await response.text();
            let data: unknown = {};
            try {
              data = text ? JSON.parse(text) : {};
            } catch {
              data = { message: text?.slice(0, 300) };
            }
            lastStatus = response.status;
            lastData = data;

            if (response.ok) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true }));
              return;
            }

            console.error("[brevo dev] attempt failed:", response.status, data);

            if (response.status === 401 || response.status === 403) {
              res.statusCode = 502;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: "We could not complete your signup. Please try again in a moment.",
                  code: "BREVO_UNAUTHORIZED",
                  details: data,
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
          console.error("[brevo dev proxy]", err);
          res.statusCode = rawBody ? 500 : 400;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: err instanceof Error ? err.message : "Internal server error",
            })
          );
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
      // API proxy must register before other middleware so /api/subscribe is not swallowed by SPA
      mode === "development" && env.BREVO_API_KEY && brevoDevProxy(env.BREVO_API_KEY),
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
