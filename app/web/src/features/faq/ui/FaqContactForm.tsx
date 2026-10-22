"use client";

import { Send, CheckCircle2, AlertCircle, RotateCcw } from "lucide-react";
import Input from "@/shared/components/ui/Input";
import Select from "@/shared/components/ui/Select";
import Textarea from "@/shared/components/ui/Textarea";
import Button from "@/shared/components/ui/Button";
import {
  FaqContactFormProps,
  CONTACT_TOPIC_OPTIONS,
} from "../types/faq.types";
import { useContactForm } from "../hooks/useContactForm";

export default function FaqContactForm(props: FaqContactFormProps) {
  const { className = "" } = props;
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSuccess,
    submittedData,
    errorMessage,
    onSubmit,
    handleReset,
  } = useContactForm(props);

  const topicLabel =
    CONTACT_TOPIC_OPTIONS.find((t) => t.value === submittedData?.topic)?.label ||
    "General Inquiry";

  if (isSuccess) {
    return (
      <div
        className={`bg-surface border border-warm-gray rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col items-center text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-pale-sage text-forest dark:text-sage flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-charcoal">
          Message Sent Successfully
        </h3>
        <p className="mt-2 text-sm text-muted-gray max-w-md leading-relaxed">
          Thank you, <span className="font-semibold text-charcoal">{submittedData?.name}</span>.
          We have received your question regarding{" "}
          <span className="font-semibold text-charcoal">{topicLabel}</span> and will reply to{" "}
          <span className="font-semibold text-charcoal">{submittedData?.email}</span> within 24 hours.
        </p>

        <div className="mt-6 pt-6 border-t border-warm-gray w-full flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-2 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Send Another Message</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-surface border border-warm-gray rounded-2xl p-6 sm:p-8 shadow-xs ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-charcoal">
          Send us a message
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted-gray leading-relaxed">
          Fill out the details below and our team will get back to you shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Your Name"
            placeholder="Jane Doe"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <Select
          label="Inquiry Topic"
          options={[...CONTACT_TOPIC_OPTIONS]}
          error={errors.topic?.message}
          {...register("topic")}
        />

        <Textarea
          label="Your Message"
          rows={4}
          placeholder="How can we assist you with your wardrobe?"
          error={errors.message?.message}
          {...register("message")}
        />

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="gap-2 sm:self-start"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </Button>
          <span className="text-xs text-muted-gray">
            Response time: &lt; 24 hours
          </span>
        </div>
      </form>
    </div>
  );
}
