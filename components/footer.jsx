import Link from 'next/link';

export function Footer() {
    return (
        <footer className="pt-16 pb-12 sm:pt-24 sm:pb-16">
            <div className="flex flex-col gap-4">
                <p className="text-sm">&copy; 2025 MCP Server Solutions. All rights reserved.</p>
                <div className="flex flex-wrap gap-6">
                    <Link href="/about" className="text-sm decoration-dashed text-primary underline-offset-8">
                        About Us
                    </Link>
                    <Link href="/contact" className="text-sm decoration-dashed text-primary underline-offset-8">
                        Contact
                    </Link>
                    <Link href="/privacy" className="text-sm decoration-dashed text-primary underline-offset-8">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-sm decoration-dashed text-primary underline-offset-8">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
}
