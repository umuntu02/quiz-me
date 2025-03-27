import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function BAckArrow() {
  const router = useRouter();

  return (
    <Button
      className="bg-transparent border-none text-primary"
      variant="outline"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-6 w-6 text-primary" />
    </Button>
  );
}

export default BAckArrow;
