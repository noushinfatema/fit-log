'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { usePlan, Workout } from '@/context/PlanContext';

function DetailsContent() {
  const { id } = useParams();
  const { addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://api.api-store.workers.dev/api/fitlog')
      .then((res) => res.json())
      .then((data) => {
        const list: Workout[] = Array.isArray(data) ? data : data.workouts || [];
        const found = list.find((item) => String(item.id) === String(id));
        if (found) {
          setWorkout({
            ...found,
            calories: found.calories ?? found.caloriesBurned ?? 0,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] text-[#9CA3AF] flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (!workout) return null;

  const calValue = workout.calories ?? workout.caloriesBurned ?? 0;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left Side: Illustration */}
      <div className="lg:col-span-6 relative w-full h-[380px] sm:h-[480px] lg:h-[560px] rounded-2xl overflow-hidden bg-[#15171D] border border-[#222630]">
        <Image
          src={workout.image || '/assets/banner.png'}
          alt={workout.name}
          fill
          className="object-cover"
          priority
        />
      </div>

    
      <div className="lg:col-span-6 space-y-6">
        <div>
          <h1 className="text-white text-3xl sm:text-4xl font-black uppercase tracking-tight">
            {workout.name}
          </h1>
          <p className="text-[#9CA3AF] text-sm mt-2 leading-relaxed">
            {workout.description ||
              'A compound press that builds chest thickness, triceps, and pressing power from a stable bench.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {workout.category?.map((cat, idx) => (
            <span
              key={idx}
              className="bg-[#C2F800] text-black font-extrabold text-xs tracking-wider uppercase px-3 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

       
        <div className="bg-[#15171D] border border-[#222630] rounded-xl p-4 sm:p-5 space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between border-b border-[#222630] pb-2 text-[#9CA3AF]">
            <span>EQUIPMENT</span>
            <span className="text-white font-medium">{workout.equipment || 'Barbell, Bench'}</span>
          </div>
          <div className="flex justify-between border-b border-[#222630] pb-2 text-[#9CA3AF]">
            <span>DIFFICULTY</span>
            <span className="text-white font-medium">{workout.difficulty || 'Intermediate'}</span>
          </div>
          <div className="flex justify-between border-b border-[#222630] pb-2 text-[#9CA3AF]">
            <span>SETS</span>
            <span className="text-white font-medium">{workout.sets || 4}</span>
          </div>
          <div className="flex justify-between border-b border-[#222630] pb-2 text-[#9CA3AF]">
            <span>REPS</span>
            <span className="text-white font-medium">{workout.reps || '6-8'}</span>
          </div>
          <div className="flex justify-between border-b border-[#222630] pb-2 text-[#9CA3AF]">
            <span>DURATION</span>
            <span className="text-white font-medium">{workout.duration} min</span>
          </div>
          <div className="flex justify-between border-b border-[#222630] pb-2 text-[#9CA3AF]">
            <span>CALORIES</span>
            <span className="text-white font-medium">{calValue} kcal</span>
          </div>
          <div className="flex justify-between text-[#9CA3AF]">
            <span>RATING</span>
            <span className="text-white font-medium">{workout.rating}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm tracking-wider uppercase">
            INSTRUCTIONS
          </h3>
          <ol className="list-decimal list-inside text-[#9CA3AF] text-sm space-y-2 leading-relaxed">
            {workout.instructions?.map((step, index) => (
              <li key={index}>{step}</li>
            )) || (
              <>
                <li>Lie on the bench with eyes under the bar and feet planted.</li>
                <li>Unrack with locked elbows and lower the bar to mid-chest.</li>
                <li>Press up in a slight arc until elbows lock without bouncing.</li>
                <li>Keep shoulder blades pinched and a natural arch in the back.</li>
              </>
            )}
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => addToPlan(workout)}
            className="flex-1 bg-[#C2F800] hover:bg-[#b0e200] text-black font-extrabold text-sm uppercase px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
             <span>Add to today's plan</span>
          </button>
          <button
            onClick={() => addToSaved(workout)}
            className="flex-1 border border-gray-600 hover:border-white text-white font-bold text-sm uppercase px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 bg-transparent"
          >
             <span>Save for later</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DetailsPage() {
  return (
    <main className="min-h-screen bg-[#0C0D10] px-6 md:px-12 py-10">
      <Suspense fallback={<div className="text-center py-20 text-[#9CA3AF]">Loading…</div>}>
        <DetailsContent />
      </Suspense>
    </main>
  );
}