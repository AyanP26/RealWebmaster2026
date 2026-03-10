export interface CommunityResource {
    id: string;
    name: string;
    short_description: string;
    category: "Healthcare" | "Education" | "Food Assistance" | "Workforce Development" | "Housing" | "Legal Aid" | "Community Support" | "Other";
    tags?: string[];

    // Location
    address: string;
    city: string;
    zip_code: string;
    latitude?: number;
    longitude?: number;

    // Contact
    website?: string;
    phone?: string;
    email?: string;

    // Details
    hours_of_operation?: string;
    eligibility_requirements?: string;
    languages_supported?: string[];
    is_free_service: boolean;
}
