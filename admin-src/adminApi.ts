const rawApiBaseUrl = import.meta.env.VITE_FIXACT_API_BASE_URL;

if (!rawApiBaseUrl) {
  throw new Error("VITE_FIXACT_API_BASE_URL is required for admin API calls");
}

const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, "");

export type CompetitionSession = {
  id: string;
  status: string;
  launchAt?: string;
  closeAt?: string | null;
  maxParticipants?: number;
  participantCount?: number;
  closeReason?: string | null;
  rulesVersionId?: string;
  sportCode?: string;
  disciplineCode?: string;
  ageGroupCode?: string;
  genderCategory?: string;
  currencyCode?: string;
  rewardPoolMinor?: string;
  rewardStatus?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateCompetitionSessionInput = {
  token: string;
  sportCode: "football";
  disciplineCode: "football_technical_v1";
  ageGroupCode: "children_8_11" | "teens_12_15" | "juniors_16_18" | "adults_18_plus";
  genderCategory: "male" | "female" | "mixed";
  rulesVersionId: string;
  launchAt?: string;
  maxParticipants?: number;
  currencyCode?: string;
  rewardPoolMinor?: string;
};

export async function getActiveCompetition(): Promise<CompetitionSession | null> {
  const response = await fetch(`${API_BASE_URL}/v1/competition/active`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status === 404) {
    return null;
  }

  const json = await readJson(response);

  if (!response.ok) {
    throw new Error(extractApiError(json, "Failed to load active competition"));
  }

  return json as CompetitionSession | null;
}

export async function createCompetitionSession(
  input: CreateCompetitionSessionInput,
): Promise<{ competitionSession: CompetitionSession; adminActorUserId: string }> {
  const body = {
    sportCode: input.sportCode,
    disciplineCode: input.disciplineCode,
    ageGroupCode: input.ageGroupCode,
    genderCategory: input.genderCategory,
    rulesVersionId: input.rulesVersionId,
    launchAt: input.launchAt || undefined,
    maxParticipants: input.maxParticipants,
    currencyCode: input.currencyCode || undefined,
    rewardPoolMinor: input.rewardPoolMinor || undefined,
  };

  const response = await fetch(`${API_BASE_URL}/v1/admin/competition-sessions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${input.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await readJson(response);

  if (!response.ok) {
    throw new Error(extractApiError(json, "Failed to create competition session"));
  }

  return json as { competitionSession: CompetitionSession; adminActorUserId: string };
}

export async function cancelCompetitionSession(input: {
  token: string;
  competitionSessionId: string;
}): Promise<{ competitionSession: CompetitionSession; adminActorUserId: string }> {
  const response = await fetch(
    `${API_BASE_URL}/v1/admin/competition-sessions/${input.competitionSessionId}/cancel`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${input.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    },
  );

  const json = await readJson(response);

  if (!response.ok) {
    throw new Error(extractApiError(json, "Failed to cancel competition session"));
  }

  return json as { competitionSession: CompetitionSession; adminActorUserId: string };
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function extractApiError(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof record.message === "string") {
      return record.message;
    }

    if (Array.isArray(record.message)) {
      return record.message.join(", ");
    }

    if (typeof record.error === "string") {
      return record.error;
    }
  }

  return fallback;
}