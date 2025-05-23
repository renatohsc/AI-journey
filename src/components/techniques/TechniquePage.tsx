import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/ui/FadeIn";
import { Loader2, SparklesIcon } from "lucide-react";
import TechniqueHeader from './TechniqueHeader';
import TechniqueFilters from './TechniqueFilters';
import TechniqueList from './TechniqueList';
import AIRecommendationCard from './AIRecommendationCard';
import ResearchProcess from './ResearchProcess';
import { useTechniques } from './useTechniques';
import { useToast } from '@/hooks/use-toast';

const TechniquePage: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { 
    techniques, 
    isLoading, 
    isError, 
    refetch, 
    triggerResearchUpdate,
    aiRecommendations 
  } = useTechniques();
  const { toast } = useToast();

  useEffect(() => {
    if (techniques && techniques.length === 0 && !isLoading) {
      handleUpdateResearch();
    }
  }, [techniques, isLoading]);

  const handleUpdateResearch = async () => {
    try {
      setIsUpdating(true);
      const result = await triggerResearchUpdate();
      
      if (result?.count) {
        toast({
          title: "Research Updated",
          description: `Now showing ${result.count} neurodiversity techniques from our research database with validated URLs and sources.`,
        });
      }
    } catch (error) {
      console.error("Error updating research:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update research data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <TechniqueHeader />
      
      {/* AI Recommendation Section */}
      {aiRecommendations && (
        <FadeIn delay={0.2}>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <SparklesIcon className="mr-2 text-accent" />
              <h2 className="text-xl font-bold">AI-Powered Recommendation</h2>
            </div>
            <AIRecommendationCard recommendation={aiRecommendations} />
          </div>
        </FadeIn>
      )}

      <TechniqueFilters 
        filter={filter} 
        setFilter={setFilter} 
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
      />
      <TechniqueList 
        techniques={techniques} 
        isLoading={isLoading} 
        isError={isError} 
        filter={filter}
        difficultyFilter={difficultyFilter}
        refetch={refetch}
        triggerResearchUpdate={handleUpdateResearch}
      />
      
      <FadeIn delay={0.4}>
        <div className="text-center">
          <Button 
            className="mx-auto w-full sm:w-auto"
            onClick={handleUpdateResearch}
            disabled={isLoading || isUpdating}
          >
            {(isLoading || isUpdating) ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Research Data"
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Our research database now includes verified paper URLs and DOIs from reputable sources.
            <span className="hidden sm:inline ml-1 text-accent font-medium">🔎 Click "Update Research Data" to refresh with latest validated sources.</span>
            <span className="block sm:hidden mt-2 text-accent font-medium">🔎 Click to refresh with latest validated sources.</span>
          </p>
        </div>
      </FadeIn>

      <ResearchProcess />
    </div>
  );
};

export default TechniquePage;