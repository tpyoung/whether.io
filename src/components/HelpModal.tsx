import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function HelpModal() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          Help
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-popover border-border text-popover-foreground">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="gap-y-6 py-4">
          
          <div className="flex items-center justify-between mb-8">
            <Label htmlFor="dark-mode" className="text-sm font-medium">
              Dark Mode
            </Label>
            <Switch
              id="dark-mode"
              checked={isDark}
              onCheckedChange={setIsDark}
              className="bg-muted-foreground"
            />
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-center text-sm text-muted-foreground animate-wiggle-more animate-infinite animate-duration-1000 animate-ease-out overflow-visible py-4">
                Thanks for looking!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
