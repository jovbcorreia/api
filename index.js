const express = require('express');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ── In-memory store ───────────────────────────────────────────────────────────
let items  = [
  { id: 1, name: 'Item One', description: 'First sample item',  createdAt: new Date().toISOString() },
  { id: 2, name: 'Item Two', description: 'Second sample item', createdAt: new Date().toISOString() },
];
let nextId = 3;

// ── Helpers ───────────────────────────────────────────────────────────────────
const findItem  = (id) => items.find((i) => i.id === parseInt(id));
const findIndex = (id) => items.findIndex((i) => i.id === parseInt(id));

const notFound = (res) => res.status(404).json({ success: false, message: 'Item not found' });

// ── Routes ────────────────────────────────────────────────────────────────────

// Health check
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'API Sandbox is running',
    version: '1.1.0',
    endpoints: [
      'GET    /items',
      'GET    /items/:id',
      'POST   /items',
      'PUT    /items/:id',
      'PATCH  /items/:id',
      'DELETE /items/:id',
    ],
  });
});

// GET all — supports ?name= filter
app.get('/items', (req, res) => {
  const { name } = req.query;
  const result   = name
    ? items.filter((i) => i.name.toLowerCase().includes(name.toLowerCase()))
    : items;
  res.json({ success: true, count: result.length, data: result });
});

// GET single
app.get('/items/:id', (req, res) => {
  const item = findItem(req.params.id);
  if (!item) return notFound(res);
  res.json({ success: true, data: item });
});

// POST create
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, message: 'name is required and must be a non-empty string' });
  }
  const newItem = {
    id: nextId++,
    name: name.trim(),
    description: description?.trim() || '',
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  res.status(201).json({ success: true, data: newItem });
});

// PUT full update
app.put('/items/:id', (req, res) => {
  const idx = findIndex(req.params.id);
  if (idx === -1) return notFound(res);
  const { name, description } = req.body;
  items[idx] = {
    ...items[idx],
    name:        name        ?? items[idx].name,
    description: description ?? items[idx].description,
    updatedAt:   new Date().toISOString(),
  };
  res.json({ success: true, data: items[idx] });
});

// PATCH partial update
app.patch('/items/:id', (req, res) => {
  const idx = findIndex(req.params.id);
  if (idx === -1) return notFound(res);
  const allowed = ['name', 'description'];
  allowed.forEach((key) => {
    if (req.body[key] !== undefined) items[idx][key] = req.body[key];
  });
  items[idx].updatedAt = new Date().toISOString();
  res.json({ success: true, data: items[idx] });
});

// DELETE
app.delete('/items/:id', (req, res) => {
  const idx = findIndex(req.params.id);
  if (idx === -1) return notFound(res);
  const [deleted] = items.splice(idx, 1);
  res.json({ success: true, message: 'Item deleted', data: deleted });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
module.exports = app;
