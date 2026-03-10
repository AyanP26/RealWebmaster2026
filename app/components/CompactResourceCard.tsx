import { CommunityResource } from "../types/resource";
import { MapPin, Phone, Globe, Clock, CheckCircle2 } from "lucide-react";

interface CompactResourceCardProps {
    resource: CommunityResource;
}

export default function CompactResourceCard({ resource }: CompactResourceCardProps) {
    return (
        <div className="w-80 min-w-[20rem] sm:w-96 sm:min-w-[24rem] h-full bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 flex flex-col flex-shrink-0 snap-start">

            {/* Header: Name and Description */}
            <div className="mb-4 flex-grow">
                <h3 className="text-xl font-bold text-text-dark leading-tight mb-2 line-clamp-1" title={resource.name}>
                    {resource.name}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2" title={resource.short_description}>
                    {resource.short_description}
                </p>
            </div>

            {/* Middle: Details (Location & Hours) */}
            <div className="space-y-3 mb-6 bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2.5 mt-0.5 text-accent-orange flex-shrink-0" />
                    <div>
                        <span className="block leading-tight font-medium text-gray-800">{resource.address}</span>
                        <span className="block leading-tight mt-0.5">{resource.city}, VA {resource.zip_code}</span>
                    </div>
                </div>

                {resource.hours_of_operation && (
                    <div className="flex items-start text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2.5 mt-0.5 text-primary-teal flex-shrink-0" />
                        <span className="leading-tight">{resource.hours_of_operation}</span>
                    </div>
                )}
            </div>

            {/* Bottom Section: Tags and Actions */}
            <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                    {resource.is_free_service && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Free Service
                        </span>
                    )}
                    {resource.languages_supported && resource.languages_supported.map((lang, idx) => {
                        if (lang === "English") return null; // Save space by omitting default
                        return (
                            <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                                {lang}
                            </span>
                        )
                    })}
                </div>

                <div className="flex items-center gap-3">
                    {resource.website && (
                        <a
                            href={resource.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center bg-gray-50 hover:bg-primary-teal hover:text-white text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            Visit
                        </a>
                    )}
                    {resource.phone && (
                        <a
                            href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`}
                            className="flex-1 flex items-center justify-center bg-gray-50 hover:bg-accent-orange hover:text-white text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
                        >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
