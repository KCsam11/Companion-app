'use client';

import * as React from 'react';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SelectPrimitive from '@radix-ui/react-select';
import { useRouter } from 'next/navigation';
import { BarChart, Code, Eye, EyeOff, User, CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { JSX, SVGProps } from 'react';
// import { Toaster } from '@/components/ui/sonner'; // adapte le chemin selon ton projet
import { toast } from 'sonner';
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
      destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
      outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
      secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-9 px-4 py-2 has-[>svg]:px-3',
      sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
      lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
      icon: 'size-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className)} {...props} />);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />);
CardHeader.displayName = 'CardHeader';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />);
CardFooter.displayName = 'CardFooter';

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn('peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground', className)} {...props}>
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <CheckIcon className='h-4 w-4' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => {
  return <input type={type} className={cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)} ref={ref} {...props} />;
});
Input.displayName = 'Input';

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(({ className, ...props }, ref) => <LabelPrimitive.Root ref={ref} className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)} {...props} />);
Label.displayName = LabelPrimitive.Root.displayName;

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} className={cn('flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1', className)} {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className='h-4 w-4 opacity-50' />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content ref={ref} className={cn('relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className)} position={position} {...props}>
      <SelectPrimitive.Viewport className={cn('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]')}>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={cn('relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className)} {...props}>
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className='h-4 w-4' />
      </SelectPrimitive.ItemIndicator>
    </span>
    {children}
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const Logo = (props: React.HTMLAttributes<HTMLImageElement>) => <img src='/companion-logo.svg' alt='Companion Logo' className='h-12 w-12' {...props} />;

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [region, setRegion] = useState('europe');
  const [playerName, setPlayerName] = useState('');
  const [tag, setTag] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false); // <-- Ajout

  const handleCreateAccount = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const newErrors: { [key: string]: string } = {};

    if (!playerName) newErrors.playerName = 'Player name is required.';
    if (!tag) newErrors.tag = 'Tag is required.';
    if (!username) newErrors.username = 'Username is required.';
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!password) newErrors.password = 'Password is required.';
    if (!terms) newErrors.terms = 'You must accept the terms and conditions.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false); // Ne pas oublier en cas d'erreur

      return; // Stop if there are errors
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region,
          playerName,
          tag,
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log('Account created successfully:');
        const sendCodeResponse = await fetch('/api/send-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        if (sendCodeResponse.ok) {
          router.push(`/confirm-email?email=${encodeURIComponent(email)}`);
        } else {
          const errorData = await sendCodeResponse.json();
          toast.error(errorData.error || 'Failed to send verification code');
          setErrors({ api: errorData.error || 'Failed to send verification code' });
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || errorData.message || 'Failed to create account');
        setErrors({ api: errorData.error || errorData.message || 'Failed to create account' });
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
      setErrors({ api: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false); // <-- FIN du chargement
    }
  };

  const getRegionDisplay = (value: string) => {
    switch (value) {
      case 'europe':
        return <span>Europe West</span>;
      case 'north-america':
        return <span>North America</span>;
      case 'korean':
        return <span>Korean</span>;
      default:
        return <span>Select region</span>;
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md'>
        <Card className='border-none shadow-lg pb-0'>
          <CardHeader className='flex flex-col items-center space-y-1.5 pb-4 pt-6'>
            <Logo className='w-12 h-12' />
            <div className='space-y-0.5 flex flex-col items-center'>
              <h2 className='text-2xl font-semibold text-foreground'>Create an account</h2>
              <p className='text-muted-foreground'>Welcome! Create an account to get started.</p>
            </div>
          </CardHeader>
          <CardContent className='space-y-6 px-8'>
            <div className='space-y-2'>
              <Label htmlFor='region'>Région</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger id='region' className='text-white'>
                  {region ? getRegionDisplay(region) : <span className='text-muted-foreground'>Select region</span>}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='europe'>
                    <span>Europe West</span>
                  </SelectItem>
                  <SelectItem value='north-america'>
                    <span>North America</span>
                  </SelectItem>
                  <SelectItem value='korean'>
                    <span>Korean</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='playerName'>Riot ID</Label>
                <Input id='playerName' value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                {errors.playerName && <p className='text-sm text-red-500'>{errors.playerName}</p>}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='tag'>Tag</Label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground'>#</span>
                  <Input id='tag' className='pl-7' value={tag} onChange={(e) => setTag(e.target.value)} />
                </div>
                {errors.tag && <p className='text-sm text-red-500'>{errors.tag}</p>}
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <Input id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
              {errors.username && <p className='text-sm text-red-500'>{errors.username}</p>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email address</Label>
              <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <p className='text-sm text-red-500'>{errors.email}</p>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Input id='password' type={showPassword ? 'text' : 'password'} className='pr-10' value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <p className='text-sm text-red-500'>{errors.password}</p>}

                <Button type='button' variant='ghost' size='icon' className='absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                </Button>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox id='terms' checked={terms} onCheckedChange={(checked) => setTerms(Boolean(checked))} />
              <label htmlFor='terms' className='text-sm text-muted-foreground'>
                I agree to the{' '}
                <a href='#' className='text-primary hover:underline'>
                  Terms
                </a>{' '}
                and{' '}
                <a href='#' className='text-primary hover:underline'>
                  Conditions
                </a>
              </label>
            </div>
            {errors.terms && <p className='text-sm text-red-500'>{errors.terms}</p>}
            {errors.api && <p className='text-sm text-red-500'>{errors.api}</p>}
            <Button onClick={handleCreateAccount} className='w-full bg-primary text-primary-foreground'>
              Create free account
            </Button>{' '}
          </CardContent>
          <CardFooter className='flex justify-center border-t !py-4'>
            <p className='text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <a href='/login' className='text-primary hover:underline'>
                Sign in
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
``;
