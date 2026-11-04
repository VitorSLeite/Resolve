/**
 * Client-side draft of the problem typed on the landing page.
 * Kept in sessionStorage only (never sent anywhere) until the user
 * signs in and the problem is persisted (Phase 2/4).
 */
export const PROBLEM_DRAFT_KEY = "resolve:problem-draft";
export const PROBLEM_DRAFT_MAX = 4000;

export function saveProblemDraft(text: string) {
  try {
    sessionStorage.setItem(PROBLEM_DRAFT_KEY, text.slice(0, PROBLEM_DRAFT_MAX));
  } catch {
    /* storage unavailable */
  }
}

export function readProblemDraft(): string {
  try {
    return sessionStorage.getItem(PROBLEM_DRAFT_KEY) ?? "";
  } catch {
    return "";
  }
}

export function clearProblemDraft() {
  try {
    sessionStorage.removeItem(PROBLEM_DRAFT_KEY);
  } catch {
    /* storage unavailable */
  }
}
