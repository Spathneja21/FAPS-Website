"use client";

import { useState } from "react";

interface ContactFormValues {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface ContactFormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export function useContactForm() {
    const [values, setValues] = useState<ContactFormValues>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = (vals: ContactFormValues): ContactFormErrors => {
        const errs: ContactFormErrors = {};
        if (!vals.name || vals.name.trim().length < 2) {
            errs.name = "Name must be at least 2 characters";
        }
        if (!vals.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
            errs.email = "Please enter a valid email address";
        }
        if (!vals.message || vals.message.trim().length < 10) {
            errs.message = "Message must be at least 10 characters";
        }
        return errs;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const newValues = { ...values, [name]: value };
        setValues(newValues);
        if (touched[name]) {
            setErrors(validate(newValues));
        }
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors(validate(values));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const allTouched: Record<string, boolean> = {};
        Object.keys(values).forEach((k) => (allTouched[k] = true));
        setTouched(allTouched);

        const validationErrors = validate(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        setValues({ name: "", email: "", subject: "", message: "" });
        setTouched({});
        setErrors({});

        setTimeout(() => setIsSuccess(false), 5000);
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isSuccess,
    };
}
