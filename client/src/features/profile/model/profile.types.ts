export type ProfilePeriod = "month" | "quarter" | "year";

export type ProfileActivityPoint = {
    month: string;
    value: number;
};

export type ProfileUser = {
    name: string;
    email: string;
    totalScore: number;
    scenariosCompleted: number;
    lastActivityDate: string;
    lastCompletedScenario: string;
};

export type ProfileData = {
    user: ProfileUser;
    activity: ProfileActivityPoint[];
};
