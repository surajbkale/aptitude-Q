import React, { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useState } from 'react';

// Define the available input variants
type InputVariant = 'default' | 'filled' | 'outline' | 'underline' | 'gradient';

// Define the available input sizes
type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Define input types
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea';

// Base input props interface
interface BaseInputProps {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
}

type StandardInputType = Exclude<InputType, 'textarea'>;

// Standard input props
interface StandardInputProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type: Exclude<InputType, 'textarea'>;
}

// Textarea props
interface TextareaProps extends BaseInputProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'type'> {
  type: 'textarea';
  rows?: number;
  resize?: boolean;
}

// Union type for all input props
type InputProps = StandardInputProps | TextareaProps;

// Type guard to check if props are for textarea
const isTextareaProps = (props: InputProps): props is TextareaProps => {
  return props.type === 'textarea';
};

// Eye icon for password visibility toggle
const EyeIcon: React.FC<{ isOpen?: boolean }> = ({ isOpen = false }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {isOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
      </>
    )}
  </svg>
);

// Search icon
const SearchIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Mail icon
const MailIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// User icon
const UserIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Clear icon
const ClearIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
// ...existing code...

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>((props, ref) => {
  const {
    variant = 'default',
    size = 'md',
    label,
    placeholder,
    helperText,
    error,
    disabled = false,
    required = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className = '',
    onLeftIconClick,
    onRightIconClick,
    type,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Handle password visibility toggle
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  // Base input styles
  const baseStyles: string = 'transition-all duration-200 focus:outline-none text-black placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed';


  // Variant styles mapping
  const variants: Record<InputVariant, string> = {
    default: 'border border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
    filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-500',
    outline: 'border-2 border-gray-300 bg-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
    underline: 'border-0 border-b-2 border-gray-300 bg-transparent rounded-none focus:border-indigo-500 focus:ring-0',
    gradient: 'border-2 border-transparent bg-gradient-to-r from-indigo-50 to-purple-50 focus:from-indigo-100 focus:to-purple-100 focus:border-gradient-to-r focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
  };

  // Size styles mapping
  const sizes: Record<InputSize, string> = {
    xs: 'px-2 py-1 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-xl',
  };

  // Label styles based on size
  const labelSizes: Record<InputSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  // Helper text styles based on size
  const helperSizes: Record<InputSize, string> = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base',
  };

  // Determine actual input type for password toggle
  const actualType = type === 'password' && showPassword ? 'text' : type;

  // Handle focus events
  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setIsFocused(true);
    if (isTextareaProps(props)) {
      props.onFocus?.(e as React.FocusEvent<HTMLTextAreaElement>);
    } else {
      props.onFocus?.(e as React.FocusEvent<HTMLInputElement>);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setIsFocused(false);
    if (isTextareaProps(props)) {
      props.onBlur?.(e as React.FocusEvent<HTMLTextAreaElement>);
    } else {
      props.onBlur?.(e as React.FocusEvent<HTMLInputElement>);
    }
  };

  // Combine classes
  const inputClasses: string = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
    ${leftIcon ? 'pl-10' : ''}
    ${(rightIcon || type === 'password') ? 'pr-10' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Render the input element
    const renderInput = () => {
    if (isTextareaProps(props)) {
      const { rows = 3, resize = true, ...textareaProps } = rest as TextareaProps;
      return (
        <textarea
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          className={`${inputClasses} ${!resize ? 'resize-none' : 'resize-y'}`}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...textareaProps}
        />
      );
    } else {
      return (
        <input
          ref={ref as React.ForwardedRef<HTMLInputElement>}
          type={actualType}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...Object.fromEntries(Object.entries(rest as StandardInputProps).filter(([key]) => key !== 'type'))}
        />
      );
    }
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label className={`block font-medium text-gray-700 mb-1 ${labelSizes[size]} ${error ? 'text-red-700' : ''}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${onLeftIconClick ? 'cursor-pointer hover:text-gray-600' : ''}`}
            onClick={onLeftIconClick}
          >
            {leftIcon}
          </div>
        )}

        {/* Input Element */}
        {renderInput()}

        {/* Right Icon or Password Toggle */}
        {(rightIcon || type === 'password') && (
          <div 
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${(onRightIconClick || type === 'password') ? 'cursor-pointer hover:text-gray-600' : ''}`}
            onClick={type === 'password' ? togglePasswordVisibility : onRightIconClick}
          >
            {type === 'password' ? (
              <EyeIcon isOpen={showPassword} />
            ) : (
              rightIcon
            )}
          </div>
        )}
      </div>

      {/* Helper Text or Error */}
      {(helperText || error) && (
        <p className={`mt-1 ${helperSizes[size]} ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

// ...existing code...

Input.displayName = 'Input';

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
            <Input type='text' variant="default" placeholder="Default variant" />
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
              rightIcon={formData.search ? <ClearIcon /> : undefined}
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

// Export the Input component and types for use in other files
export { Input };
export type { InputProps, InputVariant, InputSize, InputType };