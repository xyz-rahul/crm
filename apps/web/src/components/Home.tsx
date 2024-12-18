import React from 'react'
import { Link } from 'react-router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, PlusIcon } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export const Home = (props: {}) => {
    return (
        <div className="p-4">
            home
            <CardWithForm />

        </div>
    )
}

export function CardWithForm() {
    return (
        <Link to="/add-lead">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Add new Lead</CardTitle>
                    <CardDescription>Click here to add new lead</CardDescription>
                </CardHeader>
                <CardContent className='flex justify-center'>
                    <PlusIcon size={63} />
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button className='w-full'>Deploy</Button>
                </CardFooter>
            </Card>
        </Link>
    )
}

