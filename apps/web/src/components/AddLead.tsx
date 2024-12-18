import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNavigate } from "react-router";
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/lib/authStore'
import { Lead } from '@myorg/types'
import { createLead } from '@myorg/api-client'


export default function AddLead() {
    const navigate = useNavigate();
    const user = useAuthStore.getUser();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Lead>()
    const onSubmit: SubmitHandler<Lead> = async (data) => {
        try {
            const lead = await createLead({ ...data, userId: user?._id })
            navigate(`/lead/${lead._id}`)
        } catch (error: any) {
            setError('email', { message: error?.message || "something unexpected occur" })
        }
    }
    return (
        <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Create Lead</h1>
                    <p className="text-balance text-muted-foreground">
                        Fill up details for Lead
                    </p>
                </div>

                <div className="grid gap-2 text-left">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="name"
                        placeholder="Lead Name"
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

                <div className="grid gap-2 text-left">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        type="phone"
                        placeholder="phone"
                        required
                        {...register("phone", { required: true })}
                    />
                </div>
                {errors.phone?.message &&
                    <Alert variant="destructive">
                        <AlertDescription>
                            {errors.phone?.message}
                        </AlertDescription>
                    </Alert>
                }


                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ?
                        <>
                            <Loader2 className="animate-spin" />
                            Please wait
                        </>
                        :
                        <> Submit </>
                    }
                </Button>
            </div>
        </form>
    )
}


