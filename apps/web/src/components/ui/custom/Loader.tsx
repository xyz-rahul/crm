import { Loader2 } from 'lucide-react'

export const Loader = () => {
    return (
        <div id="loadingOverlay" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="text-white text-2xl font-semibold animate-pulse flex gap-5 items-center text-center">
                <Loader2 className="animate-spin" size={28} /> Loading...
            </div>
        </div>
    )
}
