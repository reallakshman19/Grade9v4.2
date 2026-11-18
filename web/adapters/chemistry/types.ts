/**
 * web/adapters/chemistry/types.ts
 * A28 — Chemistry representation workspace contracts.
 *
 * Implements:
 * - CHEM_E1, CHEM_E2, CHEM_E3 exam archetypes (NSEJS, NSEC, IChO)
 * - Chemical structure capture (SMILES, Formula, SVG/2D representation)
 * - Accessible text representation for screen readers
 * - Reaction mechanism steps & equations
 * - Spectra data representation (IR, 1H-NMR, 13C-NMR, Mass Spec)
 * - Mandatory pedagogical invariant: Complex chemical structures and reaction
 *   mechanisms (E2/E3) are NEVER auto-graded; evaluations remain REVIEW_PENDING
 *   with scores withheld (points: null).
 * - Keyboard-accessible alternatives for all visual structures.
 *
 * No academic approval inferred from software validation.
 */

export type ChemExamArchetype = 'CHEM_E1' | 'CHEM_E2' | 'CHEM_E3';

export type ChemicalStructureFormat = 'SMILES' | 'FORMULA' | 'INCHI' | 'SVG' | 'MOLFILE';

export interface ChemicalStructureData {
  readonly format: ChemicalStructureFormat;
  readonly data: string;
  readonly accessibleLabel: string;
  readonly molecularFormula?: string;
  readonly molarMass?: number;
  readonly iupacName?: string;
}

export interface ReactionStep {
  readonly id: string;
  readonly stepNumber: number;
  readonly equation: string;
  readonly reagents?: string;
  readonly conditions?: string;
  readonly mechanismType?: 'NUCLEOPHILIC_ATTACK' | 'ELECTROPHILIC_ADDITION' | 'ELIMINATION' | 'SUBSTITUTION' | 'ACID_BASE' | 'REDOX' | 'RADICAL' | 'OTHER';
  readonly intermediateName?: string;
  readonly notes?: string;
  readonly accessibleDescription: string;
}

export type SpectrumType = 'IR' | 'NMR_1H' | 'NMR_13C' | 'UV_VIS' | 'MASS_SPEC';

export interface SpectralPeak {
  readonly position: number; // e.g. cm^-1 for IR, ppm for NMR, m/z for MS
  readonly intensity: number; // 0.0 to 1.0 or arbitrary relative intensity
  readonly label?: string; // e.g. "C=O stretch", "OH broad", "CH3"
  readonly multiplicity?: 's' | 'd' | 't' | 'q' | 'm' | 'br'; // singlet, doublet, triplet, quartet, multiplet, broad
  readonly integration?: number; // e.g. 3H, 2H for 1H-NMR
}

export interface ChemicalSpectrum {
  readonly id: string;
  readonly type: SpectrumType;
  readonly title: string;
  readonly peaks: readonly SpectralPeak[];
  readonly unit: string; // "cm^-1", "ppm", "nm", "m/z"
  readonly accessibleDescription: string;
}

export interface ChemicalWorkDraft {
  readonly archetype: ChemExamArchetype;
  readonly structure?: ChemicalStructureData;
  readonly mechanismSteps: readonly ReactionStep[];
  readonly balancedEquation?: string;
  readonly spectra: readonly ChemicalSpectrum[];
  readonly learnerNotes?: string;
  readonly revision: number;
  readonly lastModifiedAt: string;
}

export interface ChemicalEvaluationRubricCriterion {
  readonly name: string;
  readonly maxPoints: number;
  readonly awardedPoints: number | null;
  readonly reviewerNotes: string | null;
}

export interface ChemicalEvaluation {
  readonly status: 'SCORED' | 'REVIEW_PENDING' | 'INVALID';
  readonly points: number | null;
  readonly maxPoints: number;
  readonly feedback: string;
  readonly isAutoGraded: boolean;
  readonly rubricCriteria?: readonly ChemicalEvaluationRubricCriterion[];
}
