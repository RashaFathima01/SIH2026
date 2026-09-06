import { WorkflowStep, AuditLogEntry } from '../types';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: 'Optical Ingestion',
    subtitle: 'Smartphone 20D Adapter',
    tier: 'Hardware & Condensing Optics',
    latencyBudget: 'Real-time (30 FPS Stream)',
    payloadSize: '2.4 MB RAW JPEG',
    hardwareTarget: 'Sub-₹10,000 Smartphone (Redmi 9 / Galaxy M04)',
    description: 'Frontline ASHA health worker aligns the 3D-printed clip-on indirect ophthalmoscopy adapter (20D condensing lens) over the patient dilated/non-dilated pupil using the guided LED flashlight.',
    codeSnippetKey: 'opencv_quality_gate',
    inputs: 'Uncompressed RGB video stream (1080x1080 crop)',
    outputs: 'Best-focus retinal candidate frame',
    metrics: [
      { label: 'Condensing Optics', value: '20D Volk-Style Glass' },
      { label: 'Working Distance', value: '45–50 mm' },
      { label: 'Retinal FOV', value: '45°–50° Field' },
      { label: 'Illumination', value: 'PWM-regulated 4500K LED' }
    ]
  },
  {
    id: 2,
    title: 'OpenCV Quality Gate',
    subtitle: 'Pre-Inference Triage',
    tier: 'Computer Vision Filter (OpenCV 4.10)',
    latencyBudget: '42 ms on CPU',
    payloadSize: '512x512 Resized BGR',
    hardwareTarget: '4x ARM Cortex-A53 cores',
    description: 'Eliminates unreadable fundus captures before neural execution: evaluates Laplacian variance sharpness, Circular Hough transform field-of-view centering, and specular cornea glare masking.',
    codeSnippetKey: 'opencv_quality_gate',
    inputs: 'Candidate BGR frame',
    outputs: 'Binary pass/fail flag + Telemetry dictionary',
    metrics: [
      { label: 'Min Laplacian Var', value: '> 120.0 (Sharp)' },
      { label: 'FOV Centering', value: '> 85% Area' },
      { label: 'Max Specular Glare', value: '< 2.5% Pixels' },
      { label: 'Artifact Rejection', value: '99.1% Sub-diagnostic' }
    ]
  },
  {
    id: 3,
    title: 'Quantized MobileNetV3',
    subtitle: 'INT8 Multi-Task A-FPN',
    tier: 'Deep Learning Inference (ONNX Runtime Mobile)',
    latencyBudget: '380 ms (INT8 Edge)',
    payloadSize: '14.8 MB Model Binary',
    hardwareTarget: 'Edge CPU / NPU (ARM NEON accelerated)',
    description: 'Multi-task architecture fuses early capillary cues (microaneurysms) with global retinal context through an Asymmetric Feature Pyramid Network, evaluated via Ordinal Cross-Entropy.',
    codeSnippetKey: 'pytorch_afpn_model',
    inputs: '512x512 Normalized Tensor',
    outputs: '5-Stage Ordinal Probabilities + 384-dim Latent Vector',
    metrics: [
      { label: 'Model Footprint', value: '14.8 MB (INT8)' },
      { label: 'Inference Time', value: '380 ms on Cortex-A53' },
      { label: 'AUC-ROC Score', value: '0.968' },
      { label: 'Referable Sensitivity', value: '98.2%' }
    ]
  },
  {
    id: 4,
    title: 'Grad-CAM Attention',
    subtitle: 'Explainable AI Lesion Map',
    tier: 'Interpretability Engine',
    latencyBudget: '68 ms',
    payloadSize: '128x128 Activation Matrix',
    hardwareTarget: 'On-device CPU',
    description: 'Backpropagates target diagnostic severity gradients to Stage5 convolutional layers, generating high-resolution heatmaps showing microaneurysms, hemorrhages, and exudates for clinician verification.',
    codeSnippetKey: 'gradcam_engine',
    inputs: 'Stage5 feature activations & target class index',
    outputs: 'Jet-colormap 2D heatmap overlay',
    metrics: [
      { label: 'Resolution', value: '512x512 Smooth Map' },
      { label: 'Target Layer', value: 'A-FPN Fused Stage5' },
      { label: 'Lesion Localization', value: 'IoU 0.74 against Ophthalmologists' },
      { label: 'Explainability Mode', value: 'Zero Black-Box' }
    ]
  },
  {
    id: 5,
    title: 'Bilingual Slip & Delta Sync',
    subtitle: 'ABDM FHIR R4 & SQLCipher',
    tier: 'Zero-Trust Storage & Delta Gateway',
    latencyBudget: '< 15 ms local write',
    payloadSize: '< 120 KB Delta JSON',
    hardwareTarget: 'Local SQLCipher AES-256 / 2G Cellular',
    description: 'Generates instant printable bilingual referral slip with ABDM-M2 compliant ABHA QR code. Bundles encrypted diagnostic embeddings for automated background delta-sync via FastAPI when network arrives.',
    codeSnippetKey: 'fastapi_sync',
    inputs: 'Diagnostic diagnosis & patient demographic schema',
    outputs: 'Printable Slip + Encrypted Sync Packet',
    metrics: [
      { label: 'Encryption Standard', value: 'AES-256-GCM' },
      { label: 'Sync Payload Size', value: '< 120 KB (Brotli)' },
      { label: 'ABDM Standard', value: 'FHIR R4 DiagnosticReport' },
      { label: 'Bandwidth Saved', value: '99.2% vs Raw Images' }
    ]
  }
];

