"use client";

import { useState } from "react";
import { RoutineDay } from "../types/how-it-works.types";

export function useCapsuleRoutine() {
  const [activeDayId, setActiveDayId] = useState("mon");

  const routineDays: RoutineDay[] = [
    {
      id: "mon",
      day: "Mon",
      fullDay: "Monday",
      occasion: "Strategic Planning & Standups",
      vibe: "Structured & Polished",
      items: [
        {
          id: "item-1",
          category: "Layer",
          name: "Tailored Linen Blazer",
          color: "Forest Green",
        },
        {
          id: "item-2",
          category: "Top",
          name: "Organic Cotton Poplin Shirt",
          color: "Crisp White",
        },
        {
          id: "item-3",
          category: "Bottom",
          name: "Pleated Wide Trousers",
          color: "Charcoal Slate",
        },
      ],
    },
    {
      id: "tue",
      day: "Tue",
      fullDay: "Tuesday",
      occasion: "Design Reviews & Focus Work",
      vibe: "Relaxed Minimalist",
      items: [
        {
          id: "item-4",
          category: "Top",
          name: "Merino Wool Knit",
          color: "Oatmeal Cream",
        },
        {
          id: "item-5",
          category: "Bottom",
          name: "Tapered Cotton Chinos",
          color: "Warm Sand",
        },
        {
          id: "item-6",
          category: "Footwear",
          name: "Minimalist Leather Derby",
          color: "Espresso",
        },
      ],
    },
    {
      id: "wed",
      day: "Wed",
      fullDay: "Wednesday",
      occasion: "Client Lunch & Presentations",
      vibe: "Elevated Tailoring",
      items: [
        {
          id: "item-1",
          category: "Layer",
          name: "Tailored Linen Blazer",
          color: "Forest Green",
        },
        {
          id: "item-4",
          category: "Top",
          name: "Merino Wool Knit",
          color: "Oatmeal Cream",
        },
        {
          id: "item-3",
          category: "Bottom",
          name: "Pleated Wide Trousers",
          color: "Charcoal Slate",
        },
      ],
    },
    {
      id: "thu",
      day: "Thu",
      fullDay: "Thursday",
      occasion: "Team Brainstorming & Errand Runs",
      vibe: "Contemporary Casual",
      items: [
        {
          id: "item-2",
          category: "Top",
          name: "Organic Cotton Poplin Shirt",
          color: "Crisp White",
        },
        {
          id: "item-7",
          category: "Bottom",
          name: "Straight Raw Denim",
          color: "Deep Indigo",
        },
        {
          id: "item-8",
          category: "Layer",
          name: "Lightweight Trench",
          color: "Pale Stone",
        },
      ],
    },
    {
      id: "fri",
      day: "Fri",
      fullDay: "Friday",
      occasion: "Closing Sprints & Casual Drinks",
      vibe: "Smart Casual Transition",
      items: [
        {
          id: "item-1",
          category: "Layer",
          name: "Tailored Linen Blazer",
          color: "Forest Green",
        },
        {
          id: "item-9",
          category: "Top",
          name: "Pima Cotton T-Shirt",
          color: "Muted Chalk",
        },
        {
          id: "item-7",
          category: "Bottom",
          name: "Straight Raw Denim",
          color: "Deep Indigo",
        },
      ],
    },
    {
      id: "sat",
      day: "Sat",
      fullDay: "Saturday",
      occasion: "Farmers Market & Art Walk",
      vibe: "Effortless Weekend",
      items: [
        {
          id: "item-4",
          category: "Top",
          name: "Merino Wool Knit",
          color: "Oatmeal Cream",
        },
        {
          id: "item-7",
          category: "Bottom",
          name: "Straight Raw Denim",
          color: "Deep Indigo",
        },
        {
          id: "item-6",
          category: "Footwear",
          name: "Minimalist Leather Derby",
          color: "Espresso",
        },
      ],
    },
    {
      id: "sun",
      day: "Sun",
      fullDay: "Sunday",
      occasion: "Dinner with Friends & Relaxation",
      vibe: "Understated Elegance",
      items: [
        {
          id: "item-8",
          category: "Layer",
          name: "Lightweight Trench",
          color: "Pale Stone",
        },
        {
          id: "item-2",
          category: "Top",
          name: "Organic Cotton Poplin Shirt",
          color: "Crisp White",
        },
        {
          id: "item-5",
          category: "Bottom",
          name: "Tapered Cotton Chinos",
          color: "Warm Sand",
        },
      ],
    },
  ];

  const currentRoutine =
    routineDays.find((d) => d.id === activeDayId) || routineDays[0];

  return {
    routineDays,
    activeDayId,
    setActiveDayId,
    currentRoutine,
  };
}