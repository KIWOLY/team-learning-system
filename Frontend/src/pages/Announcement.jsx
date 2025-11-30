// Add this page so the "Read more →" links work
// src/pages/Announcements.jsx

import React, { useEffect, useState } from 'react';
import api from '../services/services';
import AnnouncementCard from '../components/AnnouncementCard';
import { Link } from 'react-router-dom';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    api.get('/api/announcements/').then(res => {
      const sorted = (res.data || []).sort((a, b) => new Date(b.date) - new Date(a.date));
      setAnnouncements(sorted);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/dashboard" className="text-indigo-600 hover:underline mb-6 inline-block">
        ← Back to Dashboard
      </Link>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">All Announcements</h1>

      {announcements.length === 0 ? (
        <p className="text-gray-500">No announcements yet</p>
      ) : (
        <div className="space-y-8">
          {announcements.map(ann => (
            <AnnouncementCard key={ann.id} ann={ann} />   // full content, no preview
          ))}
        </div>
      )}
    </div>
  );
}