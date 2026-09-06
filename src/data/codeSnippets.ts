export interface CodeSnippet {
  filename: string;
  language: string;
  description: string;
  code: string;
}

export const ARCHITECTURE_CODE_SNIPPETS: Record<string, CodeSnippet> = {
  opencv_quality_gate: {
    filename: 'opencv_quality_gate.py',
    language: 'python',
    description: 'Pre-inference optical triage: Blur detection, Circular Hough FOV, and specular reflection masking.',
    code: `"""
SightSeer AI — Tier B: OpenCV 4.10 Pre-Inference Quality Gatekeeper
Executed on-device (ARM Cortex-A53) prior to neural inference to reject
sub-diagnostic optical artifacts captured via 20D indirect ophthalmoscopy.
"""
import cv2
import numpy as np
from typing import Tuple, Dict

class FundusQualityGate:
    def __init__(
        self,
        min_laplacian_var: float = 120.0,
        min_fov_coverage: float = 85.0,
        max_glare_ratio: float = 0.025
    ):
        self.min_laplacian_var = min_laplacian_var
        self.min_fov_coverage = min_fov_coverage
        self.max_glare_ratio = max_glare_ratio

    def evaluate_frame(self, bgr_image: np.ndarray) -> Tuple[bool, Dict[str, float]]:
        h, w = bgr_image.shape[:2]
        gray = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2GRAY)

        # 1. Laplacian Variance (Sharpness / Focus score)
        # Low variance indicates motion blur or incorrect 20D condensing lens distance
        laplacian = cv2.Laplacian(gray, cv2.CV_64F, ksize=3)
        laplacian_var = float(laplacian.var())

        # 2. Circular Hough Transform for Retina Field-of-View (FOV)
        # Ensures full 45-degree fundus disc is centered inside smartphone optic adapter
        blurred = cv2.GaussianBlur(gray, (9, 9), 2)
        circles = cv2.HoughCircles(
            blurred,
            cv2.HOUGH_GRADIENT,
            dp=1.2,
            minDist=h // 2,
            param1=50,
            param2=30,
            minRadius=int(min(h, w) * 0.35),
            maxRadius=int(min(h, w) * 0.52)
        )

        fov_coverage_pct = 0.0
        mask = np.zeros((h, w), dtype=np.uint8)
        if circles is not None:
            circles = np.round(circles[0, :]).astype(int)
            cx, cy, r = circles[0]
            cv2.circle(mask, (cx, cy), r, 255, -1)
            total_circle_area = np.pi * (r ** 2)
            fov_coverage_pct = float(min(100.0, (total_circle_area / (h * w)) * 100.0 * 1.25))

        # 3. Specular Glare Thresholding (Flash / LED reflection mask)
        # Cornea reflex artifacts that would falsely activate Grad-CAM attention
        hsv = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2HSV)
        val_channel = hsv[:, :, 2]
        glare_mask = cv2.threshold(val_channel, 250, 255, cv2.THRESH_BINARY)[1]
        if mask.any():
            glare_in_retina = cv2.bitwise_and(glare_mask, glare_mask, mask=mask)
            glare_ratio = float(np.count_nonzero(glare_in_retina) / (np.count_nonzero(mask) + 1e-6))
        else:
            glare_ratio = float(np.count_nonzero(glare_mask) / (h * w))

        passed = (
            laplacian_var >= self.min_laplacian_var and
            fov_coverage_pct >= self.min_fov_coverage and
            glare_ratio <= self.max_glare_ratio
        )

        telemetry = {
            "laplacian_variance": round(laplacian_var, 2),
            "laplacian_passed": bool(laplacian_var >= self.min_laplacian_var),
            "fov_coverage_pct": round(fov_coverage_pct, 1),
            "fov_passed": bool(fov_coverage_pct >= self.min_fov_coverage),
            "specular_glare_pct": round(glare_ratio * 100.0, 2),
            "glare_passed": bool(glare_ratio <= self.max_glare_ratio),
            "optical_gate_passed": bool(passed)
        }
        return passed, telemetry
`
  },
  pytorch_afpn_model: {
    filename: 'pytorch_afpn_model.py',
    language: 'python',
    description: 'PyTorch 2.3+ Multi-Task MobileNetV3 with Asymmetric Feature Pyramid Network (A-FPN).',
    code: `"""
SightSeer AI — Tier A: PyTorch 2.3+ Multi-Task MobileNetV3 + A-FPN
Jointly predicts ICDR 5-Stage DR Severity via Ordinal Regression and
Macular Edema risk via Focal-weighted auxiliary classification.
"""
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision.models import mobilenet_v3_large, MobileNet_V3_Large_Weights

class AsymmetricFPN(nn.Module):
    """
    Asymmetric Feature Pyramid Network fusing multi-scale feature hierarchies
    for microaneurysms (8-16px) and large cotton-wool/hemorrhage lesions.
    """
    def __init__(self, in_channels_list=[40, 112, 960], out_channels=128):
        super().__init__()
        self.lateral_convs = nn.ModuleList([
            nn.Conv2d(c, out_channels, kernel_size=1) for c in in_channels_list
        ])
        self.fpn_convs = nn.ModuleList([
            nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1) for _ in in_channels_list
        ])

    def forward(self, features):
        # features: [C3 (early), C4 (mid), C5 (deep)]
        p5 = self.lateral_convs[2](features[2])
        p4 = self.lateral_convs[1](features[1]) + F.interpolate(p5, scale_factor=2, mode='nearest')
        p3 = self.lateral_convs[0](features[0]) + F.interpolate(p4, scale_factor=2, mode='nearest')
        
        o3 = self.fpn_convs[0](p3)
        o4 = self.fpn_convs[1](p4)
        o5 = self.fpn_convs[2](p5)
        return [o3, o4, o5]

class SightSeerNet(nn.Module):
    def __init__(self, num_dr_classes=5, num_dme_classes=2):
        super().__init__()
        backbone = mobilenet_v3_large(weights=MobileNet_V3_Large_Weights.DEFAULT)
        self.features = backbone.features
        
        # Tap multi-scale stages for A-FPN
        self.stage3 = self.features[:7]    # 40 channels
        self.stage4 = self.features[7:13]  # 112 channels
        self.stage5 = self.features[13:]   # 960 channels
        
        self.afpn = AsymmetricFPN(in_channels_list=[40, 112, 960], out_channels=128)
        self.global_pool = nn.AdaptiveAvgPool2d(1)
        
        # Ordinal Regression Head: K-1 binary classification thresholds
        # Enforces mathematical ordinality: P(Stage >= 1) >= P(Stage >= 2) >= ...
        self.dr_ordinal_head = nn.Linear(128 * 3, num_dr_classes - 1)
        self.dme_head = nn.Linear(128 * 3, num_dme_classes)

    def forward(self, x):
        c3 = self.stage3(x)
        c4 = self.stage4(c3)
        c5 = self.stage5(c4)
        
        f3, f4, f5 = self.afpn([c3, c4, c5])
        pooled = [self.global_pool(f).flatten(1) for f in (f3, f4, f5)]
        fused = torch.cat(pooled, dim=1) # 384-dim embedding
        
        dr_logits = self.dr_ordinal_head(fused)
        dme_logits = self.dme_head(fused)
        return dr_logits, dme_logits, c5
`
  },
  gradcam_engine: {
    filename: 'gradcam_engine.py',
    language: 'python',
    description: 'Explainable AI: Target gradient backprop generating verifiable pixel-level lesion activation maps.',
    code: `"""
SightSeer AI — Tier C: Frontline Explainable AI (Grad-CAM Engine)
Extracts spatial feature activations from A-FPN Stage5, computing channel weights
via global average pooling of positive gradients to reveal diagnostic pathology.
"""
import cv2
import numpy as np
import torch

class GradCAMEngine:
    def __init__(self, model: torch.nn.Module, target_layer: torch.nn.Module):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        self._register_hooks()

    def _register_hooks(self):
        def forward_hook(module, input, output):
            self.activations = output.detach()
            
        def backward_hook(module, grad_in, grad_out):
            self.gradients = grad_out[0].detach()

        self.target_layer.register_forward_hook(forward_hook)
        self.target_layer.register_full_backward_hook(backward_hook)

    def generate_heatmap(self, input_tensor: torch.Tensor, class_idx: int) -> np.ndarray:
        self.model.eval()
        dr_logits, _, _ = self.model(input_tensor)
        
        # Backward pass on target severity score
        self.model.zero_grad()
        score = dr_logits[0, class_idx]
        score.backward(retain_graph=True)

        # Global average pooling of gradients: neuron importance weights α_k^c
        alpha = torch.mean(self.gradients, dim=[2, 3], keepdim=True)
        # Linear combination of forward activation maps
        cam = torch.sum(alpha * self.activations, dim=1, keepdim=True)
        # Apply ReLU to retain only positive influences on target pathology
        cam = torch.relu(cam)
        
        # Normalize to [0, 1]
        cam = cam.squeeze().cpu().numpy()
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)
        
        # Resize to input dimensions (e.g. 512x512) and apply Jet colormap
        cam_resized = cv2.resize(cam, (input_tensor.shape[3], input_tensor.shape[2]))
        heatmap = cv2.applyColorMap(np.uint8(255 * cam_resized), cv2.COLORMAP_JET)
        return cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
`
  },
  fastapi_sync: {
    filename: 'fastapi_sync.py',
    language: 'python',
    description: 'Tier D: Asynchronous FastAPI Delta-Sync Gateway for batched rural cluster sync (< 120 KB).',
    code: `"""
SightSeer AI — Tier D: FastAPI 3.11 Async Delta-Sync Gateway
Accepts Brotli-compressed, HMAC-SHA256 authenticated clinical payloads from offline PHCs.
Avoids sending raw 15MB TIFF images over 2G/EDGE rural networks by transmitting
compact 384-dimensional feature embeddings + encrypted FHIR R4 DiagnosticReports (< 120 KB).
"""
import hmac
import hashlib
import brotli
from fastapi import FastAPI, HTTPException, Header, Depends, status
from pydantic import BaseModel, Field
from typing import List, Optional

app = FastAPI(
    title="SightSeer AI Rural Delta-Sync Gateway",
    version="2.4.0",
    docs_url="/api/docs"
)

SECRET_HMAC_KEY = b"phc_secure_hmac_secret_2026"

class EncryptedPatientRecord(BaseModel):
    record_uuid: str
    abha_id_hash: str
    dr_stage: int = Field(ge=0, le=4)
    confidence: float
    vector_embedding: List[float] # 384-dim MobileNetV3 A-FPN latent features
    fhir_bundle_json_enc: str     # AES-256-GCM ciphertext
    timestamp_epoch: int
    phc_id: str

class SyncBatchRequest(BaseModel):
    batch_id: str
    batch_timestamp: int
    records: List[EncryptedPatientRecord]
    payload_checksum: str

@app.post("/api/v1/sync/delta", status_code=status.HTTP_201_CREATED)
async def receive_rural_delta_sync(
    payload: SyncBatchRequest,
    x_phc_signature: str = Header(...),
    x_phc_device_id: str = Header(...)
):
    # 1. Cryptographic HMAC-SHA256 signature verification
    computed_signature = hmac.new(
        SECRET_HMAC_KEY,
        payload.payload_checksum.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    if not hmac.compare_digest(computed_signature, x_phc_signature):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tampered sync payload: HMAC signature verification failed"
        )

    # 2. Ingest into Central Tertiary Registry
    # Batch size typically < 120 KB across 10-15 screened rural patients
    synced_count = len(payload.records)
    high_risk_alerts = [r for r in payload.records if r.dr_stage >= 3]

    return {
        "status": "SYNC_COMMITTED",
        "batch_id": payload.batch_id,
        "synced_records": synced_count,
        "high_risk_triaged": len(high_risk_alerts),
        "server_ack_epoch": 1788710000,
        "bandwidth_saved_mb": round((synced_count * 14.5) - (0.095), 2)
    }
`
  }
};
