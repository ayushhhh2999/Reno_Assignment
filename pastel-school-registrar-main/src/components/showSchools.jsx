import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { School, Loader2, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: string;
}

interface SchoolsListProps {
  onAddNew: () => void;
}

const SchoolsList = ({ onAddNew }: SchoolsListProps) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/schools/list/");
      setSchools(response.data);
    } catch (error: any) {
      console.error("Error fetching schools:", error);
      toast({
        title: "Failed to load schools",
        description: error.response?.data?.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <School className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Schools Directory</h1>
            <p className="text-muted-foreground">
              {schools.length} school{schools.length !== 1 ? "s" : ""} registered
            </p>
          </div>
        </div>
        <Button onClick={onAddNew} className="shadow-soft">
          <Plus className="mr-2 h-5 w-5" />
          Add New School
        </Button>
      </div>

      {schools.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <School className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No schools found</h3>
            <p className="text-muted-foreground mb-6">Get started by adding your first school</p>
            <Button onClick={onAddNew}>
              <Plus className="mr-2 h-5 w-5" />
              Add School
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <Card key={school.id} className="overflow-hidden border-border/50 shadow-card hover:shadow-lg transition-all">
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={school.image}
                  alt={school.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl line-clamp-1">{school.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {school.city && school.state && (
                  <div>
                    <span className="font-medium text-muted-foreground">Location:</span>
                    <p className="text-foreground">{school.city}, {school.state}</p>
                  </div>
                )}
                {school.address && (
                  <div>
                    <span className="font-medium text-muted-foreground">Address:</span>
                    <p className="text-foreground line-clamp-2">{school.address}</p>
                  </div>
                )}
                {school.contact && (
                  <div>
                    <span className="font-medium text-muted-foreground">Contact:</span>
                    <p className="text-foreground">{school.contact}</p>
                  </div>
                )}
                {school.email_id && (
                  <div>
                    <span className="font-medium text-muted-foreground">Email:</span>
                    <p className="text-foreground truncate">{school.email_id}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SchoolsList;
