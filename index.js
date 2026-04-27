const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: 'Item One', description: 'First sample item', createdAt: new Date().toISOString() },
    { id: 2, name: 'Item Two', description: 'Second sample item', createdAt: new Date().toISOString() },
    ];
    let nextId = 3;

    // GET all items
    app.get('/items', (req, res) => {
      res.json({ success: true, count: items.length, data: items });
      });

      // GET single item
      app.get('/items/:id', (req, res) => {
        const item = items.find(i => i.id === parseInt(req.params.id));
          if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
            res.json({ success: true, data: item });
            });

            // POST create item
            app.post('/items', (req, res) => {
              const { name, description } = req.body;
                if (!name) return res.status(400).json({ success: false, message: 'Name is required' });
                  const newItem = { id: nextId++, name, description: description || '', createdAt: new Date().toISOString() };
                    items.push(newItem);
                      res.status(201).json({ success: true, data: newItem });
                      });

                      // PUT update item
                      app.put('/items/:id', (req, res) => {
                        const index = items.findIndex(i => i.id === parseInt(req.params.id));
                          if (index === -1) return res.status(404).json({ success: false, message: 'Item not found' });
                            const { name, description } = req.body;
                              items[index] = { ...items[index], name: name || items[index].name, description: description ?? items[index].description, updatedAt: new Date().toISOString() };
                                res.json({ success: true, data: items[index] });
                                });

                                // DELETE item
                                app.delete('/items/:id', (req, res) => {
                                  const index = items.findIndex(i => i.id === parseInt(req.params.id));
                                    if (index === -1) return res.status(404).json({ success: false, message: 'Item not found' });
                                      const deleted = items.splice(index, 1)[0];
                                        res.json({ success: true, message: 'Item deleted', data: deleted });
                                        });

                                        // Health check
                                        app.get('/', (req, res) => {
                                          res.json({ success: true, message: 'API Sandbox is running', version: '1.0.0', endpoints: ['GET /items', 'GET /items/:id', 'POST /items', 'PUT /items/:id', 'DELETE /items/:id'] });
                                          });

                                          app.listen(PORT, () => console.log('API running on http://localhost:' + PORT));
                                          module.exports = app;
