import Link from 'next/link';
import { Card } from 'components/card';
import { ContextAlert } from 'components/context-alert';
import { Markdown } from 'components/markdown';
import { getNetlifyContext } from 'utils';

const contextExplainer = `
Our MCP servers are built with enterprise-grade reliability in mind, with multiple deployment contexts for development, staging, and production environments:
`;

const serviceBenefits = `
Our MCP server solutions provide these key benefits:
- Seamless integration with existing software architecture
- Enhanced contextual processing capabilities
- Significant performance improvements for AI/ML workloads
- Reduced latency for high-demand applications
`;

const ctx = getNetlifyContext();

export default function Page() {
    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <section>
                <ContextAlert className="mb-6" />
                <h1 className="mb-4">MCP Server Solutions</h1>
                <p className="mb-6 text-lg">
                    Enterprise-grade Model Context Protocol servers for modern software businesses.
                </p>
                <Link href="/services" className="btn btn-lg sm:min-w-64">
                    Our Services
                </Link>
            </section>
            {!!ctx && (
                <section className="flex flex-col gap-4">
                    <Markdown content={contextExplainer} />
                    <RuntimeContextCard />
                </section>
            )}
            <section className="flex flex-col gap-4">
                <Markdown content={serviceBenefits} />
                <ServiceHighlightCard />
            </section>
        </div>
    );
}

function RuntimeContextCard() {
    const title = `MCP Server Environment: ${ctx} mode`;
    if (ctx === 'dev') {
        return (
            <Card title={title}>
                <p>Our development environment provides real-time testing with hot-reload capabilities.</p>
            </Card>
        );
    } else {
        return (
            <Card title={title}>
                <p>Our production environment offers maximum performance and reliability for your MCP deployment.</p>
            </Card>
        );
    }
}

function ServiceHighlightCard() {
    return (
        <Card title="Enterprise-Ready MCP Infrastructure">
            <p>
                We specialize in building Model Context Protocol servers that help your AI systems process more
                contextual information with greater efficiency.
            </p>
            <p>
                Our team has experience integrating MCP services with major enterprise platforms and custom software
                solutions.
            </p>
            <p>Contact us today to learn how we can enhance your existing software architecture.</p>
        </Card>
    );
}
