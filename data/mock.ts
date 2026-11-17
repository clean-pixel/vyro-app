export type Video = {
  id: string;
  title: string;
  description: string;
  creator: string;
  handle: string;
  avatar: string;
  thumbnail: string;
  sound: string;
  views: string;
  duration: string;
  likes: number;
  liked: boolean;
  hashtags: string[];
};

export const creators = [
  { id: 'ava', name: 'Ava Stone', handle: 'avastone', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
  { id: 'leo', name: 'Leo Park', handle: 'leopark', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { id: 'maya', name: 'Maya Chen', handle: 'mayachen', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { id: 'noah', name: 'Noah Reyes', handle: 'noahreyes', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
];

export const videos: Video[] = [
  {
    id: 'v1', title: 'Golden hour, ganz für mich', description: 'Ein kleiner Moment zwischen Stadt und Sonnenuntergang. 🌇', creator: creators[0].name, handle: creators[0].handle, avatar: creators[0].avatar,
    thumbnail: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85', sound: 'Original Sound · Ava Stone', views: '128.4K', duration: '0:18', likes: 18400, liked: false, hashtags: ['goldenhour', 'citymood', 'vyro'],
  },
  {
    id: 'v2', title: 'Eine Runde durch die Nacht', description: 'Neonlichter, leere Straßen und der Soundtrack für den Heimweg.', creator: creators[1].name, handle: creators[1].handle, avatar: creators[1].avatar,
    thumbnail: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85', sound: 'Midnight City · M83', views: '86.2K', duration: '0:24', likes: 9600, liked: true, hashtags: ['nightdrive', 'citylights', 'mood'],
  },
  {
    id: 'v3', title: 'Kleine Pause am Meer', description: 'Mehr davon, bitte. 🌊 Speichere dir diesen Ort für später.', creator: creators[2].name, handle: creators[2].handle, avatar: creators[2].avatar,
    thumbnail: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=85', sound: 'Ocean Air · Maya Chen', views: '54.7K', duration: '0:31', likes: 7100, liked: false, hashtags: ['ocean', 'slowdays', 'travel'],
  },
];

export const trendingTags = ['nightmood', 'creatorlife', 'streetstyle', 'travelgram', 'vyro'];

export const messages = [
  { id: 'm1', name: 'Ava Stone', avatar: creators[0].avatar, preview: 'Das Video ist richtig schön geworden!', time: '2 Min.' },
  { id: 'm2', name: 'Leo Park', avatar: creators[1].avatar, preview: 'Schick mir den Sound mal ✨', time: '1 Std.' },
  { id: 'm3', name: 'Maya Chen', avatar: creators[2].avatar, preview: 'Danke fürs Folgen!', time: 'Gestern' },
];

export const notifications = [
  { id: 'n1', icon: '♥', title: 'Neues Like', description: 'Ava Stone gefällt dein Video „Sunset Session“.', time: 'vor 3 Min.' },
  { id: 'n2', icon: '+', title: 'Neuer Follower', description: 'Leo Park folgt dir jetzt.', time: 'vor 18 Min.' },
  { id: 'n3', icon: '💬', title: 'Neuer Kommentar', description: 'Maya Chen: „Dieser Vibe! ✨“', time: 'vor 1 Std.' },
];

export const adminStats = [
  { label: 'Nutzer gesamt', value: '24.8K', delta: '+12.4%' },
  { label: 'Videos', value: '8,420', delta: '+8.2%' },
  { label: 'Likes', value: '1.2M', delta: '+16.8%' },
  { label: 'Meldungen offen', value: '18', delta: 'Prüfung nötig' },
];

export const recentActivity = [
  { id: 'a1', title: 'Video gemeldet', meta: 'Nutzer @sample · vor 8 Min.', status: 'Offen' },
  { id: 'a2', title: 'Kommentar geprüft', meta: 'Moderation · vor 21 Min.', status: 'Erledigt' },
  { id: 'a3', title: 'Neuer Creator', meta: '@newcreator · vor 46 Min.', status: 'Info' },
];
