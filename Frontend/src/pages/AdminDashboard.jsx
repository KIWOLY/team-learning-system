import React from 'react';
import { useState, useEffect } from 'react';
import api from '../services/services';
import AnnouncementCard from './Announcement';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [annForm, setAnnForm] = useState({ title: '', content: '' });
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, annRes] = await Promise.all([
          api.get('/api/v1/profiles/list/'),
          api.get('/api/announcements/')
        ]);
        setUsers(usersRes.data || []);
        setAnnouncements(annRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setUsers([]);
        setAnnouncements([]);
      }
    };
    fetchData();
  }, []);

  const postAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/announcements/create/', annForm);
      setAnnForm({ title: '', content: '' });
      // Refresh announcements list
      const annRes = await api.get('/api/announcements/');
      setAnnouncements(annRes.data || []);
      alert('Announcement posted successfully!');
    } catch (error) {
      alert('Failed to post announcement: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Admin Panel</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Post Announcement</h2>
          <form onSubmit={postAnnouncement} className="space-y-4">
            <input
              placeholder="Title"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={annForm.title}
              onChange={e => setAnnForm({ ...annForm, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Content"
              rows="3"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={annForm.content}
              onChange={e => setAnnForm({ ...annForm, content: e.target.value })}
              required
            />
            <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
              Post
            </button>
          </form>
          {announcements.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Recent Announcements</h3>
              <div className="space-y-2">
                {announcements.slice(0, 3).map(ann => (
                  <AnnouncementCard key={ann.id} ann={ann} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          {users.length === 0 ? (
            <p className="text-gray-500 text-sm">No users found</p>
          ) : (
            <ul className="space-y-2">
              {users.map(u => (
                <li key={u.id} className="flex justify-between text-sm">
                  <span>{u.full_name || `${u.first_name} ${u.last_name}`}</span>
                  <span className="text-gray-500">{u.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}