export const QUANTIZATION_BENCHMARKS = [
  {
    framework: 'PyTorch 2.3 (FP32)',
    modelSizeMb: 68.4,
    ramPeakMb: 245.0,
    latencyMs: 1420,
    aucRoc: 0.971,
    sensitivityPct: 98.4,
    targetEnv: 'Cloud GPU (NVIDIA T4 / A10G)'
  },
  {
    framework: 'PyTorch Mobile (FP16)',
    modelSizeMb: 34.2,
    ramPeakMb: 142.0,
    latencyMs: 780,
    aucRoc: 0.970,
    sensitivityPct: 98.3,
    targetEnv: 'High-end Smartphones (Snapdragon 8 Gen)'
  },
  {
    framework: 'TensorFlow Lite (INT8)',
    modelSizeMb: 17.1,
    ramPeakMb: 88.0,
    latencyMs: 440,
    aucRoc: 0.965,
    sensitivityPct: 97.8,
    targetEnv: 'Mid-range Android Devices'
  },
  {
    framework: 'SightSeer ONNX Mobile (INT8)',
    modelSizeMb: 14.8,
    ramPeakMb: 62.0,
    latencyMs: 380,
    aucRoc: 0.968,
    sensitivityPct: 98.2,
    targetEnv: 'Sub-₹10,000 Phones (ARM Cortex-A53)',
    highlight: true
  }
];

export const DATASET_BENCHMARKS = [
  {
    name: 'EyePACS (Kaggle DR)',
    images: '88,702 fundus photos',
    centers: '45 clinics across California & US',
    demographics: 'Multi-ethnic cohort with diverse mydriatic states',
    purpose: 'Pre-training generalized feature representations'
  },
  {
    name: 'Messidor & Messidor-2',
    images: '1,748 macula-centered images',
    centers: '3 French University Hospital Eye Services',
    demographics: 'European cohort with verified double-read diabetic macular edema',
    purpose: 'Cross-institution clinical validation'
  },
  {
    name: 'APTOS 2019 Blindness Detection',
    images: '3,662 rural India fundus photographs',
    centers: 'Aravind Eye Hospital rural screening camps',
    demographics: 'Rural Indian demographic cohort with varied cataract media opacities',
    purpose: 'Domain-specific fine-tuning for low-resource optics'
  }
];

