import React, { useState } from 'react';
import { Star, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
  onEdit: (reviewId: string) => void;
  onDelete: (reviewId: string) => void;
}

export function ReviewList({ reviews, onEdit, onDelete }: ReviewListProps) {
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.rating - a.rating;
  });

  const toggleExpand = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <select
          className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'rating')}
        >
          <option value="date">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      {sortedReviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              <a href={`/activity/${review.activityId}`} className="text-blue-600 hover:underline">
                Activity Name
              </a>
              {' at '}
              <a href={`/club/${review.clubId}`} className="text-blue-600 hover:underline">
                Club Name
              </a>
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(review.id)}
                className="p-2 text-gray-600 hover:text-blue-600"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(review.id)}
                className="p-2 text-gray-600 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={20}
                className={index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
            <span className="ml-2 text-gray-600">
              {review.rating.toFixed(1)}/5
            </span>
          </div>

          <div className="text-gray-700">
            {expandedReviews.has(review.id) ? (
              <>
                <p>{review.comment}</p>
                <button
                  onClick={() => toggleExpand(review.id)}
                  className="text-blue-600 hover:text-blue-800 mt-2 flex items-center"
                >
                  Show less <ChevronUp size={16} className="ml-1" />
                </button>
              </>
            ) : (
              <>
                <p>{review.comment.slice(0, 150)}...</p>
                <button
                  onClick={() => toggleExpand(review.id)}
                  className="text-blue-600 hover:text-blue-800 mt-2 flex items-center"
                >
                  Show more <ChevronDown size={16} className="ml-1" />
                </button>
              </>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Published on {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}