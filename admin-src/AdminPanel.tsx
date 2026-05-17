import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  CompetitionSession,
  cancelCompetitionSession,
  createCompetitionSession,
  getActiveCompetition,
} from "./adminApi";

const ADMIN_TOKEN_STORAGE_KEY = "fixact.admin.jwt";

export default function AdminPanel() {
  const [token, setToken] = useState(() => {
    try {
      return window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) ?? "";
    } catch {
      return "";
    }
  });

  const [sportCode, setSportCode] = useState<"football">("football");
  const [disciplineCode, setDisciplineCode] =
    useState<"football_technical_v1">("football_technical_v1");
  const [ageGroupCode, setAgeGroupCode] =
    useState<"children_8_11" | "teens_12_15" | "juniors_16_18" | "adults_18_plus">(
      "children_8_11",
    );
  const [genderCategory, setGenderCategory] =
    useState<"male" | "female" | "mixed">("mixed");
  const [rulesVersionId, setRulesVersionId] = useState("");
  const [launchAt, setLaunchAt] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("500");
  const [currencyCode, setCurrencyCode] = useState("RUB");
  const [rewardPoolMinor, setRewardPoolMinor] = useState("0");

  const [activeCompetition, setActiveCompetition] =
    useState<CompetitionSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const hasToken = token.trim().length > 0;

  const statusLabel = useMemo(() => {
    if (!activeCompetition) return "No active session";
    return activeCompetition.status;
  }, [activeCompetition]);

  useEffect(() => {
    if (!hasToken) return;

    void refreshActiveCompetition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persistToken(nextToken: string) {
    setToken(nextToken);

    try {
      if (nextToken.trim()) {
        window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, nextToken.trim());
      } else {
        window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      }
    } catch {
      // localStorage may be unavailable in restricted browser contexts.
    }
  }

  async function refreshActiveCompetition() {
    setIsLoading(true);
    setError(null);
    setNotice(null);

    try {
      const competition = await getActiveCompetition();
      setActiveCompetition(competition);
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token.trim()) {
      setError("Admin JWT is required.");
      return;
    }

    setIsMutating(true);
    setError(null);
    setNotice(null);

    try {
      const result = await createCompetitionSession({
        token: token.trim(),
        sportCode,
        disciplineCode,
        ageGroupCode,
        genderCategory,
        rulesVersionId: rulesVersionId.trim(),
        launchAt: launchAt.trim() || undefined,
        maxParticipants: Number(maxParticipants),
        currencyCode: currencyCode.trim() || undefined,
        rewardPoolMinor: rewardPoolMinor.trim() || undefined,
      });

      setActiveCompetition(result.competitionSession);
      setNotice("Competition session created.");
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsMutating(false);
    }
  }

  async function handleCancel() {
    if (!token.trim()) {
      setError("Admin JWT is required.");
      return;
    }

    if (!activeCompetition?.id) {
      setError("No active competition session to cancel.");
      return;
    }

    setIsMutating(true);
    setError(null);
    setNotice(null);

    try {
      await cancelCompetitionSession({
        token: token.trim(),
        competitionSessionId: activeCompetition.id,
      });

      setActiveCompetition(null);
      setNotice("Competition session cancelled.");
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsMutating(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070912] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-20rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-24rem] right-[-10rem] h-[42rem] w-[42rem] rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <div>
            <Link
              to="/"
              className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50 transition hover:text-white"
            >
              FixAct Sport
            </Link>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Admin Panel
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
              Operational console for opening and cancelling governed competition
              sessions. Athlete flows, capture, judging, and rewards are intentionally
              outside this panel.
            </p>
          </div>

          <Badge className="w-fit border-blue-400/30 bg-blue-500/15 px-3 py-1 text-blue-100 hover:bg-blue-500/15">
            <ShieldCheck className="mr-1 h-3.5 w-3.5" />
            Admin v1
          </Badge>
        </header>

        {(error || notice) && (
          <div
            className={
              error
                ? "rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100"
                : "rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100"
            }
          >
            <div className="flex items-start gap-3">
              {error ? (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <span>{error ?? notice}</span>
            </div>
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-white/10 bg-white/[0.04] text-white shadow-2xl shadow-black/30">
            <CardHeader>
              <CardTitle>Admin access</CardTitle>
              <CardDescription className="text-white/55">
                Paste a real JWT for a user with an active admin role.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-token" className="text-white/80">
                  Admin JWT
                </Label>
                <Input
                  id="admin-token"
                  value={token}
                  onChange={(event) => persistToken(event.target.value)}
                  placeholder="eyJhbGciOi..."
                  className="border-white/10 bg-black/30 text-white placeholder:text-white/30"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  onClick={refreshActiveCompetition}
                  disabled={!hasToken || isLoading || isMutating}
                  className="bg-white text-black hover:bg-white/90"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Refresh active session
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => persistToken("")}
                  disabled={!hasToken || isMutating}
                  className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  Clear token
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] text-white shadow-2xl shadow-black/30">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>Active competition session</CardTitle>
                  <CardDescription className="text-white/55">
                    Public read model from the backend competition surface.
                  </CardDescription>
                </div>

                <Badge
                  className={
                    activeCompetition
                      ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/15"
                      : "border-white/15 bg-white/10 text-white/70 hover:bg-white/10"
                  }
                >
                  {statusLabel}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              {activeCompetition ? (
                <div className="space-y-5">
                  <Table>
                    <TableBody>
                      <AdminRow label="ID" value={activeCompetition.id} />
                      <AdminRow label="Sport" value={activeCompetition.sportCode} />
                      <AdminRow label="Discipline" value={activeCompetition.disciplineCode} />
                      <AdminRow label="Age group" value={activeCompetition.ageGroupCode} />
                      <AdminRow label="Gender category" value={activeCompetition.genderCategory} />
                      <AdminRow label="Rules version" value={activeCompetition.rulesVersionId} />
                      <AdminRow label="Launch" value={formatDate(activeCompetition.launchAt)} />
                      <AdminRow
                        label="Participants"
                        value={`${activeCompetition.participantCount ?? 0} / ${
                          activeCompetition.maxParticipants ?? "—"
                        }`}
                      />
                      <AdminRow
                        label="Reward pool"
                        value={`${activeCompetition.rewardPoolMinor ?? "0"} ${
                          activeCompetition.currencyCode ?? "RUB"
                        }`}
                      />
                      <AdminRow label="Reward status" value={activeCompetition.rewardStatus} />
                    </TableBody>
                  </Table>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleCancel}
                    disabled={isMutating}
                  >
                    {isMutating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Cancel active session
                  </Button>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 p-6 text-sm text-white/55">
                  No active competition session loaded.
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <Card className="border-white/10 bg-white/[0.04] text-white shadow-2xl shadow-black/30">
          <CardHeader>
            <CardTitle>Create competition session</CardTitle>
            <CardDescription className="text-white/55">
              Opens a governed competition window. Backend rejects creation if an active
              session already exists.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="grid gap-5 md:grid-cols-2" onSubmit={handleCreate}>
              <div className="space-y-2">
                <Label htmlFor="sport-code" className="text-white/80">
                  Sport
                </Label>
                <select
                  id="sport-code"
                  value={sportCode}
                  onChange={(event) => setSportCode(event.target.value as "football")}
                  required
                  className="flex h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <option value="football">Football</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discipline-code" className="text-white/80">
                  Discipline
                </Label>
                <select
                  id="discipline-code"
                  value={disciplineCode}
                  onChange={(event) =>
                    setDisciplineCode(event.target.value as "football_technical_v1")
                  }
                  required
                  className="flex h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <option value="football_technical_v1">Football technical v1</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age-group-code" className="text-white/80">
                  Age group
                </Label>
                <select
                  id="age-group-code"
                  value={ageGroupCode}
                  onChange={(event) =>
                    setAgeGroupCode(
                      event.target.value as
                        | "children_8_11"
                        | "teens_12_15"
                        | "juniors_16_18"
                        | "adults_18_plus",
                    )
                  }
                  required
                  className="flex h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <option value="children_8_11">Children 8–11</option>
                  <option value="teens_12_15">Teens 12–15</option>
                  <option value="juniors_16_18">Juniors 16–18</option>
                  <option value="adults_18_plus">Adults 18+</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender-category" className="text-white/80">
                  Gender category
                </Label>
                <select
                  id="gender-category"
                  value={genderCategory}
                  onChange={(event) =>
                    setGenderCategory(event.target.value as "male" | "female" | "mixed")
                  }
                  required
                  className="flex h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <option value="mixed">Mixed</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="rules-version-id" className="text-white/80">
                  Rules version ID
                </Label>
                <Input
                  id="rules-version-id"
                  value={rulesVersionId}
                  onChange={(event) => setRulesVersionId(event.target.value)}
                  placeholder="UUID"
                  required
                  className="border-white/10 bg-black/30 text-white placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="launch-at" className="text-white/80">
                  Launch datetime
                </Label>
                <Input
                  id="launch-at"
                  value={launchAt}
                  onChange={(event) => setLaunchAt(event.target.value)}
                  placeholder="Leave empty for now"
                  className="border-white/10 bg-black/30 text-white placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-participants" className="text-white/80">
                  Max participants
                </Label>
                <Input
                  id="max-participants"
                  value={maxParticipants}
                  onChange={(event) => setMaxParticipants(event.target.value)}
                  inputMode="numeric"
                  required
                  className="border-white/10 bg-black/30 text-white placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency-code" className="text-white/80">
                  Currency
                </Label>
                <Input
                  id="currency-code"
                  value={currencyCode}
                  onChange={(event) => setCurrencyCode(event.target.value.toUpperCase())}
                  maxLength={3}
                  required
                  className="border-white/10 bg-black/30 text-white placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reward-pool-minor" className="text-white/80">
                  Reward pool minor units
                </Label>
                <Input
                  id="reward-pool-minor"
                  value={rewardPoolMinor}
                  onChange={(event) => setRewardPoolMinor(event.target.value)}
                  inputMode="numeric"
                  required
                  className="border-white/10 bg-black/30 text-white placeholder:text-white/30"
                />
              </div>

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  disabled={!hasToken || isMutating}
                  className="bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:from-blue-400 hover:to-violet-400"
                >
                  {isMutating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Create session
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function AdminRow({ label, value }: { label: string; value: unknown }) {
  return (
    <TableRow className="border-white/10 hover:bg-white/[0.03]">
      <TableCell className="w-48 text-white/50">{label}</TableCell>
      <TableCell className="font-mono text-xs text-white/85">{String(value ?? "—")}</TableCell>
    </TableRow>
  );
}

function formatDate(value: string | undefined | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function toErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}