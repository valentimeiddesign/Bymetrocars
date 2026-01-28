import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

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

// Custom Middleware Examples
// Authentication middleware
const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized - Missing or invalid token' }, 401);
  }
  
  // You can add token validation here
  const token = authHeader.split(' ')[1];
  
  // Store user info in context for use in route handlers
  c.set('userId', token);
  
  await next();
};

// Logging middleware for specific routes
const requestLogger = async (c: any, next: any) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  console.log(`${c.req.method} ${c.req.url} - ${end - start}ms`);
};

// Rate limiting middleware (simple example)
const rateLimiter = async (c: any, next: any) => {
  const ip = c.req.header('x-forwarded-for') || 'unknown';
  const key = `ratelimit:${ip}`;
  
  const requests = await kv.get(key) || 0;
  
  if (requests > 100) {
    return c.json({ error: 'Too many requests' }, 429);
  }
  
  await kv.set(key, requests + 1);
  await next();
};

// Health check endpoint
app.get("/make-server-baa3db23/health", (c) => {
  return c.json({ status: "ok" });
});

// Example: Public route (no middleware)
app.get("/make-server-baa3db23/public/info", (c) => {
  return c.json({ message: "This is a public endpoint" });
});

// Public route to get all data from Supabase table "data"
app.get("/make-server-baa3db23/public/data", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase
      .from('data')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching data from Supabase table "data":', error);
      return c.json({ error: 'Failed to fetch data', details: error.message }, 500);
    }

    return c.json({ 
      success: true, 
      count: data?.length || 0,
      data: data || [] 
    });
  } catch (error) {
    console.error('Error in /public/data endpoint:', error);
    return c.json({ error: 'Internal server error', details: String(error) }, 500);
  }
});

// API route to get all cars data from Supabase table "data"
app.get("/make-server-baa3db23/api/cars", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: carsData, error } = await supabase
      .from('data')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cars from Supabase table "data":', error);
      return c.json({ 
        error: 'Failed to fetch cars data', 
        details: error.message 
      }, 500);
    }

    // Return pure JSON array format
    return c.json(carsData || []);
  } catch (error) {
    console.error('Error in /api/cars endpoint:', error);
    return c.json({ 
      error: 'Internal server error', 
      details: String(error) 
    }, 500);
  }
});

// API route to get all data from Supabase table "data"
app.get("/make-server-baa3db23/api/data", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: allData, error } = await supabase
      .from('data')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching data from Supabase table "data":', error);
      return c.json({ 
        error: 'Failed to fetch data', 
        details: error.message 
      }, 500);
    }

    // Return pure JSON array format
    return c.json(allData || []);
  } catch (error) {
    console.error('Error in /api/data endpoint:', error);
    return c.json({ 
      error: 'Internal server error', 
      details: String(error) 
    }, 500);
  }
});

// Example: Protected route with auth middleware
app.get("/make-server-baa3db23/protected/data", authMiddleware, async (c) => {
  const userId = c.get('userId');
  return c.json({ message: "Protected data", userId });
});

// Example: Route with multiple middleware
app.post("/make-server-baa3db23/api/action", requestLogger, authMiddleware, async (c) => {
  const body = await c.req.json();
  return c.json({ success: true, data: body });
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