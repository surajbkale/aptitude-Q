"use client";

import React, { useState } from "react";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { MailsIcon } from "lucide-react";

// Icons
const UserIcon: React.FC = () => (
  <svg className="w-5 h-5 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg className="w-5 h-5 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Min 6 characters";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Signup Success ✅", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange("name")}
            error={errors.name}
            required
            fullWidth
          />
          <Input
            type="email"
            label="Email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
            rightIcon={<MailsIcon />}
            required
            fullWidth
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange("password")}
            error={errors.password}
            required
            fullWidth
          />
          <Button type="submit" variant="primary" fullWidth>
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/sign-in" className="text-indigo-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
