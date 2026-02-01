import { Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'

import { InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    inputType: string
    placeholder: string
    error?: string
}

export default function InputField({ label, inputType , placeholder, error, ...props }: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false)

    const isPasswordField = inputType === 'password'
    const currentInputType = isPasswordField && showPassword ? 'text' : inputType

    return (
        <div className="w-full max-w-md pb-2">
            <Field>
                <div className="flex items-center justify-between">
                    <Label className="text-sm/6 font-medium text-white">{label}</Label>
                </div>
                <div className="relative">
                    <Input
                        type={currentInputType}
                        placeholder={placeholder}
                        className={clsx(
                            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                            error && 'bg-red-500/20 border border-red-500/50'
                        )}
                        {...props}
                    />
                    {isPasswordField && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM2 10a8.018 8.018 0 0114.414-4.414l-1.415 1.415A6 6 0 003.414 11.586l-1.414-1.414A8.018 8.018 0 012 10zm14.293 1.293a1 1 0 000-1.414A8.018 8.018 0 005.586 3.586a1 1 0 00-1.414 1.414A6 6 0 0014.414 15.414a1 1 0 001.414-1.414A8 8 0 0016.293 11.293z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
                {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
            </Field>
        </div>
    )
}
