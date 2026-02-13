import { Button } from "@/components/ui/button"
import { useState } from "react"

export function SignOutButton() {
    const [isSignedIn, setIsSignedIn] = useState(true)

    return (
        <Button variant="ghost" onClick={() => setIsSignedIn(!isSignedIn)}>
            {isSignedIn ? "Sign Out" : "Sign In"}
        </Button>
    )
}