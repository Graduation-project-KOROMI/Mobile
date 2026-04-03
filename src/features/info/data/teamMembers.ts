import { infoAssets } from "@/src/constants/assets";
import type { TeamMember } from "@/src/shared/types/team";

export const teamMembers: TeamMember[] = [
  {
    name: "محمد ابو حسن",
    role: "مطور كرومي",
    avatarUri: infoAssets.team.memberPhoto,
    instagramUrl:
      "https://www.instagram.com/mabuhasan_tech?igsh=a242MW9jdXJlYnM3&utm_source=qr",
    facebookUrl: "https://www.facebook.com/mohammad.mohnad.31",
  },
  {
    name: "اسيد هلال",
    role: "عضو فريق كرومي",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
  {
    name: "شادي صبح",
    role: "عضو فريق كرومي",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
  {
    name: "وليد انور",
    role: "عضو فريق كرومي",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
  {
    name: "عمر ابو حجة",
    role: "عضو فريق كرومي",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
];
