import { PROFILE_MOCK_DATA } from "../model/profile.mock";
import type { ProfileData } from "../model/profile.types";

export const getProfileData = async (): Promise<ProfileData> => {
    return PROFILE_MOCK_DATA;
};
