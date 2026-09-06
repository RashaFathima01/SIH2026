export type DRStage = 0 | 1 | 2 | 3 | 4;

export interface LesionCallout {
  id: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  type: 'microaneurysm' | 'hemorrhage' | 'exudate' | 'cotton_wool' | 'neovascularization';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface PatientProfile {
  id: string;
  abhaId: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  village: string;
  phcName: string;
  district: string;
  diabetesDurationYears: number;
  lastHba1c: number;
  bloodPressure: string;
  drStage: DRStage;
  stageName: string;
  stageCode: string;
  confidence: number;
  riskCategory: 'Low' | 'Moderate' | 'High' | 'Emergency';
  triageColor: 'emerald' | 'amber' | 'orange' | 'rose';
  recommendation: string;
  actionProtocol: string;
  referralTimeline: string;
  referredFacility: string;
  qualityMetrics: {
    laplacianVariance: number;
    laplacianPassed: boolean;
    fovCoveragePct: number;
    fovPassed: boolean;
    specularGlarePct: number;
    glarePassed: boolean;
    meanIllumination: number;
  };
  lesions: LesionCallout[];
  voicePrompts: Record<string, string>;
}

export interface WorkflowStep {
  id: number;
  title: string;
  subtitle: string;
  tier: string;
  latencyBudget: string;
  payloadSize: string;
  hardwareTarget: string;
  description: string;
  codeSnippetKey: string;
  inputs: string;
  outputs: string;
  metrics: { label: string; value: string }[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  eventType: 'AUTH_LOGIN' | 'IMAGE_INGEST' | 'QUALITY_CHECK' | 'INFERENCE_RUN' | 'GRADCAM_GEN' | 'REPORT_PRINT' | 'DELTA_SYNC_PACKET' | 'SQLCIPHER_ROTATE';
  actor: string;
  role: string;
  patientAbhaHash: string;
  actionDetails: string;
  integrityHash: string;
  status: 'VERIFIED' | 'ENCRYPTED' | 'QUEUED' | 'SYNCED';
}
