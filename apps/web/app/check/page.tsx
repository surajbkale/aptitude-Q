"use client"

import { Input } from '@repo/ui/input'
import { Button } from '@repo/ui/button'
import { useState } from 'react';
import { ClapperboardIcon, MailIcon, SearchIcon, UserIcon } from 'lucide-react';

// Demo component
const InputDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    search: '',
    message: '',
    website: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleClearSearch = (): void => {
    setFormData(prev => ({ ...prev, search: '' }));
  };

  const validateForm = (): void => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Generic Input Component (TypeScript)</h1>
        
        {/* Variants */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input type='text' variant="default" placeholder="Default variant" className='text-black' />
            <Input type='text' variant="filled" placeholder="Filled variant" />
            <Input type='text' variant="outline" placeholder="Outline variant" />
            <Input type='text' variant="underline" placeholder="Underline variant" />
            <Input type='text' variant="gradient" placeholder="Gradient variant" />
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sizes</h2>
          <div className="space-y-4">
            <Input type='text' size="xs" placeholder="Extra Small" />
            <Input type='text' size="sm" placeholder="Small" />
            <Input type='text' size="md" placeholder="Medium" />
            <Input type='text' size="lg" placeholder="Large" />
            <Input type='text' size="xl" placeholder="Extra Large" />
          </div>
        </div>

        {/* With Labels and Helper Text */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">With Labels & Helper Text</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              type='text'
              label="Full Name"
              placeholder="Enter your full name"
              helperText="This will be displayed on your profile"
              required
            />
            <Input 
              label="Bio"
              type="textarea"
              placeholder="Tell us about yourself..."
              helperText="Maximum 500 characters"
              rows={4}
            />
          </div>
        </div>

        {/* Input Types */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Input Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input type="text" placeholder="Text input" />
            <Input type="email" placeholder="Email input" />
            <Input type="password" placeholder="Password input" />
            <Input type="number" placeholder="Number input" />
            <Input type="tel" placeholder="Phone input" />
            <Input type="url" placeholder="URL input" />
            <Input type="search" placeholder="Search input" />
          </div>
        </div>

        {/* With Icons */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">With Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              type='text'
              leftIcon={<UserIcon />} 
              placeholder="Username"
              label="Username"
            />
            <Input 
              leftIcon={<MailIcon />} 
              type="email"
              placeholder="your@email.com"
              label="Email Address"
            />
            <Input 
              leftIcon={<SearchIcon />}
              rightIcon={formData.search ? <ClapperboardIcon /> : undefined}
              type="search"
              placeholder="Search..."
              value={formData.search}
              onChange={handleInputChange('search')}
              onRightIconClick={handleClearSearch}
              label="Search"
            />
          </div>
        </div>

        {/* States */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input type='text' placeholder="Normal state" label="Normal" />
            <Input type='text' placeholder="Disabled state" label="Disabled" disabled />
            <Input type='text' 
              placeholder="With error" 
              label="With Error" 
              error="This field is required"
            />
            <Input type='text' 
              placeholder="Success state" 
              label="Success State"
              className="border-green-500 focus:border-green-500 focus:ring-green-200"
              helperText="Looks good!"
            />
          </div>
        </div>

        {/* Form Example */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Complete Form Example</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input type='text'
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={errors.name}
                required
                leftIcon={<UserIcon />}
                fullWidth
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                required
                leftIcon={<MailIcon />}
                fullWidth
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={errors.password}
                required
                helperText="Minimum 6 characters"
                fullWidth
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                fullWidth
              />
              <Input
                label="Website"
                type="url"
                placeholder="https://yourwebsite.com"
                value={formData.website}
                onChange={handleInputChange('website')}
                helperText="Optional"
                fullWidth
                className="md:col-span-2"
              />
              <Input
                label="Message"
                type="textarea"
                placeholder="Tell us more about your requirements..."
                value={formData.message}
                onChange={handleInputChange('message')}
                rows={4}
                helperText="Optional message"
                fullWidth
                className="md:col-span-2"
                resize={false}
              />
            </div>
            
            <div className="mt-6 flex gap-4">
              <button
                type="button"
                onClick={validateForm}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200 font-medium"
              >
                Validate Form
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    search: '',
                    message: '',
                    website: '',
                    phone: '',
                  });
                  setErrors({});
                }}
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputDemo;