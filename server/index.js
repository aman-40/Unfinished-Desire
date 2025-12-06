import express from 'express';
import cors from 'cors';
import { conversations } from '../src/data/mockConversations.js';

const app = express();
app.use(cors());
app.use(express.json());

let convs = conversations;

app.get('/api/conversations', (req, res) => {
  res.json(convs);
});

app.get('/api/conversations/:id', (req, res) => {
  const c = convs.find(x => x.id === req.params.id);
  if(!c) return res.status(404).json({error:'not found'});
  res.json(c);
});

app.post('/api/conversations/:id/messages', (req, res) => {
  const c = convs.find(x => x.id === req.params.id);
  if(!c) return res.status(404).json({error:'not found'});
  const msg = { id: Date.now().toString(), from: 'me', text: req.body.text, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) };
  c.messages.push(msg);
  res.json(msg);
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('Server running on', port));
