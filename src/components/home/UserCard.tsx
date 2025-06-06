
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { User } from '@supabase/supabase-js';
import DailyCheckIn from './DailyCheckIn';
import WeeklyProgressChart from './WeeklyProgressChart';
import FadeIn from '@/components/ui/FadeIn';

interface UserCardProps {
  user: User | null;
  latestAssessment: any;
  weeklyData: any[];
  isAssessmentLoading: boolean;
}

const UserCard = ({ 
  user, 
  latestAssessment, 
  weeklyData, 
  isAssessmentLoading 
}: UserCardProps) => {
  console.log('UserCard received latestAssessment:', JSON.stringify(latestAssessment, null, 2));

  // Calculate metrics based on the latest assessment
  const focusLevel = latestAssessment?.focus_level || 0;
  const energyLevel = latestAssessment?.energy_level || 0;
  const emotionalState = latestAssessment?.emotional_state || 0;
  const stressLevel = latestAssessment?.stress_level || 0;
  const creativityScore = latestAssessment?.creativity_score || 0;
  
  const lastAssessmentDate = latestAssessment ? 
    format(new Date(latestAssessment.completed_at), 'dd/MM/yyyy') : 
    'Not available';

  console.log('Calculated metrics:', {
    focusLevel,
    energyLevel,
    emotionalState,
    stressLevel,
    creativityScore,
    lastAssessmentDate
  });

  if (!user) {
    return (
      <FadeIn delay={0.3} direction="left">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full"></div>
          <div className="relative glass-card rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Start Your Journey</h3>
            <p className="text-muted-foreground mb-6">
              Sign in to access personalized assessments, track your progress, and discover strategies tailored to your neurodivergent mind.
            </p>
            <Link to="/auth" className="btn-primary w-full text-center block">
              Sign In or Register
            </Link>
          </div>
        </div>
      </FadeIn>
    );
  }
  
  return (
    <FadeIn delay={0.3} direction="left">
      <div className="relative">
        <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full"></div>
        <div className="relative glass-card rounded-3xl p-8 shadow-2xl">
          <DailyCheckIn 
            focusLevel={focusLevel}
            energyLevel={energyLevel}
            emotionalState={emotionalState}
            stressLevel={stressLevel}
            creativityScore={creativityScore}
            lastAssessmentDate={lastAssessmentDate}
            hasAssessment={!!latestAssessment}
          />
          <WeeklyProgressChart data={weeklyData} />
        </div>
      </div>
    </FadeIn>
  );
};

export default UserCard;
