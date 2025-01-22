import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function PopularContent() {
  const [content] = useState([
    {
      id: 1,
      type: 'activity',
      title: 'Cours de Yoga',
      club: 'Zen Studio',
      image: '/images/yoga.jpg',
      price: '15€',
      rating: 4.8,
      location: 'Marseille 6ème'
    },
    {
      id: 2,
      type: 'club',
      title: 'Zen Studio',
      image: '/images/zen-studio.jpg',
      rating: 4.9,
      location: 'Marseille 6ème',
      activities: 12
    },
    {
      id: 3,
      type: 'activity',
      title: 'CrossFit',
      club: 'Power Gym',
      image: '/images/crossfit.jpg',
      price: '20€',
      rating: 4.7,
      location: 'Marseille 8ème'
    },
    {
      id: 4,
      type: 'club',
      title: 'Power Gym',
      image: '/images/power-gym.jpg',
      rating: 4.6,
      location: 'Marseille 8ème',
      activities: 8
    }
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {content.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <Link to={item.type === 'activity' ? `/activity/${item.id}` : `/club/${item.id}`}>
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
                ⭐️ {item.rating}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.location}</p>
              {item.type === 'activity' ? (
                <>
                  <p className="text-gray-600 text-sm mb-2">Par {item.club}</p>
                  <p className="font-medium text-blue-600">{item.price}/séance</p>
                </>
              ) : (
                <p className="text-gray-600 text-sm">{item.activities} activités</p>
              )}
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
} 