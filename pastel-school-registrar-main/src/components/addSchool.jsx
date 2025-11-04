import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, School } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SchoolFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email: string;
  image: File | null;
}

interface SchoolFormProps {
  onSuccess: (data: any) => void;
}

const SchoolForm = ({ onSuccess }: SchoolFormProps) => {
  const [formData, setFormData] = useState<SchoolFormData>({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.image) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload an image.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // First, upload image to Supabase Storage
      const fileExt = formData.image.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('school-images')
        .upload(filePath, formData.image);

      if (uploadError) {
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      // Get public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('school-images')
        .getPublicUrl(filePath);

      // Now send school data with image URL to backend
      const response = await axios.post("http://localhost:5000/api/schools/add/", {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        contact: formData.contact,
        email_id: formData.email,
        image: publicUrl,
      });

      onSuccess(response.data);
      
      // Reset form
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        contact: "",
        email: "",
        image: null,
      });
      setImagePreview(null);
      
    } catch (error: any) {
      console.error("Error uploading school:", error);
      toast({
        title: "Oops! Something went wrong",
        description: error.response?.data?.message || error.message || "Failed to add school. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card border-border/50 animate-fade-in">
      <CardHeader className="space-y-3 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <School className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Add New School</CardTitle>
            <CardDescription className="text-base">
              Fill in the details to register a new school
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                School Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter school name"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter contact email"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="text-sm font-medium">
                Contact Number
              </Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Enter contact number"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                City
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-medium">
                State
              </Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter state"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium">
              School Image *
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="h-11 cursor-pointer"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border-2 border-border shadow-sm"
                />
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-base font-medium shadow-soft hover:shadow-lg transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Upload School Info 💾
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SchoolForm;
