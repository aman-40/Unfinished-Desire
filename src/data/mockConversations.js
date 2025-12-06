const mock = [
  {
    id: 'c1',
    name: 'Aetherion',
    avatar: '',
    online: true,
    unread: 2,
    about: 'Keeper of desires',
    messages: [
      { id: 1, fromMe: false, text: 'Welcome to your new chat!', time: new Date().toISOString() },
      { id: 2, fromMe: true, text: 'Hello — excited to try this out.', time: new Date().toISOString() }
    ]
  },
  {
    id: 'c2',
    name: 'Luna',
    avatar: '',
    online: false,
    unread: 0,
    messages: [
      { id: 3, fromMe: false, text: 'Are you joining the event?', time: new Date().toISOString() }
    ]
  }
];

export default mock;