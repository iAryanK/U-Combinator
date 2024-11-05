/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
import { formSchema } from "@/lib/validations";

const ProjectForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your project idea has been added successfully",
        });

        router.push(`/project/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="project-form">
      <div>
        <label htmlFor="title" className="project-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="project-form_input"
          required
          placeholder="project Title"
        />

        {errors.title && <p className="project-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="project-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="project-form_textarea"
          required
          placeholder="project Description"
        />

        {errors.description && (
          <p className="project-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="project-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="project-form_input"
          required
          placeholder="project Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="project-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="project-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="project-form_input"
          required
          placeholder="project Image URL"
        />

        {errors.link && <p className="project-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="project-form_label">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="project-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="rounded-full p-5 min-h-[70px] w-full font-bold text-lg border-2"
        variant="secondary"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default ProjectForm;
