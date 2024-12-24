import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Link, useNavigate } from "react-router";
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/lib/authStore'
import { User } from '@myorg/types'
import { signup } from '@myorg/api-client'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';



const schema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    email: z.string().email(),
    password: z.string().min(5, { message: 'At leat 5 character' })
});

type Inputs = {
    name: string
    email: string
    password: string
}


export default function SignUp() {
    const navigate = useNavigate();
    const setUser = useAuthStore.setUser;
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({ resolver: zodResolver(schema) })
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const user: User = await signup(data)
            setUser(user)
            navigate('/')
        } catch (error: any) {
            setError('root', { message: error?.message || "something unexpected occur" })
        }
    }
    return (
        <form className="p-6 md:p-8 flex justify-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6 w-[250px]">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Sign Up</h1>
                    <p className="text-balance text-muted-foreground">
                        Sign Up to your account
                    </p>
                </div>
                <div className="grid gap-2 text-left">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="name"
                        placeholder="Rahul Kumar"
                        required
                        {...register("name", { required: true })}
                    />
                </div>
                {errors.name?.message &&
                    <Alert variant="destructive">
                        <AlertDescription>
                            {errors.name?.message}
                        </AlertDescription>
                    </Alert>
                }
                <div className="grid gap-2 text-left">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...register("email", { required: true })}
                    />
                </div>
                {errors.email?.message &&
                    <Alert variant="destructive">
                        <AlertDescription>
                            {errors.email?.message}
                        </AlertDescription>
                    </Alert>
                }

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        placeholder="password"
                        {...register("password", { required: true })}
                    />
                    {errors.password?.message &&
                        <Alert variant="destructive">
                            <AlertDescription>
                                {errors.password?.message}
                            </AlertDescription>
                        </Alert>
                    }
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ?
                        <>
                            <Loader2 className="animate-spin" />
                            Please wait
                        </>
                        :
                        <> Sign Up </>
                    }
                </Button>
                <div className="text-center text-sm">
                    Already have an account?
                    <Link to="/login">
                        Login
                    </Link>
                </div>
            </div>
        </form>
    )
}


