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
  calories: number | string;
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

  // Load from LocalStorage
  useEffect(() => {
    const localPlan = localStorage.getItem('fitlog_plan');
    const localSaved = localStorage.getItem('fitlog_saved');
    if (localPlan) setPlanList(JSON.parse(localPlan));
    if (localSaved) setSavedList(JSON.parse(localSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fitlog_plan', JSON.stringify(planList));
  }, [planList]);

  useEffect(() => {
    localStorage.setItem('fitlog_saved', JSON.stringify(savedList));
  }, [savedList]);

  const addToPlan = (workout: Workout) => {
    if (planList.find((item) => item.id === workout.id)) {
      toast.error(`${workout.name} is already in your plan!`);
      return;
    }
    if (planList.length >= 5) {
      toast.error("You've reached the 5-workout cap for today!");
      return;
    }
    setPlanList((prev) => [...prev, workout]);
    toast.success("Added to today's plan");
  };

  const removeFromPlan = (id: string | number) => {
    setPlanList((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  };

  const addToSaved = (workout: Workout) => {
    if (savedList.find((item) => item.id === workout.id)) {
      toast.error(`${workout.name} is already saved!`);
      return;
    }
    setSavedList((prev) => [...prev, workout]);
    toast.success("Added to saved workouts");
  };

  const removeFromSaved = (id: string | number) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from saved workouts");
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