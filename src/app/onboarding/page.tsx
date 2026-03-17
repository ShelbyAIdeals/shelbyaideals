'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { upsertUserPreferences, upsertProfile } from '@/lib/supabase';
import { ONBOARDING_QUESTIONS } from '@/lib/onboarding-data';
import OnboardingCard from '@/components/OnboardingCard';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [saving, setSaving] = useState(false);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) router.push('/');
    if (!authLoading && profile?.onboarding_completed) router.push('/');
  }, [authLoading, user, profile, router]);

  const question = ONBOARDING_QUESTIONS[step];
  const totalSteps = ONBOARDING_QUESTIONS.length;
  const currentAnswer = answers[question.id];
  const hasSelection = question.multiSelect
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : !!currentAnswer;

  const handleSelect = (value: string) => {
    if (question.multiSelect) {
      const current = (answers[question.id] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [question.id]: updated });
    } else {
      setAnswers({ ...answers, [question.id]: value });
    }
  };

  const isSelected = (value: string) => {
    if (question.multiSelect) {
      return ((answers[question.id] as string[]) || []).includes(value);
    }
    return answers[question.id] === value;
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await upsertUserPreferences({
        user_id: user.id,
        business_type: answers.business_type as string,
        role: answers.role as string,
        industry: answers.industry as string,
        interests: (answers.interests as string[]) || [],
        goals: (answers.goals as string[]) || [],
      });
      await upsertProfile({ id: user.id, onboarding_completed: true });
      await refreshProfile();
      router.push('/');
    } catch {
      // Allow retry
    }
    setSaving(false);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-void-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-12">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i <= step ? 'bg-signal-400 scale-110' : 'bg-void-700'
            }`}
          />
        ))}
      </div>

      {/* Step counter */}
      <p className="text-xs text-void-500 mb-6">
        Step {step + 1} of {totalSteps}
      </p>

      {/* Question */}
      <div className="max-w-2xl w-full text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-void-50 mb-3">
          {question.title}
        </h1>
        <p className="text-sm sm:text-base text-void-400 leading-relaxed">
          {question.subtitle}
        </p>
      </div>

      {/* Option cards grid */}
      <div className="max-w-2xl w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
        {question.options.map((opt) => (
          <OnboardingCard
            key={opt.value}
            label={opt.label}
            selected={isSelected(opt.value)}
            onToggle={() => handleSelect(opt.value)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-void-400 hover:text-void-200 border border-void-700/40 hover:border-void-600/50 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!hasSelection || saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-signal-500 text-void-950 hover:bg-signal-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Saving...
            </>
          ) : step < totalSteps - 1 ? (
            <>
              Next
              <ArrowRight size={14} />
            </>
          ) : (
            'Finish'
          )}
        </button>
      </div>
    </div>
  );
}
