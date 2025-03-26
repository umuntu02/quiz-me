import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function BAckArrow({ lien }: { lien: string }) {
  return (
    <Link href={lien} className="m-2">
      <ArrowLeft className="w-6 h-6" />
    </Link>
  );
}

export default BAckArrow;
