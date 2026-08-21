import type { ProfileData } from "./profile.types";

export const PROFILE_MOCK_DATA: ProfileData = {
    user: {
        name: "Акакій Нечіпайко",
        email: "example@gmail.com",
        totalScore: 80,
        scenariosCompleted: 32,
        lastActivityDate: "26.02.2026",
        lastCompletedScenario: "Симуляція фішингу. Рівень 2",
    },
    activity: [
        { month: "Dec", value: 50 },
        { month: "Jan", value: 20 },
        { month: "Feb", value: 180 },
        { month: "Mar", value: 170 },
        { month: "Apr", value: 170 },
        { month: "May", value: 75 },
        { month: "Jun", value: 150 },
        { month: "Jul", value: 85 },
        { month: "Aug", value: 20 },
        { month: "Sep", value: 180 },
        { month: "Oct", value: 120 },
        { month: "Nov", value: 150 },
    ],
};
