'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export interface Workout {
  id: string | number;
  name: string;
  description?: string;
  category?: string[];
  equipment?: string;
  difficulty?: string;
  sets?: number;
  reps?: string;
  duration: number | string;
  calories?: number | string;
  caloriesBurned?: number | string;
  rating: number | string;
  image?: string;
  instructions?: string[];
}

interface PlanContextType {
  planList: Workout[];
  savedList: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: string | number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // 1. Load saved items from localStorage ONCE after mount
  useEffect(() => {
    try {
      const localPlan = localStorage.getItem('fitlog_plan');
      const localSaved = localStorage.getItem('fitlog_saved');
      if (localPlan) setPlanList(JSON.parse(localPlan));
      if (localSaved) setSavedList(JSON.parse(localSaved));
    } catch (e) {
      console.error('Error reading localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // 2. Only write to localStorage AFTER initial load completes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('fitlog_plan', JSON.stringify(planList));
    }
  }, [planList, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('fitlog_saved', JSON.stringify(savedList));
    }
  }, [savedList, isInitialized]);

  // Helper to normalize workout object calorie property
  const normalizeWorkout = (workout: Workout): Workout => ({
    ...workout,
    calories: workout.calories ?? workout.caloriesBurned ?? 0,
  });

  const addToPlan = (workout: Workout) => {
    const item = normalizeWorkout(workout);
    if (planList.find((p) => String(p.id) === String(item.id))) {
      toast.error(`${item.name} is already in today's plan!`);
      return;
    }
    if (planList.length >= 5) {
      toast.error("Cap reached! Maximum 5 workouts allowed for today.");
      return;
    }
    setPlanList((prev) => [...prev, item]);
    toast.success("Added to today's plan");
  };

  const removeFromPlan = (id: string | number) => {
    setPlanList((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.success("Removed from today's plan");
  };

  const addToSaved = (workout: Workout) => {
    const item = normalizeWorkout(workout);
    if (savedList.find((s) => String(s.id) === String(item.id))) {
      toast.error(`${item.name} is already saved!`);
      return;
    }
    setSavedList((prev) => [...prev, item]);
    toast.success("Saved for later");
  };

  const removeFromSaved = (id: string | number) => {
    setSavedList((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.success("Removed from saved list");
  };

  return (
    <PlanContext.Provider
      value={{
        planList,
        savedList,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used within a PlanProvider');
  return context;
};