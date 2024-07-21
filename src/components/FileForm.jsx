import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DownloadCloudIcon, DownloadIcon, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const imageSchema = z.object({
  file: z
    .instanceof(File)
    .refine(file => file.size > 0, { message: "File cannot be empty" })
    .refine(file => file.type.startsWith("image/"), {
      message: "Invalid file type. Only image files are allowed.",
    })
    .refine(file => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    }), // 5MB limit
  fileType: z.string(),
});

const ImageUpload = () => {
  const form = useForm({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      file: null,
      fileType: "png",
    },
  });

  const webImageFormats = [
    "jpeg",
    "png",
    "gif",
    "svg",
    "webp",
    "avif",
    "bmp",
    "tiff",
    "heif/heic",
  ];

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState("");

  const onSubmit = async data => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("format", data.fileType);

    try {
      const response = await fetch(import.meta.env.VITE_REACT_API, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setConvertedFileUrl(url);
      } else {
        console.error("Conversion failed.");
      }
    } catch (error) {
      toast.error("Try another convertion");
      console.error("Error submitting the form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    form.setValue("file", selectedFile);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="flex gap-7">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={e => {
                      handleFileChange(e);
                      field.onChange(e.target.files[0]); // Ensure only the file is passed
                    }}
                  />
                </FormControl>
                <FormDescription>Please upload any image file.</FormDescription>
                {form.formState.errors.file && (
                  <FormMessage>
                    {form.formState.errors.file.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fileType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select File Type</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="fileType"
                    render={({ field }) => (
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select file type" />
                        </SelectTrigger>
                        <SelectContent>
                          {webImageFormats.map((format, index) => {
                            return (
                              <SelectItem key={index} value={format}>
                                {format}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormControl>
                {form.formState.errors.fileType && (
                  <FormMessage>
                    {form.formState.errors.fileType.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-7">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <div className="gap-2 flex items-center">
                {" "}
                <LoaderCircle className="rotate w-4 h-4" strokeWidth={1} />{" "}
                Converting..
              </div>
            ) : (
              <>
                <>Convert</>
              </>
            )}
          </Button>
          {convertedFileUrl && (
            <Button
              onClick={() => {
                const a = document.createElement("a");
                a.href = convertedFileUrl;
                a.download = `${file.name.split(".")[0]}.${form.getValues(
                  "fileType"
                )}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setConvertedFileUrl("");
                // setFile(null);
                // form.reset();
                toast.success("Downloaded");
              }}
              variant="outline"
            >
              <DownloadIcon className="w-4 h-4 mr-2" /> Download
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ImageUpload;
