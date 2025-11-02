import LaptopCard from "@/components/products/LaptopCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import EmptyState from "@/components/common/EmptyState";
import { LaptopsGridProps } from "@/lib/types";


export default function LaptopsGrid({ laptops, loading, error }: LaptopsGridProps) {
  return (
    <div className="min-h-[200px]">
      {loading ? (
        <LoadingSpinner message="Finding the best laptops for you..." size="lg" />
      ) : error ? (
        <div className="col-span-full py-12">
          <ErrorDisplay
            title="Unable to Load Products"
            message="We're experiencing temporary difficulties connecting to our servers. Our team is working to resolve this. Please try refreshing the page in a moment."
            actionButton={{
              text: "Refresh Page",
              onClick: () => window.location.reload()
            }}
          />
        </div>
      ) : laptops.length === 0 ? (
        <EmptyState
          icon="search"
          title="No Laptops Found"
          message="We couldn't find any laptops matching your criteria. Try adjusting your filters or check back later for new arrivals."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {laptops.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      )}
    </div>
  );
}

