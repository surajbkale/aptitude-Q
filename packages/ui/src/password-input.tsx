import React, { ReactNode, InputHTMLAttributes, forwardRef, useState } from 'react';

// Define the available input variants
type InputVariant = 'default' | 'filled' | 'outline' | 'underline' | 'gradient';

// Define the available input sizes
type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Password input props interface
interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
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
  className?: string;
  showStrengthMeter?: boolean;
}

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

// Lock icon
const LockIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// Password strength calculation
const calculatePasswordStrength = (password: string): { score: number; label: string; color: string } => {
  if (!password) return { score: 0, label: '', color: '' };
  
  let score = 0;
  let feedback = [];
  
  // Length check
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 10;
  
  // Character variety checks
  if (/[a-z]/.test(password)) score += 15;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;
  
  // Determine strength label and color
  if (score < 30) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score < 60) return { score, label: 'Fair', color: 'bg-yellow-500' };
  if (score < 80) return { score, label: 'Good', color: 'bg-blue-500' };
  return { score, label: 'Strong', color: 'bg-green-500' };
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
  variant = 'default',
  size = 'md',
  label,
  placeholder = 'Enter your password',
  helperText,
  error,
  disabled = false,
  required = false,
  fullWidth = false,
  leftIcon,
  className = '',
  showStrengthMeter = false,
  value = '',
  onChange,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Handle password visibility toggle
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  // Base input styles
  const baseStyles: string = `
    transition-all duration-200 
    focus:outline-none 
    text-gray-900 
    placeholder-gray-400 
    disabled:opacity-50 
    disabled:cursor-not-allowed
  `.trim().replace(/\s+/g, ' ');

  // Variant styles mapping
  const variants: Record<InputVariant, string> = {
    default: 'border border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
    filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-500',
    outline: 'border-2 border-gray-300 bg-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
    underline: 'border-0 border-b-2 border-gray-300 bg-transparent rounded-none focus:border-indigo-500 focus:ring-0',
    gradient: 'border-2 border-transparent bg-gradient-to-r from-indigo-50 to-purple-50 focus:from-indigo-100 focus:to-purple-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
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

  // Handle focus events
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Calculate password strength if enabled
  const passwordValue = typeof value === 'string' ? value : '';
  const strength = showStrengthMeter ? calculatePasswordStrength(passwordValue) : null;

  // Combine classes
  const inputClasses: string = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
    ${leftIcon ? 'pl-10' : ''}
    pr-10
    ${className}
  `.trim().replace(/\s+/g, ' ');

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
        {/* Password Input */}
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}

        {/* Eye Icon Toggle - Positioned inside input */}
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200 z-10"
          onClick={togglePasswordVisibility}
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <EyeIcon isOpen={showPassword} />
        </button>
      </div>

      {/* Password Strength Meter */}
      {showStrengthMeter && passwordValue && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className={`${helperSizes[size]} font-medium ${
              strength?.label === 'Weak' ? 'text-red-600' :
              strength?.label === 'Fair' ? 'text-yellow-600' :
              strength?.label === 'Good' ? 'text-blue-600' :
              'text-green-600'
            }`}>
              Password strength: {strength?.label}
            </span>
            <span className={`${helperSizes[size]} text-gray-500`}>
              {strength?.score}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${strength?.color}`}
              style={{ width: `${strength?.score}%` }}
            />
          </div>
        </div>
      )}

      {/* Helper Text or Error */}
      {(helperText || error) && (
        <p className={`mt-1 ${helperSizes[size]} ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

// Demo component
const PasswordInputDemo: React.FC = () => {
  const [passwords, setPasswords] = useState({
    basic: '',
    withStrength: '',
    withIcon: '',
    form: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePasswordChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPasswords(prev => ({
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

  const validatePasswords = (): void => {
    const newErrors: Record<string, string> = {};
    
    if (!passwords.form.trim()) {
      newErrors.form = 'Password is required';
    } else if (passwords.form.length < 8) {
      newErrors.form = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwords.form)) {
      newErrors.form = 'Password must contain uppercase, lowercase, and numbers';
    }
    
    setErrors(newErrors);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Password Input Component (TypeScript)</h1>
        
        {/* Basic Password Input */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Password Input</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              value={passwords.basic}
              onChange={handlePasswordChange('basic')}
            />
            <PasswordInput
              label="Password with Icon"
              placeholder="Enter password"
              leftIcon={<LockIcon />}
              value={passwords.withIcon}
              onChange={handlePasswordChange('withIcon')}
            />
          </div>
        </div>

        {/* Variants */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Variants</h2>
          <div className="space-y-4">
            <PasswordInput variant="default" placeholder="Default variant" />
            <PasswordInput variant="filled" placeholder="Filled variant" />
            <PasswordInput variant="outline" placeholder="Outline variant" />
            <PasswordInput variant="underline" placeholder="Underline variant" />
            <PasswordInput variant="gradient" placeholder="Gradient variant" />
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sizes</h2>
          <div className="space-y-4">
            <PasswordInput size="xs" placeholder="Extra Small" />
            <PasswordInput size="sm" placeholder="Small" />
            <PasswordInput size="md" placeholder="Medium" />
            <PasswordInput size="lg" placeholder="Large" />
            <PasswordInput size="xl" placeholder="Extra Large" />
          </div>
        </div>

        {/* Password Strength Meter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Password Strength Meter</h2>
          <div className="max-w-md">
            <PasswordInput
              label="Password with Strength Meter"
              placeholder="Create a strong password"
              helperText="Try using uppercase, lowercase, numbers, and special characters"
              showStrengthMeter
              value={passwords.withStrength}
              onChange={handlePasswordChange('withStrength')}
              leftIcon={<LockIcon />}
              fullWidth
            />
          </div>
        </div>

        {/* States */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PasswordInput label="Normal" placeholder="Normal state" />
            <PasswordInput label="Disabled" placeholder="Disabled state" disabled />
            <PasswordInput 
              label="With Error" 
              placeholder="Password with error"
              error="Password is too weak"
            />
            <PasswordInput 
              label="Required Field" 
              placeholder="Required password"
              required
              helperText="This field is required"
            />
          </div>
        </div>

        {/* Complete Form Example */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Form Validation Example</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm border max-w-md">
            <PasswordInput
              label="Create Password"
              placeholder="Enter a secure password"
              value={passwords.form}
              onChange={handlePasswordChange('form')}
              error={errors.form}
              required
              showStrengthMeter
              leftIcon={<LockIcon />}
              helperText="Must be at least 8 characters with mixed case and numbers"
              fullWidth
            />
            
            <div className="mt-6 flex gap-4">
              <button
                type="button"
                onClick={validatePasswords}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200 font-medium"
              >
                Validate
              </button>
              <button
                type="button"
                onClick={() => {
                  setPasswords({
                    basic: '',
                    withStrength: '',
                    withIcon: '',
                    form: '',
                  });
                  setErrors({});
                }}
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Usage Tips</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Click the eye icon to toggle password visibility</li>
              <li>• Use <code className="bg-gray-100 px-2 py-1 rounded">showStrengthMeter</code> to display password strength</li>
              <li>• The strength meter considers length, character variety, and complexity</li>
              <li>• All standard input props are supported (value, onChange, onFocus, etc.)</li>
              <li>• The component is fully accessible with proper ARIA labels</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordInputDemo;

// Export the PasswordInput component and types for use in other files
export { PasswordInput };
export type { PasswordInputProps, InputVariant, InputSize };