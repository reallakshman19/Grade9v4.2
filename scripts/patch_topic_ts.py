#!/usr/bin/env python3
"""
Patch web/pages/topic.ts to add rich Core 1A study guides for:
- FLUIDS (Thrust & Hydrostatic Pressure)
- MOTION_1D (Motion in One Dimension)
- NLM (Newton's Laws of Motion)
- VECTORS (Vector Methods in Physics)
"""

import sys

with open("web/pages/topic.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Define the helper functions to insert
helpers_code = '''
function getFluidsStudyHtml(): string {
  return `
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:1.25rem;border-bottom:1px solid #e2e8f0;padding-bottom:1rem;">
        <div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">CORE 1A THEORY</span>
            <span style="font-size:0.8rem;font-weight:800;background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;">6 CONCEPT UNITS</span>
          </div>
          <h2 style="margin:0 0 0.25rem;font-size:1.45rem;font-weight:800;color:#0f172a;">🌊 Thrust &amp; Hydrostatic Pressure Study Guide</h2>
          <p style="color:#64748b;margin:0;font-size:0.95rem;">Rigorous mathematical derivations, normal equilibrium conditions, pressure scaling, and fluid statics.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="./physics/fluids/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Full Workspace App →</a>
          <a href="./standalone/practice/core1a-physics-thrust-pressure-tablet.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">📖 Fullscreen Tablet App →</a>
        </div>
      </div>

      <!-- Unit 1 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 1 · INTERFACE CONTACT</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">R = √(N² + f²)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Thrust Belongs to a Chosen Interface, Not an Isolated Force Arrow</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Thrust at a solid contact is strictly the <strong>normal (perpendicular) component N</strong> of the contact reaction. When the surface is rough, it simultaneously exerts a tangential friction component f. The vector resultant <strong>R = √(N² + f²)</strong> is the total contact force, not the thrust alone.
        </p>
        <div style="background:#eff6ff;border-left:3px solid #3b82f6;padding:8px 12px;border-radius:0 6px 6px 0;font-size:0.88rem;color:#1e3a8a;">
          <strong>Anchor Problem (INJSO 2016 Q32A):</strong> Boxes P (4kg) and Q (8kg) pushed at constant speed on rough table. Normal thrust on Q: N_Q = 80 N; friction f_Q = 48 N; total table reaction R_Q = √(80² + 48²) = 93.3 N at 59.0° above horizontal.
        </div>
      </div>

      <!-- Unit 2 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 2 · DYNAMICS</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">ΣF⊥ = m·a⊥ ⇒ N = mg - F·sinθ</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">N = mg is a Conditional Result, Not the Definition of Thrust</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Normal force is an adjustable constraint force derived from the complete perpendicular balance equation. For a body subject to an upward oblique pull F at angle θ: <strong>N = mg - F·sinθ</strong>. Contact is maintained only while N ≥ 0; if algebra requires N &lt; 0, contact is lost and N = 0.
        </p>
      </div>

      <!-- Unit 3 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 3 · DEFINITION</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">P_avg = F⊥ / A_actual</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Average Pressure Depends on Total Normal Thrust and Actual Loaded Area</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Pressure is a scalar defined as normal compressive force divided by actual physical contact area. 1 Pascal = 1 N/m². A solid cylinder of mass 15 kg and radius 5 cm exerts average floor pressure P = (15 × 9.8) / (π × 0.05²) = 18.7 kPa.
        </p>
      </div>

      <!-- Unit 4 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 4 · SCALING ANALYSIS</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">Weight ∝ L³, Area ∝ L² ⇒ P ∝ L</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Similar Objects Make Weight and Contact Area Scale with Different Powers</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Under geometric scaling by linear factor λ: volume and weight scale as λ³, whereas contact surface area scales as λ². Consequently, contact pressure scales linearly: <strong>P ∝ L</strong>. A cube of side 2L exerts exactly twice the floor pressure of a same-density cube of side L (INJSO 2012 Q39).
        </p>
      </div>

      <!-- Unit 5 & 6 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 5 &amp; 6 · HYDROSTATICS &amp; GAS LAWS</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">P_abs = P_atm + ρ·g·h &nbsp;|&nbsp; P₁V₁ = P₂V₂</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Depth Adds Gauge Pressure; Gas Laws Need Absolute Pressure</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          In a static fluid of density ρ at depth h: Gauge pressure = ρgh, Absolute pressure = P_atm + ρgh. When coupling hydrostatics to Boyle's law (e.g. rising bubbles), you <em>must</em> use P_abs. At depth 20m in water (P_atm = 10⁵ Pa, ρ = 1000 kg/m³), P₁ = 10⁵ + 2×10⁵ = 3×10⁵ Pa; at surface P₂ = 10⁵ Pa, so bubble volume triples (V₂ = 3V₁).
        </p>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:1rem;">
        <button type="button" onclick="window.location.hash='#/bank'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
          🎯 Practice Fluids Questions in Question Bank →
        </button>
      </div>
    </div>
  `;
}

function getMotion1DStudyHtml(): string {
  return `
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:1.25rem;border-bottom:1px solid #e2e8f0;padding-bottom:1rem;">
        <div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">CORE 1A THEORY</span>
            <span style="font-size:0.8rem;font-weight:800;background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;">6 CONCEPT UNITS</span>
          </div>
          <h2 style="margin:0 0 0.25rem;font-size:1.45rem;font-weight:800;color:#0f172a;">🏎️ Motion in One Dimension Study Guide</h2>
          <p style="color:#64748b;margin:0;font-size:0.95rem;">Rectilinear kinematics, parameter elimination, free fall symmetries, and calculus area translation.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="./physics/motion-1d/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Full Workspace App →</a>
          <a href="./physics/motion-1d/explorers/motion_in_1d/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Interactive Suite →</a>
          <a href="./standalone/practice/core1a-motion-1d-straight-line-tablet.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">📖 Tablet App →</a>
        </div>
      </div>

      <!-- Unit 1 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 1 · KINEMATICS</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">Δx = x_f - x_i &nbsp;|&nbsp; s = ∫|v|dt ≥ |Δx|</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Distance vs. Displacement &amp; Path Reversal Criteria</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Unidirectional motion preserves s = |Δx|. The exact instant velocity reverses sign (v = 0), distance continues monotonically increasing while net displacement subtracts. Particle starting at 0, moving to +8m then reversing to +2m covers distance 14m but net displacement +2m.
        </p>
      </div>

      <!-- Unit 2 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 2 · RATES</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">v_time = (v₁+v₂)/2 &nbsp;|&nbsp; v_dist = 2v₁v₂/(v₁+v₂)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Average Speed: Equal-Time Arithmetic vs. Equal-Distance Harmonic Mean</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Equal-distance weighting creates the harmonic mean: traveling at 40 km/h and returning at 60 km/h yields average speed 2×40×60/(40+60) = 48 km/h (NOT 50 km/h!), because more time is spent traversing the distance at the slower rate.
        </p>
      </div>

      <!-- Unit 3 & 4 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 3 &amp; 4 · EQUATIONS &amp; FREE FALL</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">v² = u² + 2as &nbsp;|&nbsp; H_max = u²/(2g) &nbsp;|&nbsp; s_n = u + ½a(2n-1)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Kinematic Parameter Elimination &amp; Vertical Reversal Invariance</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Under gravity (a = -g), apex velocity is momentarily zero (v = 0), but acceleration remains -g! Galileo's law of odd numbers: from rest, distances in successive seconds scale as 1 : 3 : 5 : 7.
        </p>
      </div>

      <!-- Unit 5 & 6 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 5 &amp; 6 · CALCULUS &amp; BRAKING</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">Area under v-t = Δx &nbsp;|&nbsp; d_stop = u·t_r + u²/(2a)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Calculus Graphical Translation &amp; Quadratic Braking Envelope</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Slope of position-time gives v(t); slope of v-t gives a(t). Bounded area under v-t gives net displacement Δx. Vehicle stopping distance has linear thinking lag u·t_r and quadratic braking skid u²/(2a).
        </p>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:1rem;">
        <button type="button" onclick="window.location.hash='#/bank'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
          🎯 Practice Motion 1D in Question Bank →
        </button>
      </div>
    </div>
  `;
}

function getNlmStudyHtml(): string {
  return `
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:1.25rem;border-bottom:1px solid #e2e8f0;padding-bottom:1rem;">
        <div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">CORE 1A THEORY</span>
            <span style="font-size:0.8rem;font-weight:800;background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;">6 CONCEPT UNITS</span>
          </div>
          <h2 style="margin:0 0 0.25rem;font-size:1.45rem;font-weight:800;color:#0f172a;">⚖️ Newton's Laws of Motion Study Guide</h2>
          <p style="color:#64748b;margin:0;font-size:0.95rem;">First law inertial frames, FBD isolation, Atwood constraints, momentum impulse, and stick-slip friction thresholds.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="./physics/nlm/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Full Workspace App →</a>
          <a href="./physics/nlm/explorers/atwood-pulleys/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Atwood Machine Suite →</a>
          <a href="./standalone/practice/core1a-physics-nlm-tablet.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">📖 Tablet App →</a>
        </div>
      </div>

      <!-- Unit 1 & 2 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 1 &amp; 2 · INERTIAL FRAMES &amp; FBD</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">ΣF_ext = 0 ⇔ v = const &nbsp;|&nbsp; N = mg cosθ</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">First Law Foundations &amp; System Isolation Rules</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Motion does not require force; force causes change in velocity. Free body diagrams must draw ONLY external forces acting ON the isolated body. Normal force N is not automatically mg; on an incline N = mg cosθ, and in an elevator N = m(g ± a).
        </p>
      </div>

      <!-- Unit 3 & 4 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 3 &amp; 4 · NEWTON II &amp; IMPULSE</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">a = (m₂-m₁)g/(m₁+m₂) &nbsp;|&nbsp; J = Δp = F_avg · Δt</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Atwood Pulley Constraints &amp; Momentum Impulse Theorem</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Taut string constraint requires equal acceleration magnitude for both blocks. String tension T = 2m₁m₂g/(m₁+m₂) is strictly less than the heavier weight m₂g. Momentum is a signed vector; rebounding doubles impulse Δp = 2mu, demanding prolonged impact time Δt to reduce peak force.
        </p>
      </div>

      <!-- Unit 5 & 6 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 5 &amp; 6 · THIRD LAW &amp; FRICTION</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">F_{AB} = -F_{BA} &nbsp;|&nbsp; f_s ≤ μ_s N, f_k = μ_k N</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Action-Reaction Pairs &amp; The Stick-Slip Friction Threshold</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Third law pairs act simultaneously on two DIFFERENT bodies and never cancel on a single FBD. Static friction is self-adjusting (f_s = F_applied) up to limiting threshold f_lim = μ_s N. Once slip begins, friction drops to constant kinetic value f_k = μ_k N.
        </p>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:1rem;">
        <button type="button" onclick="window.location.hash='#/bank'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
          🎯 Practice NLM in Question Bank →
        </button>
      </div>
    </div>
  `;
}

function getVectorsStudyHtml(): string {
  return `
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:1.25rem;border-bottom:1px solid #e2e8f0;padding-bottom:1rem;">
        <div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">CORE 1A THEORY</span>
            <span style="font-size:0.8rem;font-weight:800;background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;">6 CONCEPT UNITS</span>
          </div>
          <h2 style="margin:0 0 0.25rem;font-size:1.45rem;font-weight:800;color:#0f172a;">📐 Vector Methods in Physics Study Guide</h2>
          <p style="color:#64748b;margin:0;font-size:0.95rem;">Geometric vector laws, Cartesian unit vectors, dot products, cross products, and physical invariance.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="./physics/vectors/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Full Workspace App →</a>
          <a href="./standalone/practice/vector-algebra-3d-master-suite.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ 3D Master Suite →</a>
          <a href="./standalone/practice/core1a-physics-vectors-tablet.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">📖 Tablet App →</a>
        </div>
      </div>

      <!-- Unit 1 & 2 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 1 &amp; 2 · FOUNDATIONS &amp; ADDITION</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">R = √(A² + B² + 2AB cosθ)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Scalars vs. Vectors &amp; The Parallelogram Addition Law</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          A quantity is a vector only if it obeys the parallelogram addition law (current has direction but is a scalar!). Resultant magnitude ranges between |A - B| (at 180°) and A + B (at 0°). Two equal vectors of magnitude F at 120° yield a resultant of EXACTLY F at 60°.
        </p>
      </div>

      <!-- Unit 3 & 4 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 3 &amp; 4 · CARTESIAN RESOLUTION &amp; SUBTRACTION</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">A = A_x î + A_y ĵ &nbsp;|&nbsp; |Δv| = 2v sin(θ/2)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Orthogonal Unit Vectors &amp; Vector State Subtraction</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Resolving into Cartesian components converts complex geometric trigonometry into simple scalar arithmetic: R_x = Σ A_ix, R_y = Σ A_iy. A car turning a 90° corner at constant 20 m/s experiences a velocity change of magnitude √(20² + 20²) = 28.28 m/s!
        </p>
      </div>

      <!-- Unit 5 & 6 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 5 &amp; 6 · PRODUCTS</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">A · B = AB cosθ &nbsp;|&nbsp; τ = r × F = (AB sinθ) n̂</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Dot Product Projections &amp; Cross Product Torque Vectors</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          The dot product yields a scalar measuring alignment (W = F · d = 0 for perpendicular forces). The cross product yields a vector strictly perpendicular to the plane (r × F = -(F × r)), defining torque and angular momentum via the right-hand screw rule.
        </p>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:1rem;">
        <button type="button" onclick="window.location.hash='#/bank'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
          🎯 Practice Vectors in Question Bank →
        </button>
      </div>
    </div>
  `;
}
'''

# Check if helper functions already in file
if "function getFluidsStudyHtml" not in content:
    # Insert before mountTopicWorkspace or createTopicScreen
    pos = content.find("export function mountTopicWorkspace(")
    if pos == -1:
        pos = content.find("export function createTopicScreen(")
    if pos != -1:
        content = content[:pos] + helpers_code + "\n\n" + content[pos:]
        print("Injected helper functions into web/pages/topic.ts")
    else:
        print("Could not find insertion position for helpers")
        sys.exit(1)

# Now in mountExplorerTab: replace the blocks for FLUIDS, MOTION_1D, NLM, VECTORS
explorer_old_fluids_start = content.find("    if (topic.code === 'FLUIDS') {")
if explorer_old_fluids_start != -1:
    # Find the end of this block which had VECTORS
    explorer_vectors_end = content.find("    // Default Physics Explorer (GCDR 10-Stage)", explorer_old_fluids_start)
    if explorer_vectors_end != -1:
        replacement_block = """    if (topic.code === 'FLUIDS') {
      container.innerHTML = getFluidsStudyHtml();
      return;
    }

    if (topic.code === 'MOTION_1D') {
      container.innerHTML = getMotion1DStudyHtml();
      return;
    }

    if (topic.code === 'NLM') {
      container.innerHTML = getNlmStudyHtml();
      return;
    }

    if (topic.code === 'VECTORS') {
      container.innerHTML = getVectorsStudyHtml();
      return;
    }

"""
        content = content[:explorer_old_fluids_start] + replacement_block + content[explorer_vectors_end:]
        print("Replaced explorer tab physics blocks with rich study guides")

# Now in mountLabsTab: replace the blocks for FLUIDS, MOTION_1D, NLM, VECTORS
labs_old_fluids_start = content.find("    if (topic.code === 'FLUIDS') {")
if labs_old_fluids_start != -1:
    labs_vectors_end = content.find("    // Physics Harmonic Potential Well", labs_old_fluids_start)
    if labs_vectors_end != -1:
        replacement_block = """    if (topic.code === 'FLUIDS') {
      container.innerHTML = getFluidsStudyHtml();
      return;
    }

    if (topic.code === 'MOTION_1D') {
      container.innerHTML = getMotion1DStudyHtml();
      return;
    }

    if (topic.code === 'NLM') {
      container.innerHTML = getNlmStudyHtml();
      return;
    }

    if (topic.code === 'VECTORS') {
      container.innerHTML = getVectorsStudyHtml();
      return;
    }

"""
        content = content[:labs_old_fluids_start] + replacement_block + content[labs_vectors_end:]
        print("Replaced labs tab physics blocks with rich study guides")

with open("web/pages/topic.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated web/pages/topic.ts successfully.")
