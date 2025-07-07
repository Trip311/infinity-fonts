import { GetAllIconsFromS3 } from "../repositories/icons.repository";
export async function getIconsFromS3() {
    return await GetAllIconsFromS3();
}