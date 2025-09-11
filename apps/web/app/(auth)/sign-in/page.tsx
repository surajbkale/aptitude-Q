"use client";

import React, { useState } from "react";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

// Icons
const MailIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Signin Success ✅", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            label="Email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
            required
            leftIcon={<MailIcon />}
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
            Sign In
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