export const ICDR_STAGES_GUIDE = [
  {
    stage: 'Stage 0',
    title: 'No Apparent DR',
    findings: 'No microaneurysms, hemorrhages, or exudates. Normal vascular caliber.',
    risk: 'Low',
    color: 'emerald',
    action: 'Annual screening at village PHC or Health & Wellness Centre. Glycemic control.'
  },
  {
    stage: 'Stage 1',
    title: 'Mild NPDR',
    findings: 'Microaneurysms only. Microscopic outpouchings in capillary beds.',
    risk: 'Moderate',
    color: 'amber',
    action: '6-month PHC follow-up. Medical Officer review of HbA1c and blood pressure.'
  },
  {
    stage: 'Stage 2',
    title: 'Moderate NPDR',
    findings: 'More than microaneurysms but less than Severe NPDR: blot hemorrhages, hard exudates.',
    risk: 'High',
    color: 'orange',
    action: 'Referral to Sub-District / District Eye Hospital within 30 days.'
  },
  {
    stage: 'Stage 3',
    title: 'Severe NPDR (4-2-1 Rule)',
    findings: '>20 intraretinal hemorrhages in 4 quadrants, venous beading in ≥2 quadrants, or IRMA in ≥1 quadrant.',
    risk: 'Critical',
    color: 'rose',
    action: 'Urgent ophthalmologist evaluation within 14 days for laser photocoagulation workup.'
  },
  {
    stage: 'Stage 4',
    title: 'Proliferative DR (PDR)',
    findings: 'Neovascularization at the disc (NVD), neovascularization elsewhere (NVE), preretinal/vitreous hemorrhage.',
    risk: 'Emergency',
    color: 'rose',
    action: 'Emergency referral within 72 hours for Pan-Retinal Photocoagulation (PRP) or Anti-VEGF injections.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'LOG-9941',
    timestamp: '2026-09-06 10:38:12 IST',
    eventType: 'IMAGE_INGEST',
    actor: 'ASHA Worker Savita Bai (ID: ASHA-MP-4412)',
    role: 'Primary Health Care Worker',
    patientAbhaHash: '0x8f2a9...3c11 (Ramesh Kumar)',
    actionDetails: 'Ingested 20D indirect ophthalmoscopy frame (1080x1080) via clip-on smartphone lens',
    integrityHash: 'e7c18a994ef0321d8b2e551',
    status: 'VERIFIED'
  },
  {
    id: 'LOG-9942',
    timestamp: '2026-09-06 10:38:13 IST',
    eventType: 'QUALITY_CHECK',
    actor: 'SightSeer OpenCV Pipeline v4.10',
    role: 'Automated Gatekeeper',
    patientAbhaHash: '0x8f2a9...3c11 (Ramesh Kumar)',
    actionDetails: 'Laplacian Var: 168.2 (PASS) | Circular FOV: 98.4% (PASS) | Glare: 0.8% (PASS)',
    integrityHash: 'b4317f22a091ccb3127ee98',
    status: 'VERIFIED'
  },
  {
    id: 'LOG-9943',
    timestamp: '2026-09-06 10:38:14 IST',
    eventType: 'INFERENCE_RUN',
    actor: 'ONNX INT8 Mobile Engine (A-FPN)',
    role: 'On-Device Neuromorphic Core',
    patientAbhaHash: '0x8f2a9...3c11 (Ramesh Kumar)',
    actionDetails: 'Inference time: 378ms | Predicted Stage 0 (No DR, Confidence 99.4%)',
    integrityHash: '9910d8fa0129bc35327aa41',
    status: 'ENCRYPTED'
  },
  {
    id: 'LOG-9944',
    timestamp: '2026-09-06 10:38:15 IST',
    eventType: 'SQLCIPHER_ROTATE',
    actor: 'SQLCipher AES-256 Engine',
    role: 'Local Security Vault',
    patientAbhaHash: '0x8f2a9...3c11 (Ramesh Kumar)',
    actionDetails: 'Encrypted patient diagnostic tuple and generated offline ABHA FHIR DiagnosticReport',
    integrityHash: '317fae991024bd35a09c441',
    status: 'QUEUED'
  },
  {
    id: 'LOG-9945',
    timestamp: '2026-09-06 10:41:04 IST',
    eventType: 'DELTA_SYNC_PACKET',
    actor: 'FastAPI Delta Gateway v3.11',
    role: 'Rural Cloud Ingest Gateway',
    patientAbhaHash: 'Batch #B-2026-0906-04 (12 Records)',
    actionDetails: 'Brotli-compressed HMAC payload synced over 2G network. Total payload: 114.2 KB',
    integrityHash: '0x99cb14e21a007bc453912df',
    status: 'SYNCED'
  }
];

export const FHIR_R4_SNIPPET = `{
  "resourceType": "DiagnosticReport",
  "id": "sightseer-dr-2026-081",
  "meta": {
    "profile": ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DiagnosticReportRecord"]
  },
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "394594003",
          "display": "Ophthalmology"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "81247-9",
        "display": "Diabetic retinopathy study fundus photograph"
      }
    ]
  },
  "subject": {
    "reference": "Patient/ABHA-91-4829-1092-3341",
    "display": "Ramesh Kumar"
  },
  "performer": [
    {
      "reference": "Practitioner/ASHA-MP-4412",
      "display": "Savita Bai (Community Health Activist)"
    },
    {
      "reference": "Device/SightSeer-Mobile-v2.4",
      "display": "SightSeer AI Edge Inference System"
    }
  ],
  "conclusion": "ICDR Stage 0: No apparent diabetic retinopathy. Optical quality score 156.4 (Pass). Annual re-screening recommended.",
  "conclusionCode": [
    {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "266919005",
          "display": "No diabetic retinopathy"
        }
      ]
    }
  ]
}`;
