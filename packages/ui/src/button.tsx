import React, { ReactNode, ButtonHTMLAttributes } from 'react';

// Define the available button variants
type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'danger' 
  | 'warning' 
  | 'info' 
  | 'outline' 
  | 'ghost' 
  | 'link';

// Define the available button sizes
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Define the button props interface
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

// Loading spinner component
const LoadingSpinner: React.FC = () => (
  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  // Base button styles
  const baseStyles: string = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles mapping
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500 active:from-indigo-800 active:to-purple-800',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 active:bg-yellow-800',
    info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500 active:bg-cyan-800',
    outline: 'border-2 border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50 focus:ring-indigo-500 active:bg-indigo-100',
    ghost: 'text-indigo-600 bg-transparent hover:bg-indigo-50 focus:ring-indigo-500 active:bg-indigo-100',
    link: 'text-indigo-600 bg-transparent hover:underline focus:ring-indigo-500 p-0 h-auto',
  };

  // Size styles mapping
  const sizes: Record<ButtonSize, string> = {
    xs: 'px-2 py-1 text-xs rounded-full',
    sm: 'px-3 py-1.5 text-sm rounded-full',
    md: 'px-6 py-3 text-sm rounded-full',
    lg: 'px-8 py-4 text-base rounded-full',
    xl: 'px-10 py-5 text-lg rounded-full',
  };

  // Handle click events
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  // Combine all classes
  const buttonClasses: string = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

// Icon components with proper typing
const ChevronRight: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Download: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// Loading states type
interface LoadingStates {
  [key: string]: boolean;
}

// // Demo component with proper TypeScript typing
// const ButtonDemo: React.FC = () => {
//   const [loadingStates, setLoadingStates] = React.useState<LoadingStates>({});

//   const handleLoadingDemo = (buttonId: string): void => {
//     setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
//     setTimeout(() => {
//       setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
//     }, 2000);
//   };

//   const handleAlert = (message: string): void => {
//     alert(message);
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Generic Button Component (TypeScript)</h1>
        
//         {/* Variants */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Variants</h2>
//           <div className="flex flex-wrap gap-4">
//             <Button variant="primary">Primary</Button>
//             <Button variant="secondary">Secondary</Button>
//             <Button variant="success">Success</Button>
//             <Button variant="danger">Danger</Button>
//             <Button variant="warning">Warning</Button>
//             <Button variant="info">Info</Button>
//             <Button variant="outline">Outline</Button>
//             <Button variant="ghost">Ghost</Button>
//             <Button variant="link">Link</Button>
//           </div>
//         </div>

//         {/* Sizes */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Sizes</h2>
//           <div className="flex flex-wrap items-center gap-4">
//             <Button size="xs">Extra Small</Button>
//             <Button size="sm">Small</Button>
//             <Button size="md">Medium</Button>
//             <Button size="lg">Large</Button>
//             <Button size="xl">Extra Large</Button>
//           </div>
//         </div>

//         {/* States */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">States</h2>
//           <div className="flex flex-wrap gap-4">
//             <Button>Normal</Button>
//             <Button disabled>Disabled</Button>
//             <Button 
//               loading={loadingStates.loading1 || false}
//               onClick={() => handleLoadingDemo('loading1')}
//             >
//               {loadingStates.loading1 ? 'Loading...' : 'Click for Loading'}
//             </Button>
//           </div>
//         </div>

//         {/* With Icons */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">With Icons</h2>
//           <div className="flex flex-wrap gap-4">
//             <Button leftIcon={<Download />}>Download</Button>
//             <Button rightIcon={<ChevronRight />}>Next</Button>
//             <Button 
//               variant="outline" 
//               leftIcon={<Download />}
//               rightIcon={<ChevronRight />}
//             >
//               Both Icons
//             </Button>
//           </div>
//         </div>

//         {/* Full Width */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Full Width</h2>
//           <div className="max-w-md">
//             <Button fullWidth variant="primary" className="mb-2">
//               Full Width Primary
//             </Button>
//             <Button fullWidth variant="outline">
//               Full Width Outline
//             </Button>
//           </div>
//         </div>

//         {/* Interactive Examples */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibent text-gray-800 mb-4">Interactive Examples</h2>
//           <div className="flex flex-wrap gap-4">
//             <Button 
//               variant="success"
//               onClick={() => handleAlert('Success button clicked!')}
//             >
//               Click Me
//             </Button>
//             <Button 
//               variant="danger"
//               loading={loadingStates.delete || false}
//               onClick={() => handleLoadingDemo('delete')}
//             >
//               {loadingStates.delete ? 'Deleting...' : 'Delete Item'}
//             </Button>
//             <Button 
//               variant="info"
//               leftIcon={<Download />}
//               loading={loadingStates.download || false}
//               onClick={() => handleLoadingDemo('download')}
//             >
//               {loadingStates.download ? 'Downloading...' : 'Download File'}
//             </Button>
//           </div>
//         </div>

//         {/* Custom Styling */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Custom Styling</h2>
//           <div className="flex flex-wrap gap-4">
//             <Button 
//               variant="primary"
//               className="shadow-lg transform hover:scale-105"
//             >
//               Custom Hover Effect
//             </Button>
//             <Button 
//               variant="outline"
//               className="border-purple-500 text-purple-500 hover:bg-purple-50"
//             >
//               Custom Colors
//             </Button>
//           </div>
//         </div>

//         {/* Type Safety Examples */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Type Safety Examples</h2>
//           <div className="flex flex-wrap gap-4">
//             <Button type="submit" variant="success">
//               Submit Form
//             </Button>
//             <Button type="reset" variant="secondary">
//               Reset Form
//             </Button>
//             <Button 
//               type="button"
//               variant="primary"
//               onClick={(e) => console.log('Button clicked:', e.currentTarget)}
//             >
//               Log Event
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ButtonDemo;

// Export the Button component and types for use in other files
export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };