import { useState } from "react";
import SchoolForm from "@/components/SchoolForm";
import SuccessCard from "@/components/SuccessCard";
import SchoolsList from "@/components/SchoolsList";
import { Button } from "@/components/ui/button";
import { List, Plus } from "lucide-react";

const Index = () => {
  const [successData, setSuccessData] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"form" | "list">("list");

  const handleSuccess = (data: any) => {
    setSuccessData(data);
  };

  const handleAddAnother = () => {
    setSuccessData(null);
    setViewMode("form");
  };

  const showList = () => {
    setSuccessData(null);
    setViewMode("list");
  };

  const showForm = () => {
    setSuccessData(null);
    setViewMode("form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            School Registration
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Welcome to the education management system. Register your school with ease
          </p>
          
          {!successData && (
            <div className="flex justify-center gap-4">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={showList}
                className="shadow-soft"
              >
                <List className="mr-2 h-5 w-5" />
                View Schools
              </Button>
              <Button
                variant={viewMode === "form" ? "default" : "outline"}
                onClick={showForm}
                className="shadow-soft"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add School
              </Button>
            </div>
          )}
        </header>

        <main>
          {successData ? (
            <SuccessCard schoolData={successData} onAddAnother={handleAddAnother} />
          ) : viewMode === "list" ? (
            <SchoolsList onAddNew={showForm} />
          ) : (
            <SchoolForm onSuccess={handleSuccess} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
