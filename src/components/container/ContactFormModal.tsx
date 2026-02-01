import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../ui/InputField'

export default function ContactFormModal() {
    const [isOpen, setIsOpen] = useState(true)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: '',
            password: '',
            ip: ''
        }
    })

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const onSubmit = (data) => {
        console.log(data)
        reset()
        close()
    }

    return (
        <>
            <Button
                onClick={open}
                className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
            >
                Open dialog
            </Button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white flex items-center justify-between">
                                <span className="text-lg">
                                    Fill the form
                                </span>
                                <Button
                                    className="rounded-md bg-white/5 p-1 text-white hover:bg-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white"
                                    onClick={close}
                                >
                                    <img src="/src/assets/icons/x.svg" className="invert-100" alt="cross" />
                                </Button>
                            </DialogTitle>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <InputField
                                    label="Name"
                                    inputType="text"
                                    placeholder="Enter your name"
                                    {...register('name', {
                                        required: 'Name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Name must be at least 2 characters'
                                        }
                                    })}
                                    error={errors.name?.message}
                                />
                                <InputField
                                    label="Password"
                                    inputType="password"
                                    placeholder="Enter your password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    })}
                                    error={errors.password?.message}
                                />
                                <InputField
                                    label="IP"
                                    inputType="text"
                                    placeholder="1.1.1.1"
                                    {...register('ip', {
                                        pattern: {
                                            value: /^(\d{1,3}\.){3}\d{1,3}$|^$/,
                                            message: 'Please enter a valid IP address in format 1.1.1.1'
                                        },
                                        validate: (value) => {
                                            if (!value) return true
                                            const parts = value.split('.')
                                            return parts.every(part => parseInt(part) >= 0 && parseInt(part) <= 255) || 'Each IP octet must be between 0-255'
                                        }
                                    })}
                                    error={errors.ip?.message}
                                />
                                <div className="mt-4">
                                    <Button
                                        type="submit"
                                        className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    >
                                        Got it, thanks!
                                    </Button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
