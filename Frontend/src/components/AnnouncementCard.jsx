
import React from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementCard({ ann, preview = false }) {
  const displayedContent = preview && ann.content.length > 150 
    ? ann.content.substring(0, 150) + '...' 
    : ann.content;

  return (
    <div className="border-l-4 border-indigo-500 pl-4 py-3 mb-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
      <h3 className="font-semibold text-lg">{ann.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{displayedContent}</p>
      
      {preview && (
        <Link 
          to="/announcements" 
          className="inline-block mt-3 text-indigo-600 font-medium text-sm hover:underline"
        >
          Read more →
        </Link>
      )}

      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <p>
          {ann.author_name ? `By ${ann.author_name}` : 'By Admin'}
          {ann.date && ' • '}
          {ann.date && new Date(ann.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        {!preview && ann.date && (
          <p>{new Date(ann.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        )}
      </div>
    </div>
  );
}