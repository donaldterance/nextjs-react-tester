import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"



export function ErrorAlert(props: { message: string; }) {
    const message = props.message;
    return (
        <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                <p>{message}</p>
            </AlertDescription>
        </Alert>
    )
}