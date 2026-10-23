'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { usePlan, Workout } from '@/context/PlanContext';

type SortOption = 'duration' | 'calories' | 'rating';

const MyPlanPage = () => {
  const { planList, savedList, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [sortBy, setSortBy] = useState<SortOption>('duration');

  const currentList = activeTab === 'plan' ? planList : savedList;

  const parseNum = (val: string | number | undefined): number => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const match = String(val).match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const totalExercises = currentList.length;
  const totalMinutes = useMemo(() => {
    return currentList.reduce((acc, item) => acc + parseNum(item.duration), 0);
  }, [currentList]);

  const totalCalories = useMemo(() => {
    return currentList.reduce((acc, item) => acc + parseNum(item.calories), 0);
  }, [currentList]);

  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === 'duration') {
        return parseNum(a.duration) - parseNum(b.duration);
      }
      if (sortBy === 'calories') {
        return parseNum(a.calories) - parseNum(b.calories);
      }
      if (sortBy === 'rating') {
        return parseNum(b.rating) - parseNum(a.rating);
      }
      return 0;
    });
  }, [currentList, sortBy]);

  const handleMarkAsDone = (workoutName: string) => {
    toast.success(`Completed "${workoutName}"! Great work!`);
  };

  return (
    <main className="min-h-screen bg-[#0C0D10] px-6 md:px-12 py-10">
      <div className="w-full space-y-8">

        <div>
          <h1 className="text-white text-3xl sm:text-4xl font-black uppercase tracking-tight">
            MY PLAN
          </h1>
          <p className="text-[#9CA3AF] text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="bg-[#15171D] border border-[#222630] rounded-2xl p-6 grid grid-cols-3 gap-4">
          <div>
            <p className="text-[#9CA3AF] text-xs font-medium uppercase">Exercises</p>
            <p className="text-[#CCFF00] text-3xl sm:text-4xl font-black mt-1">
              {totalExercises}
            </p>
          </div>
          <div>
            <p className="text-[#9CA3AF] text-xs font-medium uppercase">Minutes</p>
            <p className="text-white text-3xl sm:text-4xl font-black mt-1">
              {totalMinutes}
            </p>
          </div>
          <div>
            <p className="text-[#9CA3AF] text-xs font-medium uppercase">Calories</p>
            <p className="text-white text-3xl sm:text-4xl font-black mt-1">
              {totalCalories}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Tabs */}
          <div className="bg-[#000000] p-1 rounded-full border border-[#1C1F26] inline-flex gap-1">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                activeTab === 'plan'
                  ? 'bg-[#1A2312] text-[#CCFF00] border border-[#2D313B]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                activeTab === 'saved'
                  ? 'bg-[#1A2312] text-[#CCFF00] border border-[#2D313B]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#9CA3AF] text-xs font-semibold">Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#15171D] border border-[#222630] text-white text-xs font-medium px-4 py-2 pr-8 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#CCFF00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <svg
                className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {sortedList.length === 0 ? (
          <div className="bg-[#15171D] border border-[#222630] rounded-2xl p-12 text-center space-y-4">
            <h3 className="text-white text-xl font-black uppercase tracking-wider">
              NOTHING HERE YET
            </h3>
            <p className="text-[#9CA3AF] text-sm">
              Browse the library and add a lift to get today moving.
            </p>
            <div>
              <Link
                href="/"
                className="inline-block bg-[#CCFF00] text-black font-extrabold text-xs uppercase px-6 py-3 rounded-lg hover:bg-[#b0e200] transition-colors"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        ) : (
          
          <div className="space-y-4">
            {sortedList.map((item) => (
              <div
                key={item.id}
                className="bg-[#15171D] border border-[#222630] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-[#1C1F26] shrink-0">
                    <Image
                      src={item.image || '/assets/banner.png'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-sm sm:text-base tracking-wide">
                      {item.name}
                    </h4>
                    <p className="text-[#9CA3AF] text-xs mt-0.5">{item.equipment}</p>

                    <div className="flex items-center gap-4 text-xs text-[#9CA3AF] mt-2 font-medium">
                     
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {parseNum(item.duration)} min
                      </span>

                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.431.67-.654 1.484-.777 2.22-.096.575-.156 1.13-.198 1.57A6.996 6.996 0 005 13a7 7 0 0014 0c0-2.483-1.074-4.751-2.784-6.32a8.003 8.003 0 00-3.821-4.127zM11 13a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                        </svg>
                        {parseNum(item.calories)} kcal
                      </span>

                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>

   
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <Link
                    href={`/details/${item.id}`}
                    className="border border-gray-600 hover:border-white text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>

                  {activeTab === 'plan' && (
                    <button
                      onClick={() => handleMarkAsDone(item.name)}
                      className="bg-[#CCFF00] hover:bg-[#b0e200] text-black font-extrabold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 stroke-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Mark as Done</span>
                    </button>
                  )}

                  
                  <button
                    onClick={() =>
                      activeTab === 'plan'
                        ? removeFromPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    className="text-gray-400 hover:text-white font-bold text-sm px-2 py-1 transition-colors"
                    title="Remove workout"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyPlanPage;