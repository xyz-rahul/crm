import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Link, useNavigate } from "react-router";
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/lib/authStore'
import { User } from '@myorg/types'
import { login } from '@myorg/api-client'
import { AxiosError } from "axios"



type Inputs = {
    email: string
    password: string
}


export default function Login() {
    const navigate = useNavigate();
    const setUser = useAuthStore.setUser;
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const user: User = await login(data)
            setUser(user)
            navigate('/')
        } catch (error: any) {
            if (error instanceof AxiosError && error.status === 404) setError('root', { message: "Please provide correct email and password" })
            else setError('email', { message: error?.message || "something unexpected occur" })
        }
    }
    return (
        <form className="p-6 md:p-8 flex justify-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6 w-[250px]">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                        Login to your account
                    </p>
                </div>
                {errors.root?.message &&
                    <Alert variant="destructive">
                        <AlertDescription>
                            {errors.root?.message}
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
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                            Forgot your password?
                        </a>
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
                        <> Login </>
                    }
                </Button>
                <div className="text-center text-sm">
                    Don&apos;t have an account?
                    <Link to="/signup">
                        Sign up
                    </Link>
                </div>
            </div>
        </form>
    )
}

