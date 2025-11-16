
import React from 'react';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-zinc-800 p-8 border-2 border-neutral-100 shadow-neo-brutal shadow-emerald-400 hover:shadow-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:-translate-x-2">
      <div className="w-12 h-12 text-emerald-400 mb-4">{icon}</div>
      <h3 className="text-2xl font-bold font-mono text-neutral-50">{title}</h3>
      <p className="mt-2 text-neutral-300">{description}</p>
    </div>
  );
};
