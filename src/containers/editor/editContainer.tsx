'use client';
import React, { useEffect, useState } from 'react';
// import { InitialStage } from './InitialStage';
import { ActiveStage } from './ActiveStage';
// import { ClosedStage } from './ClosedStage';
import { RootInstance } from '@/services/root.service';
import {  getActiveStatusesByStageId, handleError } from '@/utils/helpers';
import { AxiosError } from 'axios';
import { IStage } from '@/interfaces/root.interface';

interface PipelineDisplayProps {
  className?: string;
}

const PipelineDisplay: React.FC<PipelineDisplayProps> = ({ className }) => {

  const [stages, setStages] = useState<IStage[]>([]);
  console.log("stages",stages);

  const fetchStages = async () => {
    try {
      const response = await RootInstance.getStages();
      setStages(response);
    } catch (error) {
      handleError(error as AxiosError,false);
    }
  }
  
  useEffect(()=>{
    fetchStages();
  },[]);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      hello
      {/* <InitialStage initial={getActiveStatusesByStageId(stages,'stage_fresh')} /> */}
      <ActiveStage fullObject={getActiveStatusesByStageId(stages,'stage_active')} />
      {/* <ClosedStage won={getActiveStatusesByStageId(stages,'stage_won')} lost={getActiveStatusesByStageId(stages,'stage_lost')} /> */}
    </div>
  );
};

export default PipelineDisplay;