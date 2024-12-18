import { Link } from "react-router"
import { ArrowRight } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Error({ message = "Sorry Something Unexpected Occured " }: { message?: string }) {
    return (
        <div id="loadingOverlay" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-4xl">Error</CardTitle>
                    <CardDescription>{message}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <img src="/dog.jpg" alt="" />
                </CardContent>
                <Link to="/">
                    <CardFooter className="flex justify-center">
                        Go to Home
                        <ArrowRight />
                    </CardFooter>
                </Link>
            </Card>
        </div>
    )
}


