
import React, { useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';
import AssessmentDetail from './AssessmentDetail';

interface Assessment {
  id: string;
  completed_at: string;
  focus_level: number;
  energy_level: number;
  creativity_score: number;
  stress_level: number;
  description?: string | null;
  questions_asked?: any[];
  responses_given?: Record<string, any>;
  scoring_rationale?: string;
}

interface AssessmentTableProps {
  assessments: Assessment[];
}

const AssessmentTable = ({ assessments }: AssessmentTableProps) => {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  
  // Create a Map to deduplicate assessments by ID if needed
  const uniqueAssessments = Array.from(
    new Map(assessments.map(assessment => [assessment.id, assessment])).values()
  );

  const handleViewDetails = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setDetailOpen(true);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Focus</TableHead>
              <TableHead>Energy</TableHead>
              <TableHead>Creativity</TableHead>
              <TableHead>Stress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uniqueAssessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>
                  {formatDistanceToNow(new Date(assessment.completed_at), { addSuffix: true })}
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(assessment.completed_at), 'dd/MM/yyyy')}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate" title={assessment.description || undefined}>
                  {assessment.description 
                    ? assessment.description.substring(0, 40) + (assessment.description.length > 40 ? '...' : '') 
                    : 'No description'}
                </TableCell>
                <TableCell>{assessment.focus_level}/100</TableCell>
                <TableCell>{assessment.energy_level}/100</TableCell>
                <TableCell>{assessment.creativity_score}/100</TableCell>
                <TableCell>{assessment.stress_level}/100</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleViewDetails(assessment)}
                    title="View details"
                  >
                    <Eye size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <AssessmentDetail 
        assessment={selectedAssessment}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
};

export default AssessmentTable;
