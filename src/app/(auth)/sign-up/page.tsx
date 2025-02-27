"use client";

import React from 'react'
import PageWrapper from '@/components/PageWrapper'
import Link from 'next/link'

const SignUp = () => {
  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-[#1D232A]/80 p-8 rounded-lg backdrop-blur-sm w-full max-w-md">
          <h1 className="text-4xl font-bold mb-6 text-center">Create Account</h1>
          
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2 bg-[#2A323C] p-3 rounded-lg hover:bg-[#2A323C]/80 transition-colors">
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-[#2A323C] p-3 rounded-lg hover:bg-[#2A323C]/80 transition-colors">
              <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5" />
              Continue with Facebook
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1D232A]/80 text-gray-400">OR</span>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 bg-[#2A323C] rounded-lg border border-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 bg-[#2A323C] rounded-lg border border-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 bg-[#2A323C] rounded-lg border border-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-center text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-yellow-500 hover:text-yellow-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}

export default SignUp
