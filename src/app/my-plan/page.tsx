'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';

const MyPlanPage = () => {
  const { planList, savedList, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');

  const activeList = activeTab === 'plan' ? planList : savedList;

  // Calculate live metric stats
  const totalExercises = activeList.length;
  const totalMinutes = activeList.reduce(
    (acc, curr) => acc + (Number(curr.duration) || 0),
    0
  );
  const totalCalories = activeList.reduce(
    (acc, curr) => acc + (Number(curr.calories) || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#0C0D10] px-6 md:px-12 py-10">
      <div className="w-full space-y-8">
        {/* Title */}
        <div>
          <h1 className="text-white text-3xl sm:text-4xl font-black uppercase tracking-tight">
            MY PLAN
          </h1>
          <p className="text-[#9CA3AF] text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Live Metrics Summary Row */}
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

        {/* Tab Selection */}
        <div className="flex justify-between items-center border-b border-[#222630] pb-4">
          <div className="bg-[#000000] p-1 rounded-full border border-[#1C1F26] inline-flex gap-1">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                activeTab === 'plan'
                  ? 'bg-[#1A2312] text-[#CCFF00] border border-[#2D313B]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Today's Plan
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
        </div>

        {/* Empty State */}
        {activeList.length === 0 ? (
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
          /* Workouts List */
          <div className="space-y-4">
            {activeList.map((item) => (
              <div
                key={item.id}
                className="bg-[#15171D] border border-[#222630] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-[#1C1F26] shrink-0">
                    <Image
                      src={item.image || '/assets/banner.png'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-extrabold uppercase text-sm sm:text-base">
                      {item.name}
                    </h4>
                    <p className="text-[#9CA3AF] text-xs mt-0.5">{item.equipment}</p>
                    <div className="flex items-center gap-3 text-xs text-[#9CA3AF] mt-2">
                      <span>⏱ {item.duration} min</span>
                      <span>🔥 {item.calories} kcal</span>
                      <span>⭐ {item.rating}</span>
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
                  <button
                    onClick={() =>
                      activeTab === 'plan'
                        ? removeFromPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    className="text-gray-400 hover:text-red-500 text-lg px-2"
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