import fs from 'fs';
import path from 'path';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RestaurantClient from './RestaurantClient';
import { CommunityResource } from "../../types/resource";

async function getRestaurantResources(): Promise<CommunityResource[]> {
    const filePath = path.join(process.cwd(), "app", "Northern Virginia Community Resources.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const allResources: CommunityResource[] = JSON.parse(fileContents);
    return allResources.filter(resource => resource.category === "Restaurants");
}

export default async function RestaurantsCategoryPage() {
    const resources = await getRestaurantResources();

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 overflow-x-hidden">
            <Navbar />

            <main className="flex-grow">
                <RestaurantClient resources={resources} />
            </main>

            <Footer />
        </div>
    );
}
