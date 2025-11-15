import React from 'react';
import { useEffect, useState } from 'react';
import api from '../services/services';
import AnnouncementCard from '../pages/Announcement';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const [announcements, setAnnouncements] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [annRes, teamRes] = await Promise.all([
          api.get('/api/announcements/'),
          api.get('/api/v1/profiles/list/')
        ]);
        setAnnouncements(annRes.data || []);
        setTeam(teamRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setAnnouncements([]);
        setTeam([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, User!</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Announcements</h2>
          {announcements.length === 0 ? (
            <p className="text-gray-500 text-sm">No announcements yet</p>
          ) : (
            announcements.map(ann => (
              <AnnouncementCard key={ann.id} ann={ann} />
            ))
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          {team.length === 0 ? (
            <p className="text-gray-500 text-sm">No team members found</p>
          ) : (
            <ul className="space-y-3">
              {team.map(u => (
                <li key={u.id} className="flex justify-between">
                  <span>{u.full_name || `${u.first_name} ${u.last_name}`}</span>
                  <span className="text-sm text-gray-500">{u.email}</span>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/profile"
            className="mt-4 inline-block text-indigo-600 hover:underline"
          >
            → Edit My Profile
          </Link>
        </div>
      </div>
    </div>
  );
}