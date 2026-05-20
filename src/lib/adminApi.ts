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

export type AdminEmailCodeRequestResponse = {
  challengeId: string;
  expiresAt?: string;
};

export type AdminEmailCodeVerifyResponse = {
  accessToken: string;
};

export async function requestAdminEmailCode(
  email: string,
): Promise<AdminEmailCodeRequestResponse> {
  const response = await fetch(`${API_BASE_URL}/v1/admin/auth/email-code/request`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const json = await readJson(response);

  if (!response.ok) {
    throw new Error(extractApiError(json, "Failed to send admin code"));
  }

  const challengeId = readStringField(json, "challengeId");

  if (!challengeId) {
    throw new Error("Admin code request did not return a challenge.");
  }

  return {
    challengeId,
    expiresAt: readStringField(json, "expiresAt"),
  };
}

export async function verifyAdminEmailCode(input: {
  email: string;
  challengeId: string;
  code: string;
}): Promise<AdminEmailCodeVerifyResponse> {
  const response = await fetch(`${API_BASE_URL}/v1/admin/auth/email-code/verify`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const json = await readJson(response);

  if (!response.ok) {
    throw new Error(extractApiError(json, "Failed to enter admin console"));
  }

  const accessToken = extractAccessToken(json);

  if (!accessToken) {
    throw new Error("Admin verification did not return an access token.");
  }

  return { accessToken };
}

export async function getAdminMe(token: string): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}/v1/admin/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-fixact-authorization": `Bearer ${token}`,
    },
  });

  const json = await readJson(response);

  if (!response.ok) {
    throw new Error(extractApiError(json, "Failed to confirm admin access"));
  }

  if (hasProviderErrorShape(json)) {
    throw new Error(extractApiError(json, "Failed to confirm admin access"));
  }

  return json;
}

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
      "Content-Type": "application/json",
      "x-fixact-authorization": `Bearer ${input.token}`,
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
        "Content-Type": "application/json",
        "x-fixact-authorization": `Bearer ${input.token}`,
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

function extractAccessToken(value: unknown): string | undefined {
  const direct = readStringField(value, "accessToken") ?? readStringField(value, "token");

  if (direct) {
    return direct;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const auth = record.auth;

    return readStringField(auth, "accessToken") ?? readStringField(auth, "token");
  }

  return undefined;
}

function readStringField(value: unknown, field: string): string | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const raw = (value as Record<string, unknown>)[field];

  return typeof raw === "string" && raw.trim() ? raw : undefined;
}

function hasProviderErrorShape(value: unknown): boolean {
  return Boolean(readStringField(value, "errorCode") || readStringField(value, "errorMessage"));
}

function extractApiError(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof record.errorMessage === "string") {
      return record.errorMessage;
    }

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
