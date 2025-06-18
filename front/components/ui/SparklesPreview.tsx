'use client';
import React from 'react';
import { SparklesCore } from '@/components/ui/sparkles';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SquareArrowOutUpRight } from 'lucide-react';

export function SparklesPreview() {
  return (
    <div className='h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md'>
      <div className='flex items-center justify-center z-20 mb-4'>
        <h1 className='text-5xl md:text-7xl font-bold text-white flex items-center gap-x-2 md:gap-x-4'>
          <span>C</span>
          <div className='w-10 h-10 md:w-16 md:h-16'>
            <div
              className='w-full h-full [animation:spin_10s_linear_infinite]'
              style={{
                background: 'linear-gradient(135deg, #FF0040 0%, #FF1744 10%, #FF6B35 20%, #F7931E 30%, #FFD23F 40%, #ADFF2F 50%, #06FFA5 60%, #00CED1 70%, #3D5AFE 80%, #8E24AA 90%, #FF0066 100%)',
                WebkitMaskImage: 'url(/companion-logo.svg)',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskImage: 'url(/companion-logo.svg)',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain',
              }}
            />
          </div>
          <span>M P A N I O N</span>
        </h1>
      </div>
      <div className='w-[40rem] h-40 relative'>
        {/* Gradients */}
        <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
        <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
        <div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
        <div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />

        {/* Core component */}
        <SparklesCore background='transparent' minSize={0.4} maxSize={1} particleDensity={1200} className='w-full h-full' particleColor='#FFFFFF' />

        {/* Radial Gradient to prevent sharp edges */}
        <div className='absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]'></div>
      </div>
      <div className='flex z-20 mt-8'>
        <div className='inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse'>
          <Link href='/login' passHref legacyBehavior>
            <Button asChild className='rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10' variant='outline'>
              <a>Sign in</a>
            </Button>
          </Link>
          <Link href='/login' passHref legacyBehavior>
            <Button asChild className='rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10' variant='outline' size='icon' aria-label='Open link'>
              <a>
                <SquareArrowOutUpRight size={16} strokeWidth={2} aria-hidden='true' />
              </a>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SparklesPreviewDark() {
  return (
    <div className='h-[40rem] relative w-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden rounded-md'>
      <div className='w-full absolute inset-0 h-screen'>
        <SparklesCore id='tsparticlesfullpage' background='transparent' minSize={0.6} maxSize={1.4} particleDensity={100} className='w-full h-full' particleColor='#FFFFFF' speed={1} />
      </div>
      <h1 className='md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20'>Build faster</h1>
    </div>
  );
}

export function SparklesPreviewColorful() {
  return (
    <div className='h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md'>
      <div className='w-full absolute inset-0 h-screen'>
        <SparklesCore id='tsparticlescolorful' background='transparent' minSize={0.6} maxSize={1.4} particleDensity={100} className='w-full h-full' particleColor='#00ff00' speed={0.5} />
      </div>
      <div className='flex flex-col items-center justify-center gap-4 relative z-20'>
        <h1 className='md:text-7xl text-3xl lg:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>The Future</h1>
        <p className='text-neutral-300 cursor-default text-center'>is brighter than you think</p>
      </div>
    </div>
  );
}
