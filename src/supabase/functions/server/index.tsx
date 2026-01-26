import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-baa3db23/health", (c) => {
  return c.json({ status: "ok" });
});

// Leads Endpoints
app.post("/make-server-baa3db23/leads", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    
    const lead = {
      id,
      ...body,
      date: timestamp,
      status: body.status || 'New',
      source: body.source || 'Website'
    };

    await kv.set(`lead:${id}`, lead);
    return c.json(lead);
  } catch (error) {
    console.error("Error creating lead:", error);
    return c.json({ error: "Failed to create lead" }, 500);
  }
});

app.get("/make-server-baa3db23/leads", async (c) => {
  try {
    const leads = await kv.getByPrefix("lead:");
    return c.json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    return c.json({ error: "Failed to fetch leads" }, 500);
  }
});

app.put("/make-server-baa3db23/leads/:id/status", async (c) => {
  try {
    const id = c.req.param('id');
    const { status } = await c.req.json();
    
    const lead = await kv.get(`lead:${id}`);
    if (!lead) {
      return c.json({ error: "Lead not found" }, 404);
    }
    
    const updatedLead = { ...lead, status };
    await kv.set(`lead:${id}`, updatedLead);
    
    return c.json(updatedLead);
  } catch (error) {
    console.error("Error updating lead status:", error);
    return c.json({ error: "Failed to update lead status" }, 500);
  }
});

// Settings Endpoints
app.get("/make-server-baa3db23/settings", async (c) => {
  try {
    const settings = await kv.get("settings");
    return c.json(settings || {});
  } catch (error) {
    console.error("Error fetching settings:", error);
    return c.json({ error: "Failed to fetch settings" }, 500);
  }
});

app.post("/make-server-baa3db23/settings", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("settings", body);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving settings:", error);
    return c.json({ error: "Failed to save settings" }, 500);
  }
});

Deno.serve(app.fetch);