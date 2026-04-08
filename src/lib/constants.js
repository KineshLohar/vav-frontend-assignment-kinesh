import { Bookmark, BriefcaseBusiness, CirclePlus, CircleUserRound, LayoutDashboard, NotepadText, Settings } from "lucide-react";


export const SIDEBAR_ROUTES = [
    {
        id: 1,
        label: "Overview",
        route: "/dashboard",
        icon: LayoutDashboard
    },
    {
        id: 2,
        label: "Employers Profile",
        route: "/employers-profile",
        icon: CircleUserRound
    },
    {
        id: 3,
        label: "Post a Job",
        route: "/post-job",
        icon: CirclePlus
    },
    {
        id: 4,
        label: "My Jobs",
        route: "/jobs",
        icon: BriefcaseBusiness
    },
    {
        id: 5,
        label: "Saved Candidates",
        route: "/saved-candidates",
        icon: Bookmark
    },
    {
        id: 6,
        label: "Plans & Billing",
        route: "/plans-billing",
        icon: NotepadText
    },
    {
        id: 7,
        label: "Settings",
        route: "/settings",
        icon: Settings
    },
]