"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  ContactFormData,
  FaqContactFormProps,
} from "../types/faq.types";

export function useContactForm({
  selectedTopic,
  onSuccess: externalSuccess,
}: Partial<FaqContactFormProps> = {}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: selectedTopic || "general",
      message: "",
    },
  });

  useEffect(() => {
    if (selectedTopic) {
      setValue("topic", selectedTopic, { shouldValidate: true });
    }
  }, [selectedTopic, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      setErrorMessage(null);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmittedData(data);
      setIsSuccess(true);
      reset({
        name: "",
        email: "",
        topic: selectedTopic || "general",
        message: "",
      });
      if (externalSuccess) {
        externalSuccess(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Unable to send your message. Please try again later.");
      }
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmittedData(null);
    setErrorMessage(null);
    reset({
      name: "",
      email: "",
      topic: selectedTopic || "general",
      message: "",
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSuccess,
    submittedData,
    errorMessage,
    onSubmit,
    handleReset,
  };
}
