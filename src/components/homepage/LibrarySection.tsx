'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Workout } from '@/context/PlanContext';

const LibrarySection = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://api.api-store.workers.dev/api/fitlog')
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.workouts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="library" className="bg-[#0C0D10] px-6 md:px-12 py-10">
      <div className="w-full">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">
            THE LIBRARY
          </h2>
          <p className="text-[#9CA3AF] text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#9CA3AF]">
            Loading workouts…
          </div>
        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/details/${workout.id}`}
                className="bg-[#15171D] border border-[#222630] rounded-2xl p-4 flex flex-col justify-between hover:border-[#CCFF00] transition-colors group cursor-pointer"
              >
                <div>
                 
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-[#1C1F26]">
                    <Image
                      src={workout.image || '/assets/banner.png'}
                      alt={workout.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                 
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {workout.category?.map((cat, idx) => (
                      <span
                        key={idx}
                        className="bg-[#C2F800] text-black font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Workout Name & Equipment */}
                  <h3 className="text-white font-extrabold text-lg uppercase tracking-wide leading-tight">
                    {workout.name}
                  </h3>
                  <p className="text-[#9CA3AF] text-xs mt-1 mb-4">
                    {workout.equipment}
                  </p>
                </div>

               
                <div className="flex items-center gap-4 text-xs text-[#9CA3AF] pt-3 border-t border-[#222630]/60">
                  <span className="flex items-center gap-1">
                    ⏱ {workout.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    🔥 {workout.calories} kcal
                  </span>
                  <span className="flex items-center gap-1">
                    ⭐ {workout.rating}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LibrarySection;