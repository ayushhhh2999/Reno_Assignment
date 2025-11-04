import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2, Plus } from "lucide-react";

interface SuccessCardProps {
  schoolData: any;
  onAddAnother: () => void;
}

const SuccessCard = ({ schoolData, onAddAnother }: SuccessCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-soft border-border/50 animate-scale-in">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-accent/30">
            <CheckCircle2 className="w-16 h-16 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          School added successfully 🎉
        </h2>
        <p className="text-muted-foreground text-lg">
          The school has been registered in the system
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-xl overflow-hidden border-2 border-border shadow-card">
          {schoolData.imageUrl && (
            <img
              src={schoolData.imageUrl}
              alt={schoolData.name}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6 bg-card">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {schoolData.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {schoolData.email && (
                <div>
                  <span className="font-medium text-muted-foreground">Email:</span>
                  <p className="text-foreground">{schoolData.email}</p>
                </div>
              )}
              {schoolData.contact && (
                <div>
                  <span className="font-medium text-muted-foreground">Contact:</span>
                  <p className="text-foreground">{schoolData.contact}</p>
                </div>
              )}
              {schoolData.city && (
                <div>
                  <span className="font-medium text-muted-foreground">City:</span>
                  <p className="text-foreground">{schoolData.city}</p>
                </div>
              )}
              {schoolData.state && (
                <div>
                  <span className="font-medium text-muted-foreground">State:</span>
                  <p className="text-foreground">{schoolData.state}</p>
                </div>
              )}
              {schoolData.address && (
                <div className="md:col-span-2">
                  <span className="font-medium text-muted-foreground">Address:</span>
                  <p className="text-foreground">{schoolData.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={onAddAnother}
          className="w-full h-12 text-base font-medium shadow-soft hover:shadow-lg transition-all"
          variant="outline"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Another School
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
