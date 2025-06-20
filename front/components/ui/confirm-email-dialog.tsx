'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { OTPInput, SlotProps } from 'input-otp';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function Slot(props: SlotProps) {
  return <div className={cn('flex size-9 items-center justify-center rounded-lg border border-input bg-background font-medium text-foreground shadow-sm shadow-black/5 transition-shadow', { 'z-10 border border-ring ring-[3px] ring-ring/20': props.isActive })}>{props.char !== null && <div>{props.char}</div>}</div>;
}

export function ConfirmEmailDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [value, setValue] = useState('');
  const [hasGuessed, setHasGuessed] = useState<undefined | boolean>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (hasGuessed) {
      closeButtonRef.current?.focus();
    }
  }, [hasGuessed]);

  useEffect(() => {
    if (!isDialogOpen && hasGuessed) {
      router.push('/login');
    }
  }, [isDialogOpen, hasGuessed, router]);

  async function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault?.();
    setIsLoading(true);

    const email = searchParams.get('email');

    try {
      const response = await fetch('/api/verif-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: value, email: email }),
      });

      if (response.ok) {
        setHasGuessed(true);
      } else {
        setHasGuessed(false);
        setValue('');
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setHasGuessed(false);
      setValue('');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <div className='flex flex-col items-center gap-2'>
          <img src='/companion-logo.svg' alt='Companion Logo' className='h-8 w-8  [animation:spin_20s_linear_infinite]' />
          <DialogHeader>
            <DialogTitle className='sm:text-center'>{hasGuessed ? 'Code verified!' : 'Enter confirmation code'}</DialogTitle>
            <DialogDescription className='sm:text-center'>{hasGuessed ? 'Your code has been successfully verified.' : `Check your email and enter the code we sent you.`}</DialogDescription>
          </DialogHeader>
        </div>

        {hasGuessed ? (
          <div className='text-center'>
            <DialogClose asChild>
              <Button type='button' ref={closeButtonRef}>
                Close
              </Button>
            </DialogClose>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='flex justify-center'>
              <OTPInput
                id='cofirmation-code'
                ref={inputRef}
                value={value}
                onChange={setValue}
                containerClassName='flex items-center gap-3 has-[:disabled]:opacity-50'
                maxLength={4}
                onFocus={() => setHasGuessed(undefined)}
                render={({ slots }) => (
                  <div className='flex gap-2'>
                    {slots.map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                )}
                onComplete={onSubmit}
              />
            </div>
            {hasGuessed === false && (
              <p className='text-center text-xs text-muted-foreground' role='alert' aria-live='polite'>
                Invalid code. Please try again.
              </p>
            )}
            <p className='text-center text-sm'>
              <a className='underline hover:no-underline' href=''>
                Resend code
              </a>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
